"use client";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

//----------------------------------------------------

export const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Feedback", href: "/#feedback" },
  { label: "Faq", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type NavItemLabel = NavItem["label"];

//----------------------------------------------------
const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showMobileNav && !target.closest(".mobile-nav-container")) {
        setShowMobileNav(false);
      }
    };

    if (showMobileNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileNav]);

  return (
    <>
      <header className="border-gray-15 sticky top-0 z-50 flex w-full justify-center border-b py-4 backdrop-blur-xl md:py-[16px]">
        <div className="container flex items-center justify-between px-4 xl:px-0">
          <Logo />
          <NavBar />
          <button className="primary-btn hidden lg:block">Contact Us</button>
          <button
            className="mobile-nav-container lg:hidden"
            onClick={() => {
              setShowMobileNav((prev) => !prev);
            }}
          >
            {showMobileNav ? (
              <div className="bg-gray-15 flex size-[28px] items-center justify-center rounded-[6px] md:size-10">
                <X size={18} className="text-green-80 md:size-6" />
              </div>
            ) : (
              <Image
                src={"/menu.svg"}
                width={28}
                height={28}
                className="md:size-10 lg:hidden"
                alt="Menu"
              />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={showMobileNav}
        onClose={() => setShowMobileNav(false)}
      />
    </>
  );
};

export default Header;

// Mobile Navigation Component
const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("Home");

  // Handle mobile nav item click
  const handleMobileNavClick = (item: NavItem) => {
    // Close the mobile nav
    onClose();

    // Handle navigation
    if (item.href === "/#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setActiveSection("Home");
      }, 300);
    } else if (item.href.startsWith("/#")) {
      const section = item.href.slice(2);
      setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "bg-background fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "mobile-nav-container border-gray-15 fixed right-0 left-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ease-out lg:hidden",
          isOpen
            ? "top-[72px] translate-y-0 opacity-100 md:top-[80px]"
            : "pointer-events-none top-[72px] -translate-y-full opacity-0 md:top-[80px]",
        )}
      >
        <nav className="container px-4 py-6">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = getIsActive(pathname, activeSection, item);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleMobileNavClick(item)}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-base transition-colors duration-200",
                    "hover:bg-white/10 active:bg-white/15",
                    isActive
                      ? "bg-white/10 font-semibold text-white"
                      : "text-gray-300 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Contact Button */}
            <div className="border-gray-15 mt-4 border-t pt-4">
              <button
                onClick={onClose}
                className="primary-btn w-full py-3 text-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

// child components
const NavBar = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("Home");
  const inactive = useRef(false);

  // Track active section using Intersection Observer
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "services", "work", "feedback", "faq", "contact"];
    const sectionElements: HTMLElement[] = [];

    // Get all section elements
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) sectionElements.push(element);
    });

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (inactive.current) return;

        // Find the entry with the highest intersection ratio
        let maxEntry = entries[0];
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxEntry.intersectionRatio) {
            maxEntry = entry;
          }
        });

        if (maxEntry.isIntersecting && maxEntry.intersectionRatio > 0.3) {
          const id = maxEntry.target.id;
          const sectionName = id.charAt(0).toUpperCase() + id.slice(1);
          setActiveSection(sectionName);

          // Update URL hash without triggering navigation
          const newHash = `#${id}`;
          if (newHash === "#home") {
            window.history.replaceState(null, "", "/");
          } else if (window.location.hash !== newHash) {
            window.history.replaceState(null, "", `/${newHash}`);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds
        rootMargin: "-80px 0px -80px 0px", // Reduced margin
      },
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Set initial active section based on hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash && sections.includes(initialHash)) {
      setActiveSection(
        initialHash.charAt(0).toUpperCase() + initialHash.slice(1),
      );
    } else {
      setActiveSection("Home");
    }

    return () => observer.disconnect();
  }, [pathname]);

  // Handle manual navigation (clicking nav items)
  const handleNavClick = (item: NavItem) => {
    // Immediately set the active section
    if (item.href === "/#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setActiveSection("Home");
      }, 300);
    } else if (item.href.startsWith("/#")) {
      const section = item.href.slice(2);
      setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
    }

    // Disable intersection observer for longer duration
    inactive.current = true;

    // Re-enable after scroll animation completes
    setTimeout(() => {
      inactive.current = false;
    }, 1000); // Increased from 500ms to 1000ms
  };

  const { refs, highlightWidth, transformX } = useNavAnimation(activeSection);

  return (
    <nav className="relative hidden items-center justify-center lg:flex">
      <div
        className="absolute left-0 z-[-1] h-10 rounded-sm bg-white/10 backdrop-blur-2xl transition-all duration-300"
        style={{
          width: `${highlightWidth}px`,
          transform: `translateX(${transformX}px)`,
        }}
      />
      {NAV_ITEMS.map((item) => {
        const isActive = getIsActive(pathname, activeSection, item);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => handleNavClick(item)}
            ref={(el) => {
              if (refs.current) {
                refs.current[item.label] = el;
              }
            }}
            className={cn(
              "relative flex h-10 items-center justify-center rounded-sm px-5 hover:bg-white/5",
              {
                "font-semibold text-white": isActive,
              },
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

// Helper function to determine if nav item is active
const getIsActive = (
  pathname: string,
  activeSection: string,
  item: NavItem,
): boolean => {
  if (pathname === "/") {
    // Home is active when activeSection is "Home"
    if (item.label === "Home" && activeSection === "Home") {
      return true;
    }

    // Other sections are active when they match activeSection
    if (item.label === activeSection) {
      return true;
    }
  }

  // For other pages, check exact pathname match
  if (pathname !== "/" && item.href === pathname) {
    return true;
  }

  return false;
};

// Hook for navigation animation
const useNavAnimation = (activeSection: string) => {
  const [refVersion, setRefVersion] = useState(0);

  const refs = useRef<Record<NavItemLabel, HTMLElement | null>>({
    Home: null,
    Services: null,
    Work: null,
    Feedback: null,
    Faq: null,
    Contact: null,
  });

  const activeItem = useMemo(() => {
    return NAV_ITEMS.find((item) => item.label === activeSection);
  }, [activeSection]);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      setRefVersion((v) => v + 1);
    });

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const highlightWidth = useMemo(() => {
    if (!activeItem) return 0;
    return refs.current[activeItem.label]?.offsetWidth || 0;
    //eslint-disable-next-line
  }, [activeItem, refVersion]);

  const transformX = useMemo(() => {
    if (!activeItem) return 0;

    let width = 0;
    for (const item of NAV_ITEMS) {
      if (item.label === activeItem.label) break;
      width += refs.current[item.label]?.offsetWidth || 0;
    }
    return width;
    //eslint-disable-next-line
  }, [activeItem, refVersion]);

  return { refs, highlightWidth, transformX };
};
