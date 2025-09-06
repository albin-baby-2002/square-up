"use client";
import Logo from "@/components/logo";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

//----------------------------------------------------
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Feedback", href: "/#feedback" },
  { label: "Faq", href: "/#faq" },
  { label: "Careers", href: "/#careers" },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type NavItemLabel = NavItem["label"];

//----------------------------------------------------
const Header = () => {
  return (
    <header className="border-gray-15 sticky top-0 z-50 flex w-full justify-center border-b py-[16px] backdrop-blur-xl">
      <div className="container flex items-center justify-between">
        <Logo />
        <NavBar />
        <button className="primary-btn">Contact Us</button>
      </div>
    </header>
  );
};

export default Header;

// child components
const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Home");

  // Track active section using Intersection Observer
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["services", "work", "feedback", "faq", "careers"];
    const sectionElements: HTMLElement[] = [];

    // Get all section elements
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) sectionElements.push(element);
    });

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            const id = entry.target.id;
            // Capitalize first letter to match nav labels
            const sectionName = id.charAt(0).toUpperCase() + id.slice(1);
            setActiveSection(sectionName);

            // Update URL hash without triggering navigation
            const newHash = `#${id}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, "", `/${newHash}`);
            }
          }
        });
      },
      {
        threshold: 0.3, // Section needs to be 60% visible
        rootMargin: "-100px 0px -100px 0px", // Offset for header
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
    if (item.href === "/") {
      setActiveSection("Home");
    } else if (item.href.startsWith("/#")) {
      const section = item.href.slice(2);
      setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
    }
  };

  const { refs, highlightWidth, transformX } = useNavAnimation(activeSection);

  return (
    <nav className="relative flex items-center justify-center">
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
    Careers: null,
  });

  // Find the currently active nav item
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
  }, [activeItem, refVersion]);

  const transformX = useMemo(() => {
    if (!activeItem) return 0;

    let width = 0;
    for (const item of NAV_ITEMS) {
      if (item.label === activeItem.label) break;
      width += refs.current[item.label]?.offsetWidth || 0;
    }
    return width;
  }, [activeItem, refVersion]);

  return { refs, highlightWidth, transformX };
};
