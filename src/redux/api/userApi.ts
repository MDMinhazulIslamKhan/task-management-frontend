import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegistration: build.mutation({
      query: (loginData) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: () => {
        return {
          url: `${USER_URL}/get-all-users`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.task, tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegistrationMutation,
  useGetAllUserQuery,
} = userApi;
