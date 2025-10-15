"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <img src={"/AIMockerlogo.png"} width={160} height={100} alt="Logo" />

      {/* Navigation */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link
            href="/dashboard"
            className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard" ? "text-primary font-bold" : ""
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/questions"
            className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/questions" ? "text-primary font-bold" : ""
            }`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/upgrade"
            className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/upgrade" ? "text-primary font-bold" : ""
            }`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/how"
            className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/how" ? "text-primary font-bold" : ""
            }`}
          >
            How it Works?
          </Link>
        </li>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
