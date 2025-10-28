"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex items-center justify-between p-4 bg-secondary shadow-md">
      <img src={"/AIMockerlogo.png"} width={160} height={100} alt="Logo" />

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Desktop Navigation */}
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

      {/* User Button */}
      <UserButton />

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-secondary text-white p-6 md:hidden">
          <li>
            <Link
              href="/dashboard"
              className={`block py-2 px-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard" ? "text-primary font-bold" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/questions"
              className={`block py-2 px-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard/questions" ? "text-primary font-bold" : ""
              }`}
            >
              Questions
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/upgrade"
              className={`block py-2 px-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard/upgrade" ? "text-primary font-bold" : ""
              }`}
            >
              Upgrade
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/how"
              className={`block py-2 px-4 hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard/how" ? "text-primary font-bold" : ""
              }`}
            >
              How it Works?
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
