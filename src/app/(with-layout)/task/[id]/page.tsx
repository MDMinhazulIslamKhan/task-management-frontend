"use client";
import formatDate from "@/helpers/dateFormet/dateFormet";
import {
  useAcceptTaskMutation,
  useCancelTaskMutation,
  useCompleteTaskMutation,
  useDeleteFeedbackMutation,
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
  usePostFeedbackMutation,
} from "@/redux/api/taskApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const TaskDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [deleteFeedback] = useDeleteFeedbackMutation(undefined);
  const [postFeedback] = usePostFeedbackMutation(undefined);
  const [taskComplete] = useCompleteTaskMutation(undefined);
  const [acceptAssignedTask] = useAcceptTaskMutation(undefined);
  const [cancelAssignedTask] = useCancelTaskMutation(undefined);
  const [deleteOwnTask] = useDeleteTaskMutation(undefined);
  const { data, isLoading } = useGetSingleTaskQuery(params.id);
  const deleteMyFeedback = async () => {
    const ans = window.confirm("Are you sure to delete your feedback?");
    if (ans) {
      const res = await deleteFeedback(data?.data?._id);
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
      }
    } else return;
  };
  const completeTask = async () => {
    const ans = window.confirm("Are you completed this task?");
    if (ans) {
      const res = await taskComplete(data?.data?._id);
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
      }
    } else return;
  };
  const acceptTask = async () => {
    const ans = window.confirm("Are you sure to accept this task?");
    if (ans) {
      const res = await acceptAssignedTask(data?.data?._id);
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
      }
    } else return;
  };
  const cancelTask = async () => {
    const ans = window.confirm("Are you sure to cancel this assigned task?");
    if (ans) {
      const res = await cancelAssignedTask(data?.data?._id);
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
      }
    } else return;
  };
  const deleteTask = async () => {
    const ans = window.confirm("Are you sure to delete this task?");
    if (ans) {
      const res = await deleteOwnTask(data?.data?._id);
      console.log(res);
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
        router.push("/dashboard");
      }
    } else return;
  };
  const submitFeedback = async (e: any) => {
    const feedback = e.target.feedback.value;
    e.preventDefault();
    const ans = window.confirm("Are you sure to post your feedback?");
    if (ans) {
      const res = await postFeedback({
        data: { feedback },
        id: data?.data?._id,
      });
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
      }
    } else return;
  };
  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold">
        Tasks Details{" "}
        {isLoading && (
          <span className="loading loading-spinner text-primary"></span>
        )}
      </h1>
      <div className="bg-white relative mx-5 rounded-lg p-5 min-h-screen">
        <h1 className="text-center font-bold font-serif text-xl mb-4">
          {data?.data?.name}
        </h1>
        {!data?.data?.completedBy?.find(
          (f: any) => f?._id == getUserInfo()!.id
        ) && (
          <button
            className="btn btn-secondary absolute right-8 top-5 btn-sm"
            onClick={() => completeTask()}
          >
            Complete Task
          </button>
        )}
        <p className="mb-3">
          <span className="font-semibold">Description: </span>
          {data?.data?.description}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Category: </span>
          {data?.data?.category}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Deadline: </span>
          {formatDate(data?.data?.deadLine)}
        </p>
        <h1 className="text-center font-bold font-serif sm:text-lg my-4">
          Creator
        </h1>
        <p className="mb-3">
          <span className="font-semibold">Name: </span>
          {data?.data?.creatorId?.fullName}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Email: </span>
          {data?.data?.creatorId?.email}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Phone: </span>
          {data?.data?.creatorId?.email}
        </p>
        <p className="mb-3">
          <span className="font-semibold">Total Task Created: </span>
          {data?.data?.creatorId?.createdTask}
        </p>
        {data?.data?.assigned && (
          <>
            <h1 className="text-center font-bold font-serif sm:text-lg mt-4 my-8">
              Assigned
            </h1>
            <p className="mb-3">
              <span className="font-semibold">Name: </span>
              {data?.data?.assigned?.userId?.fullName}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Email: </span>
              {data?.data?.assigned?.userId?.email}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Status: </span>
              {data?.data?.assigned?.status}
            </p>
            {data?.data?.assigned?.status == "process" &&
              data?.data?.assigned?.userId?._id == getUserInfo()!.id && (
                <>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => acceptTask()}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary btn-sm ml-10"
                    onClick={() => cancelTask()}
                  >
                    Cancel
                  </button>
                </>
              )}
          </>
        )}
        <h1 className="text-center font-bold font-serif sm:text-lg mt-4 my-8">
          Completed By
          {data?.data?.completedBy?.length == 0
            ? "   (none)"
            : `    (${data?.data?.completedBy?.length})`}
        </h1>
        {data?.data?.completedBy?.length != 0 && (
          <ul className="mb-3 ml-5 list-disc">
            {data?.data?.completedBy.map((complete: any, index: number) => {
              return <li key={index}>{complete?.fullName}</li>;
            })}
          </ul>
        )}
        <h1 className="text-center font-bold font-serif sm:text-lg my-4">
          Feedback
          {data?.data?.feedback?.length == 0 && "   (none)"}
        </h1>
        {data?.data?.feedback?.length != 0 && (
          <ul className="mb-3 ml-5 list-disc">
            {data?.data?.feedback?.map((complete: any, index: number) => {
              return (
                <li key={index} className="mb-4">
                  <span className="font-semibold">
                    {complete?.userId?.fullName}
                  </span>{" "}
                  - {complete?.feedback}{" "}
                  {complete?.userId?._id == getUserInfo()!.id && (
                    <button
                      className="btn ml-5 btn-xs"
                      onClick={() => deleteMyFeedback()}
                    >
                      Delete
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {!data?.data?.feedback?.find(
          (f: any) => f?.userId?._id == getUserInfo()!.id
        ) && (
          <>
            <h1 className="mb-4 mt-10">Give your feedback in this task</h1>
            <form className="flex items-center" onSubmit={submitFeedback}>
              <textarea
                className="textarea textarea-bordered h-8 justify-self-start"
                placeholder="Your Feedback"
                name="feedback"
                required
              ></textarea>
              <button className="btn btn-xs ml-5" type="submit">
                Submit
              </button>
            </form>
          </>
        )}
        {data?.data?.creatorId?._id == getUserInfo()!.id && (
          <div className="flex justify-evenly w-1/2 mx-auto mt-20">
            <Link
              className="btn btn-secondary btn-sm"
              href="/dashboard/edit-task"
            >
              Edit Task
            </Link>
            <button
              className="btn btn-accent btn-sm"
              onClick={() => deleteTask()}
            >
              Delete Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
