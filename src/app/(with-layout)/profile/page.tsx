"use client";

import { useGetMyProfileQuery } from "@/redux/api/userApi";
import Link from "next/link";
import React from "react";

const MyProfile = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold">
        My Profile{" "}
        {isLoading && (
          <span className="loading loading-spinner text-primary"></span>
        )}
      </h1>
      <div className="bg-white relative mx-5 rounded-lg p-10 min-h-screen">
        <h1 className="text-center font-bold font-serif text-xl mb-4">
          My Info
        </h1>
        <p className="mb-3">
          <span className="font-semibold">Name: </span>
          {data?.data?.fullName}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Email: </span>
          {data?.data?.email}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Phone: </span>
          {data?.data?.phoneNumber}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Role: </span>
          {data?.data?.role}
        </p>
        <h1 className="text-center font-bold font-serif text-xl mb-4 mt-8">
          My Contribution
        </h1>
        <p className="mb-3">
          <span className="font-semibold">Total Created Task: </span>
          {data?.data?.createdTask}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Total Completed Task: </span>
          {data?.data?.complectedTask}
        </p>
        <div className="flex justify-evenly w-1/2 mx-auto mt-20">
          <Link className="btn btn-secondary btn-sm" href="/update-profile">
            Update Profile
          </Link>
          <Link className="btn btn-secondary btn-sm" href="/change-password">
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
