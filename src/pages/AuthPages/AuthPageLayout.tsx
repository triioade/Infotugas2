import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-0 bg-white z-1 dark:bg-gray-900">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                />
                <h1 className="mt-2 text-2xl font-bold text-center text-white dark:text-white/60">
                  INFO TUGAS
                </h1>
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Pengingat dan Informasi tugas semester bagi mahasiswa
              </p>
            </div>
          </div>
        </div>
<div className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}

