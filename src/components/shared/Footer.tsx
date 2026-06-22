import { Footer as FlowbiteFooter } from "flowbite-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import {
  SOCIAL_LINKS,
  PUBLISHER_NAME,
  FOOTER_PRIVACY_NOTICE,
} from "../../constants";

export default function Footer() {
  return (
    <FlowbiteFooter
      container
      className="rounded-none border-t border-gray-200 bg-white py-4 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center justify-between gap-3 py-4 md:flex-row">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>
              © 1999–{new Date().getFullYear()}{" "}
              <a href="/" className="hover:underline">
                {PUBLISHER_NAME}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 dark:hover:text-brand-400 text-gray-500 transition-colors dark:text-gray-400"
              aria-label="Facebook"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 dark:hover:text-brand-400 text-gray-500 transition-colors dark:text-gray-400"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 dark:hover:text-brand-400 text-gray-500 transition-colors dark:text-gray-400"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 dark:hover:text-brand-400 text-gray-500 transition-colors dark:text-gray-400"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="border-t border-gray-100 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          {FOOTER_PRIVACY_NOTICE}
        </p>
      </div>
    </FlowbiteFooter>
  );
}
