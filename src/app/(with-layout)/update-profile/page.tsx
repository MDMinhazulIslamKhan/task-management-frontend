"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { updateProfileSchema } from "@/schemas/allValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
type FormValues = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
};

const UpdateProfile = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  const router = useRouter();
  const [updatedProfile] = useUpdateProfileMutation(undefined);
  const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
    const updatedData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
    };
    if (data?.data?.phoneNumber == updatedData.phoneNumber) {
      delete updatedData.phoneNumber;
    }
    const ans = window.confirm("Are you sure to update your profile?");
    if (ans) {
      try {
        const res: any = await updatedProfile(updatedData);
        window.alert(res?.data?.message);
        if (res?.data?.statusCode == 200) {
          router.push("/profile");
        }
      } catch (error) {
        window.alert("Something went wrong");
        router.push("/profile");
      }
    } else return;
  };
  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold">Update Profile</h1>
      <div className="bg-white mx-5 rounded-lg p-5 min-h-screen flex justify-center">
        <div className="min-w-[50%]">
          <Form
            submitHandler={onSubmit}
            defaultValues={data?.data}
            resolver={yupResolver(updateProfileSchema)}
          >
            <div className="form-control w-md">
              <FormInput
                name="fullName"
                type="text"
                label="Updated Name"
                size="md"
                required
              />
            </div>
            <div className="form-control w-md">
              <FormInput
                name="phoneNumber"
                type="text"
                label="Updated Phone Number"
                size="md"
                required
              />
            </div>

            <div className="form-control w-md mt-6">
              <button
                type="submit"
                className="btn btn-primary max-w-md text-white font-bold"
              >
                Update
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
