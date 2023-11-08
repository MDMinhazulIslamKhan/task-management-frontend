"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";

const Header = () => {
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/");
  };

  return (
    <nav className="bg-slate-600 sm:px-16 px-6 h-20 w-full flex items-center py-5 fixed top-0 z-10">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href={isLoggedIn() ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Task Management
          </p>
        </Link>
        <ul className="list-none hidden sm:flex mr-10 flex-row gap-4 md:gap-10">
          <li className="hover:text-secondary text-[18px] font-medium cursor-pointer text-white">
            <Link href="/about">About Us</Link>
          </li>
          <li className="hover:text-secondary text-[18px] font-medium cursor-pointer text-white">
            <div onClick={logout}>
              <p className="absolute">{isLoggedIn() ? "Logout" : "Login"}</p>
              <p className="relative top-7 text-[10px] opacity-40">
                {isLoggedIn() && " "}
              </p>
            </div>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-slate-500 absolute top-[72px] right-0 mx-2 my-2 min-w-[120px] pb-12 z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              <li
                className="text-white text-[16px] font-medium cursor-pointer"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className=" text-[18px] font-medium cursor-pointer text-white"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <div onClick={logout}>
                  <p className="absolute ">
                    {isLoggedIn() ? "Logout" : "Login"}
                  </p>
                  <p className="relative top-7 text-[10px] opacity-40">
                    {isLoggedIn() && " "}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
