"use client";
import formatDate from "@/helpers/dateFormat/dateFormat";
import { useGetAllMyCreatedTasksQuery } from "@/redux/api/taskApi";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyCreatedAllTask = () => {
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

  const { data, isLoading } = useGetAllMyCreatedTasksQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    if (data) {
      const calculatedTotalPage = Math.ceil(
        data?.meta?.count / data?.meta?.limit
      );
      setTotalPage(calculatedTotalPage);
    }
  }, [data]);
  const renderPageButtons = () => {
    const buttons = [];
    const numButtons = Math.max(totalPage, 1);
    for (let page = 1; page <= numButtons; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => setPageNo(page)}
          className={`join-item btn btn-sm ${pageNo == page && "btn-active"}`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold">
        My Created Tasks{" "}
        {isLoading && (
          <span className="loading loading-spinner text-primary"></span>
        )}
      </h1>

      <div className="flex justify-end -mt-5 mb-3 mr-8">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-sm w-40"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered select-sm ml-3 w-30"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled selected>
            Category
          </option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>
      <div className="overflow-x-auto px-5">
        <table className="table-pin-rows table w-full">
          <tbody className="bg-base-100">
            <tr>
              <th></th>
              <th>Task Name</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </tbody>
          {data?.data?.length == 0 ? (
            <p className="text-center text-xl my-8">No Task Available</p>
          ) : (
            <tbody>
              {data?.data?.map((task: any, index: number) => {
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        {task.name.slice(0, 20)}
                        {task.name.length > 20 && "..."}
                      </td>
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
        {data?.data?.length != 0 && (
          <div className="mt-10 w-full flex justify-center">
            <div>
              <span>Page No: </span>
              <div className="join">{renderPageButtons()}</div>
            </div>
            <div className="ml-5">
              <select
                className="select select-bordered select-sm ml-3 w-30"
                onChange={(e) => setSize(+e.target.value)}
              >
                <option value="5 ">5</option>
                <option selected value="10">
                  10
                </option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCreatedAllTask;
