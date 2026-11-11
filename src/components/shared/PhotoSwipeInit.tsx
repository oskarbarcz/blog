import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

// PhotoSwipe needs each image's real width/height to size and zoom a slide;
// without them it stretches the image to fill the viewport. Thumbnails here
// are (mostly) the full images, but lazy-loaded ones only know their natural
// size once they have loaded, so dimensions are filled in as late as needed.
const hasDimensions = (link: HTMLAnchorElement) =>
  Boolean(link.dataset.pswpWidth && link.dataset.pswpHeight);

const applyDimensions = (link: HTMLAnchorElement, img: HTMLImageElement) => {
  if (hasDimensions(link) || !img.naturalWidth || !img.naturalHeight) return;
  link.dataset.pswpWidth = String(img.naturalWidth);
  link.dataset.pswpHeight = String(img.naturalHeight);
};

const isCropped = (img: HTMLImageElement) =>
  window.getComputedStyle(img).objectFit === "cover";

export default function PhotoSwipeInit() {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = null;
    const pendingImages = new WeakSet<HTMLImageElement>();

    const ensureDimensions = (
      link: HTMLAnchorElement,
      img: HTMLImageElement,
    ) => {
      if (hasDimensions(link)) return;
      if (img.complete && img.naturalWidth) {
        applyDimensions(link, img);
        return;
      }
      if (pendingImages.has(img)) return;
      pendingImages.add(img);
      img.addEventListener("load", () => applyDimensions(link, img), {
        once: true,
      });
    };

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
          if (parent instanceof HTMLAnchorElement) {
            ensureDimensions(parent, img);
            return;
          }
          const a = document.createElement("a");
          const src = img.currentSrc || img.src;
          a.href = src;
          a.setAttribute("data-pswp-src", src);
          parent.replaceChild(a, img);
          a.appendChild(img);
          ensureDimensions(a, img);
          changed = true;
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

      // Read size from the thumbnail if it loaded after it was wrapped, and
      // tell PhotoSwipe when the thumbnail is cropped (object-fit: cover) so
      // the open/close zoom animation doesn't stretch it.
      lightbox.addFilter("domItemData", (itemData, element, linkEl) => {
        const img = (linkEl ?? element).querySelector("img");
        if (!img) return itemData;
        if (
          (!itemData.width || !itemData.height) &&
          img.naturalWidth &&
          img.naturalHeight
        ) {
          itemData.width = itemData.w = img.naturalWidth;
          itemData.height = itemData.h = img.naturalHeight;
        }
        if (isCropped(img)) itemData.thumbCropped = true;
        return itemData;
      });

      // Last resort for a slide opened before its image size was known:
      // resize it once the full image has loaded.
      lightbox.on("loadComplete", ({ content, slide }) => {
        const img = content.element;
        if (!(img instanceof HTMLImageElement)) return;
        if (slide.width && slide.height) return;
        if (!img.naturalWidth || !img.naturalHeight) return;
        content.width = slide.width = img.naturalWidth;
        content.height = slide.height = img.naturalHeight;
        slide.calculateSize();
        slide.zoomAndPanToInitial();
        slide.applyCurrentZoomPan();
        slide.updateContentSize(true);
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
