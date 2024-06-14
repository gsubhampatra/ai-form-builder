"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  const path = usePathname()

  return path.includes('aiform') ? (<>
  </>) :
    (
      <>
        <div className="p-3 bg-gray-900 border-b border-gray-500 shadow-xl shadow-white">
          <div className="flex items-center justify-between ">
            <Link
              href="/"
              className="flex items-center justify-between space-x-2"
            >
              <Image src={"/logo.png"} height={100} width={50} />
              <span className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text sm:text-2xl">
                AI Form Builder
              </span>
            </Link>
            <div>
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href={"/dashboard"}>
                    <Button variant="outline">Dashboard</Button>
                  </Link>

                  <UserButton />
                </div>
              ) : (
                <SignInButton>
                  <button className="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-none hover:text-white focus:outline-none focus:ring active:text-opacity-75 hover:shadow-md hover:shadow-purple-600 sm:w-auto">
                    Get Started
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default Header;
