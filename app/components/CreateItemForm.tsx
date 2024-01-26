"use client";

import React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

import useColumns from "@/hooks/useColumns";
import { itemValidationSchema as validationSchema } from "@/utils/validation/schemas";
import { ItemForm } from "@/interfaces/interface";

import InlineInput from "./common/InlineInput";
import Spinner from "./common/Spinner";

const CreateItemForm = () => {
  const { getColumns, addNewItem } = useColumns();
  const columns = getColumns;
  const max = Object.keys(columns).length;
  const initialValues = {
    stateOrder: 1,
    task: "",
  };
  const delay = (ms = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <Formik
      className="container "
      initialValues={initialValues}
      validationSchema={validationSchema(max)}
      onSubmit={async (values, { resetForm }) => {
        const stateOrder = values.stateOrder.toString();
        const task = values.task;
        addNewItem({ stateOrder, task } as ItemForm);
        await delay();
        resetForm();
      }}
    >
      {({ values, isSubmitting, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="m-4 rounded-lg  !bg-gray-400 center"
        >
          <h1 className="w-full text-center p-4 bg-black rounded-t-lg text-white">
            Create Item
          </h1>
          <div className="w-full my-0 p-10 rounded-b-lg">
            <label className="w-full text-center bg-black text-white">
              {columns[values.stateOrder]?.name ?? "Invalid choice"}
            </label>
            <InlineInput name="stateOrder" type="number" label="State Order" />
            <InlineInput name="task" type="text" label="Task" />

            <Button
              className="!border-black !bg-black px-3 py-1 "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateItemForm;
