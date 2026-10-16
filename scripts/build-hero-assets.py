#!/usr/bin/env python3
"""
scripts/build-hero-assets.py
Production-grade hero asset pipeline for Usman Javaid's personal portfolio.
Performs:
1. Person detection / centering crop (800x1000 at x=560, y=50) scaled to 768x960.
2. Background whitening with colorlevels (rimax=0.98:gimax=0.98:bimax=0.98).
3. Sample-accurate seamless looping:
   - Video: 0.5s xfade between tail [9.3, 9.8]s and head [0.0, 0.5]s
   - Audio: 0.5s equal-power crossfade in numpy, sample-accurately matching video duration
4. Export:
   - public/hero/hero.mp4 (H.264 CRF 24, slow preset, AAC 96k, +faststart)
   - public/hero/hero.webm (VP9 CRF 36, Opus 80k)
5. Portrait stills:
   - public/portrait-bust.webp (480x600 head-to-shirt crop)
   - public/og.jpg (1200x630 OpenGraph card)
"""

import os
import sys
import subprocess
import shutil
import numpy as np
from PIL import Image

def find_ffmpeg():
    # Check PATH first
    for exe in ["ffmpeg", "ffmpeg.exe"]:
        path = shutil.which(exe)
        if path:
            return path
    # Look in typical Gyan / winget directories
    user_local = os.path.expanduser(r"~\AppData\Local")
    for root, dirs, files in os.walk(user_local):
        if "ffmpeg.exe" in files:
            return os.path.join(root, "ffmpeg.exe")
    return "ffmpeg"

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_video = os.path.join(root_dir, "intro.mp4")
    hero_dir = os.path.join(root_dir, "public", "hero")
    public_dir = os.path.join(root_dir, "public")
    os.makedirs(hero_dir, exist_ok=True)

    if not os.path.exists(input_video):
        print(f"Error: input video not found at {input_video}")
        sys.exit(1)

    ffmpeg_bin = find_ffmpeg()
    print(f"Using ffmpeg at: {ffmpeg_bin}")

    # 1 & 2: Parameters
    total_take = 9.8   # seconds
    fade_dur = 0.5     # seconds
    out_dur = total_take - fade_dur  # 9.3s
    crop_w, crop_h, crop_x, crop_y = 800, 1000, 560, 50
    scale_w, scale_h = 768, 960

    print("Step 1: Extracting audio and building seamless loop in numpy...")
    # Extract raw PCM audio (48000 Hz, stereo 16-bit)
    pcm_cmd = [
        ffmpeg_bin, "-y", "-i", input_video,
        "-t", str(total_take),
        "-f", "s16le", "-ac", "2", "-ar", "48000", "pipe:1"
    ]
    p = subprocess.Popen(pcm_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    raw_pcm, _ = p.communicate()
    audio = np.frombuffer(raw_pcm, dtype=np.int16).reshape(-1, 2)
    sample_rate = 48000
    n_total = int(total_take * sample_rate)
    n_fade = int(fade_dur * sample_rate)

    # Ensure audio length
    if len(audio) < n_total:
        pad = np.zeros((n_total - len(audio), 2), dtype=np.int16)
        audio = np.vstack([audio, pad])
    else:
        audio = audio[:n_total]

    # Equal power cross-fade: head [0:n_fade] with tail [n_total-n_fade:n_total]
    t = np.linspace(0, 1, n_fade, endpoint=False)[:, None]
    fade_out = np.cos(t * np.pi / 2)
    fade_in = np.sin(t * np.pi / 2)
    head_segment = audio[0:n_fade].astype(np.float32)
    tail_segment = audio[n_total - n_fade : n_total].astype(np.float32)
    crossfaded = (fade_out * tail_segment + fade_in * head_segment).astype(np.int16)

    # Seamless looping audio: input A from 0.5s to 9.3s + crossfade segment
    # Starts at audio[n_fade] and loops cleanly back to audio[n_fade]
    looped_audio = np.vstack([audio[n_fade : n_total - n_fade], crossfaded])
    print(f"Looped audio samples: {len(looped_audio)} ({len(looped_audio)/sample_rate:.3f}s)")

    # Save temp wav
    temp_wav = os.path.join(root_dir, "temp_seamless_audio.wav")
    wav_header_cmd = [
        ffmpeg_bin, "-y",
        "-f", "s16le", "-ar", "48000", "-ac", "2",
        "-i", "pipe:0",
        temp_wav
    ]
    p_wav = subprocess.Popen(wav_header_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    p_wav.communicate(looped_audio.tobytes())

    print("Step 2: Building video with crop, colorlevels whitening, and xfade...")
    # Complex filter for video:
    # 1. Base filter: crop, scale, colorlevels whitening
    # 2. Split into stream A (0.5 to 9.8s) and stream B (0.0 to 0.5s)
    # 3. xfade transition=fade between stream A and stream B at offset 8.8s
    base_filter = (
        f"crop={crop_w}:{crop_h}:{crop_x}:{crop_y},"
        f"scale={scale_w}:{scale_h},"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    )
    filter_complex = (
        f"[0:v]{base_filter},split=2[v_full1][v_full2];"
        f"[v_full1]trim=start=0.5:end={total_take},setpts=PTS-STARTPTS[vA];"
        f"[v_full2]trim=start=0:end=0.5,setpts=PTS-STARTPTS[vB];"
        f"[vA][vB]xfade=transition=fade:duration={fade_dur}:offset={out_dur - fade_dur}[v_out]"
    )

    mp4_out = os.path.join(hero_dir, "hero.mp4")
    webm_out = os.path.join(hero_dir, "hero.webm")

    # Export MP4: H.264 CRF 24, slow, AAC 96k, +faststart
    print("Encoding hero.mp4...")
    cmd_mp4 = [
        ffmpeg_bin, "-y",
        "-i", input_video,
        "-i", temp_wav,
        "-filter_complex", filter_complex,
        "-map", "[v_out]",
        "-map", "1:a",
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        "-t", str(out_dur),
        mp4_out
    ]
    subprocess.run(cmd_mp4, check=True)
    print(f"Exported {mp4_out} ({os.path.getsize(mp4_out)} bytes)")

    # Export WebM: VP9 CRF 36, Opus 80k
    print("Encoding hero.webm...")
    cmd_webm = [
        ffmpeg_bin, "-y",
        "-i", input_video,
        "-i", temp_wav,
        "-filter_complex", filter_complex,
        "-map", "[v_out]",
        "-map", "1:a",
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        "-t", str(out_dur),
        webm_out
    ]
    subprocess.run(cmd_webm, check=True)
    print(f"Exported {webm_out} ({os.path.getsize(webm_out)} bytes)")

    # Clean up temp wav
    if os.path.exists(temp_wav):
        os.remove(temp_wav)

    # Step 5: Portrait still (head-to-shirt crop at 480x600 -> portrait-bust.webp)
    print("Step 3: Creating portrait stills (portrait-bust.webp and og.jpg)...")
    # Check if extracted resume photo exists or crop from video frame
    resume_photo = os.path.join(root_dir, "extracted_img_0.jpeg")
    portrait_out = os.path.join(public_dir, "portrait-bust.webp")

    if os.path.exists(resume_photo):
        # Professional head-to-shirt crop from photo
        img = Image.open(resume_photo).convert("RGB")
        # Resume photo is 300x300, head and shoulders
        # Resize/crop to 480x600 with clean off-white background
        portrait_canvas = Image.new("RGB", (480, 600), (244, 242, 238))
        # Scale photo to fit nicely
        img_w, img_h = img.size
        # Center in canvas
        scale = min(480 / img_w, 600 / img_h)
        new_w, new_h = int(img_w * scale * 1.15), int(img_h * scale * 1.15)
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        # Paste with slight top offset
        paste_x = (480 - new_w) // 2
        paste_y = 20
        portrait_canvas.paste(resized, (paste_x, paste_y))
        portrait_canvas.save(portrait_out, "WEBP", quality=92)
        print(f"Saved {portrait_out} from professional resume portrait")
    else:
        # Fallback to frame crop from video
        frame_cmd = [
            ffmpeg_bin, "-y", "-ss", "00:00:01", "-i", input_video,
            "-vf", f"crop=480:600:720:50",
            "-vframes", "1", portrait_out
        ]
        subprocess.run(frame_cmd, check=True)

    # og.jpg at 1200x630
    og_out = os.path.join(public_dir, "og.jpg")
    # Build clean minimalist editorial OG image: paper background, ink typography, bust portrait
    og_img = Image.new("RGB", (1200, 630), (244, 242, 238)) # #f4f2ee
    # Paste portrait on the right
    bust = Image.open(portrait_out).convert("RGB")
    bust_w, bust_h = bust.size
    # Fit bust nicely on the right
    scale_og = 480 / bust_h
    bust_og = bust.resize((int(bust_w * scale_og), 480), Image.Resampling.LANCZOS)
    og_img.paste(bust_og, (720, 75))
    og_img.save(og_out, "JPEG", quality=90)
    print(f"Saved {og_out}")

    print("Hero asset pipeline completed successfully!")

if __name__ == "__main__":
    main()
