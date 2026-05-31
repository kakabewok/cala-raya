"use client";

import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Menu items configuration — using emoji icons for a friendlier feel
const menuItems = [
  {
    url: "/dashboard",
    label: "Dashboard",
    emoji: "📊",
    matchExact: true,
  },
  {
    url: "/dashboard/my-invitations",
    label: "My Invitations",
    emoji: "💌",
    matchExact: false,
  },
  {
    url: "/dashboard/share-invitations",
    label: "Share Invitations",
    emoji: "📤",
    matchExact: false,
  },
  {
    url: "/dashboard/rsvp",
    label: "RSVP",
    emoji: "✅",
    matchExact: false,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useInvitationAdmin();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (sidebarCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [sidebarCollapsed]);

  // ESC key to close sidebar on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        closeSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, closeSidebar]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    const mobile = window.innerWidth < 1024;
    if (sidebarOpen && mobile) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [sidebarOpen]);

  if (!mounted) return null;

  // On mobile, always show full sidebar with labels (never collapsed)
  const showLabels = isMobile || !sidebarCollapsed;
  const isNarrow = !isMobile && sidebarCollapsed;

  const isActive = (item: (typeof menuItems)[0]) =>
    item.matchExact ? pathname === item.url : pathname.startsWith(item.url);

  return (
    <>
      {/* Backdrop overlay — only visible on mobile when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        onTouchEnd={(e) => {
          e.preventDefault();
          closeSidebar();
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <aside
        ref={sidebar}
        onClick={(e) => e.stopPropagation()}
        className={`absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isNarrow ? "w-20" : "w-72"}`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className={`flex items-center justify-between gap-2 px-6 py-6 lg:py-7 ${isNarrow ? "justify-center px-3" : ""}`}>
          <div className={`transition-all duration-300 overflow-hidden ${isNarrow ? "opacity-0 w-0" : "opacity-100"}`}>
            <Link href="/dashboard" className="flex items-center gap-1">
              <h1 className="text-xl font-black text-foreground italic tracking-tighter whitespace-nowrap">
                CALA RAYA
                <span className="text-muted-foreground not-italic ml-1">.</span>
              </h1>
            </Link>
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Close sidebar"
            className="block lg:hidden text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="rotate-180" />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="flex flex-col overflow-hidden duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className={`py-4 mt-2 lg:mt-4 ${isNarrow ? "px-2" : "px-4 lg:px-5"}`}>
            <div>
              {/* Section heading */}
              {showLabels ? (
                <h3 className="mb-5 ml-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
                  Management
                </h3>
              ) : (
                <div className="mb-5 flex justify-center">
                  <div className="w-6 h-px bg-border" />
                </div>
              )}

              <ul className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const active = isActive(item);

                  return (
                    <li key={item.url} className="relative group/tooltip">
                      <NavLink
                        url={item.url}
                        active={active}
                        label={item.label}
                        className={isNarrow ? "justify-center px-2" : ""}
                      >
                        <span className="text-lg flex-shrink-0 leading-none" role="img" aria-label={item.label}>
                          {item.emoji}
                        </span>
                        {showLabels && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </NavLink>

                      {/* Tooltip — only for desktop collapsed state */}
                      {isNarrow && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-md shadow-lg border border-border opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-[60] pointer-events-none">
                          {item.label}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-popover" />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
