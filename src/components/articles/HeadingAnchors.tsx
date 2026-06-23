import { useEffect } from "react";

const CLIP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`;
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

export default function HeadingAnchors() {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".article-content");
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id]"),
    );

    const cleanups: Array<() => void> = [];

    headings.forEach((heading) => {
      if (heading.querySelector(":scope > .heading-anchor")) return;
      heading.classList.add("heading-anchor-wrapper");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "heading-anchor";
      button.setAttribute("aria-label", "Kopiuj odnośnik do tej sekcji");
      button.title = "Kopiuj odnośnik do tej sekcji";
      button.innerHTML = CLIP_SVG;

      let resetTimer: ReturnType<typeof setTimeout> | undefined;
      const onClick = async () => {
        const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
        try {
          await navigator.clipboard.writeText(url);
        } catch {}
        window.history.replaceState(null, "", `#${heading.id}`);

        button.innerHTML = CHECK_SVG;
        button.classList.add("copied");
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          button.innerHTML = CLIP_SVG;
          button.classList.remove("copied");
        }, 1500);
      };

      button.addEventListener("click", onClick);
      heading.appendChild(button);

      cleanups.push(() => {
        if (resetTimer) clearTimeout(resetTimer);
        button.removeEventListener("click", onClick);
        button.remove();
        heading.classList.remove("heading-anchor-wrapper");
      });
    });

    const pendingHash = window.__pendingHash;
    const rawHash = pendingHash ?? window.location.hash;
    if (rawHash.length > 1) {
      const id = decodeURIComponent(rawHash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        const raf = window.requestAnimationFrame(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(target, { offset: -80, duration: 1 });
          } else {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          if (pendingHash) {
            window.__pendingHash = undefined;
            window.history.replaceState(null, "", pendingHash);
          }
        });
        cleanups.push(() => window.cancelAnimationFrame(raf));
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
