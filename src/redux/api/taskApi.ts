import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TASK_URL = "/task";

export const taskApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const {
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useDeleteFeedbackMutation,
  usePostFeedbackMutation,
  useCompleteTaskMutation,
  useGetAllMyCreatedTasksQuery,
} = taskApi;
