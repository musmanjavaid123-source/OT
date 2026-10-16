"use client";

import { useEffect } from "react";

/**
 * Global RevealObserver
 * Observes all .rv and .rv-mask elements and adds .is-in class when in viewport.
 * Automatically runs once and disconnects elements for peak performance.
 */
export function RevealObserver() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document.querySelectorAll(".rv, .rv-mask").forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(".rv:not(.is-in), .rv-mask:not(.is-in)");
      targets.forEach((el) => observer.observe(el));
    };

    observeElements();

    // In case of dynamic content mounts
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
