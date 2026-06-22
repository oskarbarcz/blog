import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  DarkThemeToggle,
  Drawer,
} from "flowbite-react";
import {
  FaHouse,
  FaNewspaper,
  FaCalendarDays,
  FaMapLocationDot,
  FaFlask,
} from "react-icons/fa6";
import { SITE_NAME } from "../../constants";

const NAV_ITEMS = [
  { href: "/", label: "Strona główna", Icon: FaHouse },
  { href: "/articles", label: "Publikacje", Icon: FaNewspaper },
  { href: "/case-studies", label: "Case studies", Icon: FaFlask },
  { href: "/trips", label: "Podróże", Icon: FaMapLocationDot },
  { href: "/events", label: "Wydarzenia", Icon: FaCalendarDays },
];

interface NavigationProps {
  /** Current page path, passed from the Astro layout so the active link is
      correct on first paint (no hydration flash). */
  pathname?: string;
}

export default function Navigation({ pathname = "/" }: NavigationProps) {
  const [open, setOpen] = useState(false);

  // Normalize away any trailing slash for matching.
  const current = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const isActive = (href: string) =>
    href === "/"
      ? current === "/"
      : current === href || current.startsWith(`${href}/`);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
      // Reduce background scroll/overscroll on mobile
      body.style.overscrollBehavior = "contain";
      html.style.overscrollBehavior = "contain";
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      body.style.overscrollBehavior = "";
      html.style.overscrollBehavior = "";
    }

    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      body.style.overscrollBehavior = "";
      html.style.overscrollBehavior = "";
    };
  }, [open]);

  return (
    <div
      id="site-navigation"
      className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
    >
      <Navbar
        fluid
        className="mx-auto max-w-7xl bg-transparent px-4 sm:px-6 lg:px-8 dark:bg-gray-950"
      >
        <NavbarBrand
          className="font-family-mono text-brand-600 dark:text-brand-400 text-lg font-bold"
          href="/"
        >
          {SITE_NAME}
        </NavbarBrand>

        <div className="flex items-center gap-3 md:order-3 md:ml-4 lg:ml-6">
          <DarkThemeToggle />
          <NavbarToggle onClick={() => setOpen(true)} />
        </div>

        {/* Desktop nav */}
        <NavbarCollapse className="hidden md:order-2 md:ml-auto md:flex md:items-center md:gap-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <NavbarLink
              key={href}
              href={href}
              className={
                isActive(href)
                  ? "font-family-mono text-brand-600! dark:text-brand-400! text-sm font-bold duration-100"
                  : "font-family-mono hover:text-brand-500! text-sm duration-100"
              }
            >
              {label}
            </NavbarLink>
          ))}
        </NavbarCollapse>
      </Navbar>

      {/* Mobile drawer (overlays content, dimmed backdrop, body scroll locked by Flowbite) */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position="right"
        backdrop
        className="w-[80vw] max-w-xs bg-white p-0 dark:bg-gray-950"
      >
        <nav className="px-2 py-2">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={
                    isActive(href)
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400 font-family-mono flex items-center gap-3 rounded-lg px-4 py-4 text-base font-bold"
                      : "font-family-mono flex items-center gap-3 rounded-lg px-4 py-4 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800/70"
                  }
                >
                  <Icon className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
