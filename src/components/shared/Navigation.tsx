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
} from "react-icons/fa6";
import { SITE_NAME } from "../../constants";

export default function Navigation() {
  const [open, setOpen] = useState(false);

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
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <Navbar
        fluid
        className="mx-auto max-w-7xl bg-transparent px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
      >
        <NavbarBrand
          className="font-family-slab text-brand-600 dark:text-brand-400 text-xl font-bold"
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
          <NavbarLink className="hover:text-brand-500! duration-100" href="/">
            Strona główna
          </NavbarLink>
          <NavbarLink
            className="hover:text-brand-500! duration-100"
            href="/articles"
          >
            Publikacje
          </NavbarLink>
          <NavbarLink
            className="hover:text-brand-500! duration-100"
            href="/trips"
          >
            Podróże
          </NavbarLink>
          <NavbarLink
            className="hover:text-brand-500! duration-100"
            href="/events"
          >
            Wydarzenia
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      {/* Mobile drawer (overlays content, dimmed backdrop, body scroll locked by Flowbite) */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position="right"
        backdrop
        className="w-[80vw] max-w-xs bg-white p-0 dark:bg-gray-900"
      >
        <nav className="px-2 py-2">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            <li>
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800/70"
              >
                <FaHouse className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                Strona główna
              </a>
            </li>
            <li>
              <a
                href="/articles"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800/70"
              >
                <FaNewspaper className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                Publikacje
              </a>
            </li>
            <li>
              <a
                href="/trips"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800/70"
              >
                <FaMapLocationDot className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                Podróże
              </a>
            </li>
            <li>
              <a
                href="/events"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800/70"
              >
                <FaCalendarDays className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                Wydarzenia
              </a>
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
