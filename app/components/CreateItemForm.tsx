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
          className="sm:mx-auto sm:w-full sm:max-w-sm  rounded my-20 p-10 !bg-white "
        >
          <h1 className="text-center p-4">Create Item</h1>
          <label className="w-full text-center bg-blue-600 text-white">
            {columns[values.stateOrder]?.name ?? "Invalid choice"}
          </label>
          <InlineInput name="stateOrder" type="number" label="State Order" />

          <InlineInput name="task" type="text" label="Task" />

          <Button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateItemForm;
