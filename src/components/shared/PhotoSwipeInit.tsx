import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function PhotoSwipeInit() {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = null;

    const wrapImages = (): boolean => {
      let changed = false;
      const galleries = Array.from(
        document.querySelectorAll<HTMLElement>(".pswp-gallery"),
      );
      galleries.forEach((gallery) => {
        const imgs = Array.from(
          gallery.querySelectorAll<HTMLImageElement>("img"),
        );
        imgs.forEach((img) => {
          const parent = img.parentElement;
          if (!parent) return;
          const isAnchor = parent.tagName.toLowerCase() === "a";
          if (!isAnchor) {
            const a = document.createElement("a");
            const src = img.currentSrc || img.src;
            a.href = src;
            a.setAttribute("data-pswp-src", src);
            if (img.naturalWidth && img.naturalHeight) {
              a.setAttribute("data-pswp-width", String(img.naturalWidth));
              a.setAttribute("data-pswp-height", String(img.naturalHeight));
            }
            parent.replaceChild(a, img);
            a.appendChild(img);
            changed = true;
          }
        });
      });
      return changed;
    };

    const initLightbox = () => {
      if (lightbox) {
        lightbox.destroy();
        lightbox = null;
      }
      lightbox = new PhotoSwipeLightbox({
        gallery: ".pswp-gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
        paddingFn: () => ({ top: 40, bottom: 40, left: 10, right: 10 }),
        wheelToZoom: true,
        showHideAnimationType: "zoom",
        zoomAnimationDuration: 250,
      });
      lightbox.init();
    };

    wrapImages();
    initLightbox();

    const observer = new MutationObserver(() => {
      if (typeof window !== "undefined") {
        window.requestAnimationFrame(() => {
          const didChange = wrapImages();
          if (didChange) {
            initLightbox();
          }
        });
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (lightbox) {
        lightbox.destroy();
        lightbox = null;
      }
    };
  }, []);

  return null;
}
