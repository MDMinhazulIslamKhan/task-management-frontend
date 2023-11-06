import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TASK_URL = "/task";

export const taskApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.task, tagTypes.user],
    }),
    updateTask: build.mutation({
      query: (data) => ({
        url: `${TASK_URL}/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.task, tagTypes.user],
    }),
    getAllTasks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${TASK_URL}/get-all-tasks`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.task],
    }),
    getAllMyCreatedTasks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${TASK_URL}/get-all-my-tasks`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.task],
    }),
    getMyAssignedTasks: build.query({
      query: () => {
        return {
          url: `${TASK_URL}/get-my-task`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.task],
    }),
    getSingleTask: build.query({
      query: (id: string) => ({
        url: `${TASK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.task],
    }),
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${TASK_URL}/feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    postFeedback: build.mutation({
      query: (data) => ({
        url: `${TASK_URL}/feedback/${data.id}`,
        method: "POST",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.task],
    }),
    completeTask: build.mutation({
      query: (id) => ({
        url: `${TASK_URL}/complete-task/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    acceptTask: build.mutation({
      query: (id) => ({
        url: `${TASK_URL}/accept-assigned-task/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    cancelTask: build.mutation({
      query: (id) => ({
        url: `${TASK_URL}/cancel-assigned-task/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.task],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetMyAssignedTasksQuery,
  useGetSingleTaskQuery,
  useDeleteFeedbackMutation,
  usePostFeedbackMutation,
  useCompleteTaskMutation,
  useAcceptTaskMutation,
  useCancelTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetAllMyCreatedTasksQuery,
} = taskApi;
