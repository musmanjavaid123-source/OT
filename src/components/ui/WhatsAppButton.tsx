"use client";

import React from "react";

const WHATSAPP_PHONE = "48571992607";
const PREFILLED_MESSAGE = "Hi! I found your portfolio on Ottoman.live and would like to discuss a project.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

export function WhatsAppButton() {
  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed z-40 pointer-events-auto"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
      }}
    >
      <div className="relative flex items-center justify-end group">
        {/* Desktop Tooltip ("Chat with me") */}
        <div
          role="tooltip"
          id="whatsapp-tooltip"
          className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#141413] text-white text-xs font-mono tracking-wide shadow-xl border border-white/10 pointer-events-none transition-all duration-300 ease-[var(--ease)] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 whitespace-nowrap select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat with me</span>
        </div>

        {/* Floating Action Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="whatsapp-tooltip"
          aria-label="Contact Ottoman on WhatsApp at +48 571 992 607"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.38)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.52)] border border-white/25 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-[var(--ease)] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-3 focus-visible:ring-4 focus-visible:ring-[#25D366]/40 motion-reduce:transform-none motion-reduce:transition-none"
        >
          {/* Subtle Radar Ripple on Idle */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none motion-reduce:hidden"
            style={{ animationDuration: "3s" }}
            aria-hidden="true"
          />

          {/* Official WhatsApp Vector Icon */}
          <svg
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 fill-current relative z-10 drop-shadow-sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.33C16.32 14.21 15.11 13.61 14.88 13.53C14.66 13.44 14.5 13.4 14.33 13.65C14.17 13.9 13.71 14.44 13.57 14.6C13.43 14.77 13.29 14.79 13.04 14.66C12.79 14.54 11.99 14.28 11.04 13.43C10.3 12.77 9.8 11.95 9.66 11.71C9.52 11.46 9.64 11.32 9.77 11.19C9.88 11.08 10.02 10.9 10.14 10.76C10.26 10.61 10.31 10.51 10.39 10.34C10.47 10.18 10.43 10.03 10.37 9.91C10.31 9.79 9.81 8.57 9.6 8.07C9.4 7.58 9.19 7.64 9.04 7.64C8.89 7.63 8.73 7.63 8.56 7.63C8.4 7.63 8.13 7.69 7.9 7.94C7.67 8.19 7.03 8.79 7.03 10.01C7.03 11.23 7.92 12.41 8.04 12.57C8.17 12.74 9.79 15.24 12.27 16.31C12.86 16.57 13.32 16.72 13.68 16.83C14.27 17.02 14.81 16.99 15.24 16.93C15.72 16.86 16.71 16.33 16.92 15.75C17.13 15.16 17.13 14.67 17.07 14.56C17.01 14.46 16.82 14.45 16.57 14.33Z" />
          </svg>

          {/* Active Status Badge */}
          <span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm pointer-events-none"
            aria-hidden="true"
          />
        </a>
      </div>
    </aside>
  );
}
