import { useState, type MouseEvent as ReactMouseEvent } from "react";
import { Modal } from "flowbite-react";

interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ZoomableImage({
  src,
  alt = "",
  className = "",
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  const handleBackdropClick = (event: ReactMouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group block cursor-zoom-in ${className}`}
        aria-label={alt ? `Otwórz obraz: ${alt}` : "Otwórz obraz"}
      >
        <img src={src} alt={alt} className="h-auto w-full object-cover" />
      </button>

      <Modal
        show={open}
        onClose={() => setOpen(false)}
        size="5xl"
        dismissible
        theme={{
          root: {
            show: {
              on: "flex bg-gray-900/80",
              off: "hidden",
            },
          },
          content: {
            base: "p-0",
            inner: "bg-transparent p-0 shadow-none ring-0 dark:bg-transparent",
          },
          body: {
            base: "p-0",
          },
          header: {
            base: "hidden",
          },
          footer: {
            base: "hidden",
          },
        }}
      >
        <div
          className="flex min-h-svh w-screen items-center justify-center"
          onClick={handleBackdropClick}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[85vh] w-auto max-w-[95vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </Modal>
    </>
  );
}
