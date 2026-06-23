import { FaArrowRight } from "react-icons/fa6";
import HeroBlob from "./HeroBlob";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <HeroBlob />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Witaj na moim blogu, <br />w moim cyfrowym ogrodzie
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Zawodowo jestem liderem zespołów w obszarze IT i architektem
            oprogramowania, który z pasją łączy świat komercyjnych innowacji z
            technologią w służbie społeczeństwu. Na tym blogu zamierzam opisywać
            swoje przemyślenia oraz publikować dłuższe treści specjalistyczne.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/articles"
              className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 font-family-mono inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow transition-colors duration-150 focus:ring-2 focus:outline-none"
            >
              Zobacz moje publikacje
              <FaArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/events"
              className="hover:text-brand-600 hover:border-brand-300 dark:hover:text-brand-400 font-family-mono inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-300"
            >
              Zobacz wydarzenia, w których brałem udział
              <FaArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
