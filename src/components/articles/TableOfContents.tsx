import { useEffect, useState, type MouseEvent } from "react";
import { ARTICLE_TOC_LABEL } from "../../constants";

export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: TocHeading[];
}

// Headings carry `scroll-margin-top` (article.css), which both Lenis and
// scrollIntoView honour. A heading becomes "current" once its top passes
// that margin plus this much slack.
const ACTIVE_SLACK = 40;

export default function TableOfContents({ headings }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const activeLine =
      (Number.parseFloat(getComputedStyle(targets[0]).scrollMarginTop) || 0) +
      ACTIVE_SLACK;
    let ticking = false;

    const update = () => {
      ticking = false;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      if (atBottom) {
        current = targets[targets.length - 1].id;
      } else {
        for (const el of targets) {
          if (el.getBoundingClientRect().top > activeLine) break;
          current = el.id;
        }
      }
      setActiveSlug(current);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headings]);

  const onClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    const target = document.getElementById(slug);
    if (!target) return;
    event.preventDefault();

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1 });
    } else {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
    window.history.replaceState(null, "", `#${slug}`);
  };

  return (
    <nav aria-labelledby="toc-label">
      <p
        id="toc-label"
        className="font-family-mono mb-3 text-xs tracking-wider text-gray-500 uppercase dark:text-gray-400"
      >
        {ARTICLE_TOC_LABEL}
      </p>
      <ul className="font-family-plex-sans border-l border-gray-200 text-sm leading-snug dark:border-gray-800">
        {headings.map((heading) => {
          const isActive = heading.slug === activeSlug;
          return (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                onClick={(event) => onClick(event, heading.slug)}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 transition-colors duration-150 ${
                  heading.depth > 2 ? "pl-7" : "pl-4"
                } ${
                  isActive
                    ? "border-brand-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
