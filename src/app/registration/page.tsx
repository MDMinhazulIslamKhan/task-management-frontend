"use client";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Form from "@/components/Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "@/schemas/allValidationSchema";
import FormInput from "@/components/Forms/FormInput";
import PassWordInput from "@/components/Forms/PasswordInput";
import { useUserRegistrationMutation } from "@/redux/api/userApi";
import { isLoggedIn } from "@/services/auth.service";

type FormValues = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
};
const Registration = () => {
  const router = useRouter();
  if (isLoggedIn()) {
    router.push("/dashboard");
  }
  const [userRegistration] = useUserRegistrationMutation(undefined);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userRegistration({ ...data }).unwrap();
      if (res.statusCode === 500) {
        window.alert(res.message);
      } else {
        window.alert("User registration successfully!!! Please login...");
        router.push("/");
      }
    } catch (error) {
      window.alert("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center sm:mt-24">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 pb-10">
        <div className="card-body">
          <h2 className="text-center font-bold text-xl my-4">Registration</h2>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(registrationSchema)}
          >
            <div className="form-control w-full max-w-xs">
              <FormInput
                name="fullName"
                type="text"
                label="User Name"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <FormInput
                name="email"
                type="email"
                label="User Email"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <FormInput
                name="phoneNumber"
                type="text"
                label="Phone number"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <PassWordInput name="password" label="Password" />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white font-bold"
              >
                Registration
              </button>
            </div>
          </Form>
          <small>
            Already have an account?{" "}
            <Link className="text-secondary" href="/">
              Please Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Registration;
