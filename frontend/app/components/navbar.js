"use client";
import { GiEagleHead } from "react-icons/gi";
import { useState, useEffect } from "react";
import ToggleSwitch from "@/app/components/theme-switch";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="backdrop-blur-lg p-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center">
          <Link href={"/"}>
            <div className="flex items-center space-x-2 z-50">
              <GiEagleHead size={30} color="black dark:white" />
              <span className="text-2xl font-semibold dark:text-white ">
                SpringBoot x NextJS x kimUI
              </span>
            </div>
          </Link>
          <div className="">
            <ToggleSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
