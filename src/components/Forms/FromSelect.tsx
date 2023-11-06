"use client";
export type SelectOptions = {
  label: string;
  value: string;
};

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  required?: boolean;
  size?: "md" | "sm";
  options: SelectOptions[];
}

const FromSelectInput = ({
  name,
  value,
  options,
  placeholder,
  label,
  required,
  size,
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
        render={({ field: { value, onChange } }) => (
          <select
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={`input input-bordered w-full ${
              size == "md" ? "max-w-md" : "max-w-xs"
            }`}
          >
            {options.map((option) => (
              <>
                <option value={option.value}>{option.label}</option>
              </>
            ))}
          </select>
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FromSelectInput;
