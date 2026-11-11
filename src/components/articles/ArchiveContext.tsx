import { FaTriangleExclamation } from "react-icons/fa6";

export default function ArchiveContext() {
  return (
    <div className="mb-5">
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-400/20 dark:bg-amber-400/5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400">
            <FaTriangleExclamation className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Ten artykuł znajduje się w archiwum
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Jego treść powstała znacznie przed ideą bloga, stąd jego styl może
              odbiegać od standardu który chcę sobie narzucić.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
