"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const TextAreaInput = ({
  name,
  value,
  placeholder,
  label,
  required,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      <label className="label">
        <span className="label-text">
          {required ? <span className="text-red-500 inline">*</span> : null}
          {label ? label : null}
        </span>
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
            className="textarea textarea-bordered w-full"
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default TextAreaInput;
