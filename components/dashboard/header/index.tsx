"use client";

import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import { useInvitationAdmin } from "@/hooks/use-invitation-admin";

const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useInvitationAdmin();

  return (
    <header className="sticky top-0 z-40 flex w-full bg-background border-b border-border">
      <div className="flex items-center justify-between flex-grow px-4 py-3 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-md border border-border bg-background p-1.5 lg:hidden"
          >
            <span className="relative block w-5 h-5 cursor-pointer">
              <span className="absolute right-0 w-full h-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-foreground/60 delay-[0] duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-foreground/60 delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-foreground/60 delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 w-full h-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-foreground delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-foreground duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <DarkModeSwitcher className="hidden lg:block" />

        <div className="flex items-center gap-4">
          <DarkModeSwitcher className="block lg:hidden" />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
