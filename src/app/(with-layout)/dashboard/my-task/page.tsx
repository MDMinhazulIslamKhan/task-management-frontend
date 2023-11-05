"use client";
import formatDate from "@/helpers/dateFormet/dateFormet";
import {
  useGetAllTasksQuery,
  useGetMyAssignedTasksQuery,
} from "@/redux/api/taskApi";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyTask = () => {
  const query: Record<string, any> = {};
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [category, setCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = pageNo;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (!!category) {
    query["category"] = category;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetMyAssignedTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold">
        My Tasks{" "}
        {isLoading && (
          <span className="loading loading-spinner text-primary"></span>
        )}
      </h1>
      <div className="overflow-x-auto px-5">
        <table className="table-pin-rows table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Task Name</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          {data?.data?.length == 0 ? (
            <p className="text-center text-xl my-8">No Task Available</p>
          ) : (
            <tbody>
              {data?.data?.map((task: any, index: number) => {
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{task.name.slice(0, 20)}</td>
                      <td>{task?.creatorId?.fullName.slice(0, 10)}</td>
                      <td>{task?.category}</td>
                      <td>{formatDate(task?.deadLine)}</td>
                      <td>
                        <Link href={`/task/${task._id}`}>
                          <button className="btn text-white btn-secondary btn-sm">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default MyTask;
