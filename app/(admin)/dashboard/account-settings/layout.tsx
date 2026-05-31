"use client";

import Heading from "@/components/dashboard/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

interface NavItem {
  title: string;
  href: string;
  icon?: string | null;
}

const sidebarNavItems: NavItem[] = [
  {
    title: "Profile",
    href: "/dashboard/account-settings/profile",
    icon: null,
  },
  {
    title: "Password",
    href: "/dashboard/account-settings/password",
    icon: null,
  },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  const currentPath = usePathname();

  return (
    <div className="px-0 md:px-2 py-4">
      <Heading
        title="Settings"
        description="Manage your profile and account settings"
      />

      <div className="flex flex-col space-y-6 lg:flex-row lg:gap-10 lg:space-y-0 lg:space-x-0 mt-6">
        <aside className="w-full max-w-xl lg:w-56">
          <nav className="flex flex-col space-y-1 p-1 bg-muted/30 rounded-lg border border-border">
            {sidebarNavItems.map((item, index) => (
              <Button
                key={`${item.href}-${index}`}
                size="sm"
                variant="ghost"
                asChild
                className={cn("w-full justify-start font-medium text-muted-foreground hover:text-foreground", {
                  "bg-background text-foreground shadow-sm": currentPath === item.href,
                })}
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </nav>
        </aside>

        <Separator className="my-6 md:hidden" />

        <div className="flex-1 w-full min-w-0">
          <section className="w-full space-y-8 md:space-y-12">{children}</section>
        </div>
      </div>
    </div>
  );
}
