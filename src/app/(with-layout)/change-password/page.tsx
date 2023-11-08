"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import PassWordInput from "@/components/Forms/PasswordInput";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { passwordUpdateSchema } from "@/schemas/allValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePassword = () => {
  const router = useRouter();
  const [updatePassword] = useUpdatePasswordMutation(undefined);
  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues) => {
    const ans = window.confirm("Are you sure to change your password?");
    if (ans) {
      try {
        const res: any = await updatePassword(formData);
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
      <h1 className="text-center my-5 text-2xl font-bold">Change password</h1>
      <div className="bg-white mx-5 rounded-lg p-5 min-h-screen flex justify-center">
        <div className="min-w-[50%]">
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(passwordUpdateSchema)}
          >
            <div className="form-control w-full max-w-md">
              <PassWordInput
                name="oldPassword"
                label="Old Password"
                size="md"
              />
            </div>
            <div className="form-control w-full max-w-md">
              <PassWordInput
                name="newPassword"
                label="New Password"
                size="md"
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

export default UpdatePassword;
