export default function HeroBlob() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* Blob cluster anchored to the right and pushed off the edge (the section
          clips the overflow). Pushed down/further off on small screens so it
          stays clear of the hero text; pulled in on large screens. */}
      <div className="absolute top-64 right-0 h-[26rem] w-[30rem] translate-x-1/2 sm:top-28 sm:translate-x-1/3 lg:top-4 lg:translate-x-[28%] xl:translate-x-[10%]">
        {/* Blob A */}
        <div className="blob-grain absolute top-0 right-0 h-96 w-[28rem] transform-gpu animate-[blobMorph_20s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,var(--color-brand-300),var(--color-brand-500)_60%,transparent_70%)] opacity-[0.4] blur-[8px] will-change-[border-radius,transform] dark:bg-[radial-gradient(circle_at_30%_30%,var(--color-brand-300),var(--color-brand-400)_60%,transparent_70%)] dark:opacity-[0.32]" />

        {/* Blob B */}
        <div className="blob-grain absolute -top-6 right-16 h-72 w-72 transform-gpu animate-[blobMorph_20s_ease-in-out_infinite] bg-[radial-gradient(circle_at_70%_40%,var(--color-brand-200),var(--color-brand-400)_55%,transparent_75%)] opacity-[0.4] blur-[8px] will-change-[border-radius,transform] [animation-delay:6s] dark:bg-[radial-gradient(circle_at_70%_40%,var(--color-brand-200),var(--color-brand-300)_55%,transparent_75%)] dark:opacity-[0.32]" />

        {/* Blob C */}
        <div className="blob-grain absolute top-20 right-4 h-64 w-64 transform-gpu animate-[blobMorph_20s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,var(--color-brand-400),var(--color-brand-600)_50%,transparent_80%)] opacity-[0.4] blur-[8px] will-change-[border-radius,transform] [animation-delay:12s] dark:bg-[radial-gradient(circle_at_50%_50%,var(--color-brand-400),var(--color-brand-500)_50%,transparent_80%)] dark:opacity-[0.32]" />
      </div>
    </div>
  );
}
