"use client";

import React from "react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="w-full">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center w-full">
            <div className="relative flex h-12 w-full items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-6">
              <div className="flex items-center gap-x-4">
                <span className="text-lg font-semibold text-white">Trip.AI</span>
              </div>

              {/* Right side - can be used for user menu or actions */}
              <div className="flex items-center gap-x-4">
                {/* Additional navbar content can go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
