"use client";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { Loader2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="py-6 px-4 lg:px-8 border-b-2 ">
      <div className="max-w-screen-4xl mx-auto">
        <div className="flex items-center  lg:gap-x-16">
          <HeaderLogo />
          <Navigation />

          <div className="ml-auto">
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" />
            </ClerkLoading>
          </div>
        </div>
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
};
