"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FromSelectInput from "@/components/Forms/FromSelect";
import TextAreaInput from "@/components/Forms/TextArea";
import {
  useUpdateTaskMutation,
  useGetSingleTaskQuery,
} from "@/redux/api/taskApi";
import { createTaskSchema } from "@/schemas/allValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
type FormValues = {
  name: string;
  description: string;
  category: string;
  deadLine: string;
  assigned?: string;
};

const categoryOptions = [
  { label: "Select", value: "" },
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Difficult", value: "difficult" },
];
const EditTask = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetSingleTaskQuery(params.id);
  const router = useRouter();
  const [editTask] = useUpdateTaskMutation(undefined);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const updatedData = {
      name: data.name,
      description: data.description,
      category: data.category,
      deadLine: data.deadLine,
    };
    const ans = window.confirm("Are you sure to edit this task?");
    if (ans) {
      const res = await editTask({ data: updatedData, id: data?._id });
      if (res?.data?.statusCode == 200) {
        window.alert(res?.data?.message);
        router.push(`/task/${data?._id}`);
      }
    } else return;
  };
  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold">Edit Tasks</h1>
      <div className="bg-white mx-5 rounded-lg p-5 min-h-screen flex justify-center">
        <div className="min-w-[50%]">
          <Form
            submitHandler={onSubmit}
            defaultValues={data?.data}
            resolver={yupResolver(createTaskSchema)}
          >
            <div className="form-control w-md">
              <FormInput
                name="name"
                type="text"
                label="Task Name"
                size="md"
                required
              />
            </div>
            <div className="form-control w-md">
              <FormDatePicker name="deadLine" label="Task Deadline" size="md" />
            </div>
            <div className="form-control max-w-md">
              <TextAreaInput
                name="description"
                label="Task Description"
                required
              />
            </div>
            <div className="form-control max-w-md">
              <FromSelectInput
                options={categoryOptions}
                name="category"
                label="Task Category"
                size="md"
              />
            </div>
            <div className="form-control w-md mt-6">
              <button
                type="submit"
                className="btn btn-primary max-w-md text-white font-bold"
              >
                Edit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
