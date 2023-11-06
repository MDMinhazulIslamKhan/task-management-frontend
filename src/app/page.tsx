"use client";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Form from "@/components/Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/allValidationSchema";
import FormInput from "@/components/Forms/FormInput";
import PassWordInput from "@/components/Forms/PasswordInput";
import { useUserLoginMutation } from "@/redux/api/userApi";
import { isLoggedIn, storeUserInfo } from "@/services/auth.service";

type FormValues = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  if (isLoggedIn()) {
    router.push("/dashboard");
  }
  const [userLogin] = useUserLoginMutation(undefined);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        window.alert("User logged in successfully!");
        router.push("/dashboard");
      } else {
        window.alert(res.message);
      }
    } catch (error) {
      window.alert("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center sm:mt-44">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 pb-10">
        <div className="card-body">
          <h2 className="text-center font-bold text-xl my-4">Login</h2>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div className="form-control w-full max-w-xs">
              <FormInput
                name="email"
                type="email"
                label="User Email"
                placeholder="aaa@gmail.com"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <PassWordInput
                name="password"
                label="Password"
                placeholder="123456"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white font-bold"
              >
                Login
              </button>
            </div>
          </Form>
          <small>
            New to Task-management?{" "}
            <Link className="text-secondary" href="/registration">
              Create new account
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
