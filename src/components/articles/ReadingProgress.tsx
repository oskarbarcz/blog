import { useEffect } from "react";

export default function ReadingProgress() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".article-content");
    if (!article) return;
    const nav = document.getElementById("site-navigation");

    const wrapper = document.createElement("div");
    wrapper.className = "reading-progress";
    wrapper.setAttribute("role", "progressbar");
    wrapper.setAttribute("aria-label", "Postęp czytania artykułu");
    wrapper.setAttribute("aria-valuemin", "0");
    wrapper.setAttribute("aria-valuemax", "100");
    const bar = document.createElement("div");
    bar.className = "reading-progress__bar";
    wrapper.appendChild(bar);
    document.body.appendChild(wrapper);

    let ticking = false;

    const render = () => {
      ticking = false;
      const navHeight = nav?.getBoundingClientRect().height ?? 0;
      wrapper.style.top = `${navHeight}px`;

      const articleTop = article.offsetTop;
      const scrollable = article.offsetHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? (window.scrollY - articleTop) / scrollable
          : window.scrollY > articleTop
            ? 1
            : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      bar.style.transform = `scaleX(${clamped})`;
      wrapper.setAttribute("aria-valuenow", String(Math.round(clamped * 100)));
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      wrapper.remove();
    };
  }, []);

  return null;
}
