"use client";

import Header from "@/components/dashboard/header/index";
import Sidebar from "@/components/dashboard/sidebar/index";
import GeneralLoading from "@/components/GeneralLoading";
import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import React, { ReactNode } from "react";

const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { loading } = useInvitationAdmin();

  return (
    <div
      className="text-foreground bg-background"
    >
      {loading && <GeneralLoading />}
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          <Header />
          <main>
            <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
