"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";

interface InlineInputProps {
  name: string;
  type: "text" | "number";
  label: string;
  min?: number;
  max?: number;
}
const InlineInput = ({
  name,
  type = "text",
  label,
  min,
  max,
}: InlineInputProps) => {
  return (
    <>
      <div className="container px-0 flex-row items-center !justify-between">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <Field
          min={min}
          max={max}
          name={name}
          type={type}
          className="border rounded-lg p-2 w-5/6"
        />
      </div>
      <ErrorMessage name={name} component="div" className="text-red-800" />
    </>
  );
};

export default InlineInput;
