import { useGetMyProfileQuery } from "@/redux/api/userApi";
import Link from "next/link";
import React from "react";

const DashboardSidebar = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetMyProfileQuery(undefined, {
    pollingInterval: 10000,
  });

  return (
    <div className="drawer drawer-mobile sm:drawer-open  h-full">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full bg-slate-50">
        <label htmlFor="dashboard-drawer" className="drawer-button sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" w-14 h-14 p-2 rounded-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </label>
        {children}
      </div>
      <div className="drawer-side sm:pt-0 pt-20">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 bg-base-100 text-base-content h-full font-semibold">
          <li>
            <Link href="/dashboard" className="hover:text-primary">
              All Task
            </Link>
          </li>
          <li>
            <Link href="/dashboard/created-task" className="hover:text-primary">
              My Created Task
            </Link>
          </li>
          <li>
            <Link href="/dashboard/my-task" className="hover:text-primary">
              Assigned task to me
              {data?.data?.notification != 0 && (
                <span className="text-[10px] text-center items-center bg-gray-200 w-4 rounded-full">
                  {data?.data?.notification}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link href="/dashboard/create-task" className="hover:text-primary">
              Create Task
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-primary">
              My Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
