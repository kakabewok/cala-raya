"use client";

import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import UserImage from "@/public/assets/images/user.png";
import { User } from "@/types/invitation-data";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClickOutside from "./ClickOutside";
import { Settings, LogOut } from "lucide-react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setLoading } = useInvitationAdmin();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        console.error("Error fetching user data: ", data.error);
      }
    };
    fetchUserData();
  }, []);

  const handleProfileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    setLoading(false);
    router.push("/dashboard/account-settings/profile");
  };

  return (
    <div>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-semibold text-foreground">
              {user?.name}
            </span>
            <span className="block text-xs text-muted-foreground">
              {user?.email ?? "Loading..."}
            </span>
          </span>

          <span className="w-10 h-10 rounded-full overflow-hidden">
            <Image src={UserImage} alt="User image" />
          </span>
        </div>

        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <ul
            className="absolute right-0 mt-3 flex w-56 flex-col rounded-md border border-border bg-popover shadow-lg overflow-hidden"
          >
            <li>
              <button
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-popover-foreground hover:bg-accent transition-colors cursor-pointer"
                onClick={handleProfileMenu}
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                Account Settings
              </button>
            </li>

            <li className="border-t border-border">
              <button
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-popover-foreground hover:bg-accent transition-colors cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
                Logout
              </button>
            </li>
          </ul>
        )}
        {/* <!-- Dropdown End --> */}
      </ClickOutside>
    </div>
  );
};

export default DropdownUser;
