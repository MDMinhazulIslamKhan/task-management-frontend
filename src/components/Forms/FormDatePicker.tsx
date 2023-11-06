"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  value?: string | string[] | undefined;
  label?: string;
  required?: boolean;
  size?: "md" | "sm";
}

const FormDatePicker = ({ name, value, label, size, required }: IInput) => {
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
          <input
            type="date"
            {...field}
            value={value ? value : field.value}
            className={`input input-bordered w-full ${
              size == "md" ? "max-w-md" : "max-w-xs"
            }`}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormDatePicker;
