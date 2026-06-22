import { Footer as FlowbiteFooter } from "flowbite-react";
import {
  SOCIAL_LINKS,
  PUBLISHER_NAME,
  FOOTER_PRIVACY_NOTICE,
} from "../../constants";

const SOCIALS = [
  { href: SOCIAL_LINKS.facebook, label: "facebook" },
  { href: SOCIAL_LINKS.instagram, label: "instagram" },
  { href: SOCIAL_LINKS.linkedin, label: "linkedin" },
  { href: SOCIAL_LINKS.github, label: "github" },
];

export default function Footer() {
  return (
    <FlowbiteFooter
      container
      className="rounded-none border-t border-gray-200 bg-white py-4 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center justify-between gap-3 py-4 md:flex-row">
          <div className="font-family-mono text-sm text-gray-600 dark:text-gray-400">
            <span>
              © 1999–{new Date().getFullYear()}{" "}
              <a href="/" className="hover:underline">
                {PUBLISHER_NAME}
              </a>
            </span>
          </div>

          <div className="font-family-mono flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {SOCIALS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 inline-flex items-center gap-1 text-gray-500 transition-colors dark:text-gray-400"
              >
                <span className="text-gray-400 dark:text-gray-600">[</span>
                {label}
                <span className="text-gray-400 dark:text-gray-600">]</span>
              </a>
            ))}
          </div>
        </div>

        <p className="font-family-mono border-t border-gray-100 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          {FOOTER_PRIVACY_NOTICE}
        </p>
      </div>
    </FlowbiteFooter>
  );
}
