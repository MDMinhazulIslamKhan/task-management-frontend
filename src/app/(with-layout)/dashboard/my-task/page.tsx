"use client";
import formatDate from "@/helpers/dateFormat/dateFormat";
import { useGetMyAssignedTasksQuery } from "@/redux/api/taskApi";
import Link from "next/link";

const MyTask = () => {
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
