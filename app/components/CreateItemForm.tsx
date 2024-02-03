"use client";

import React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

import useColumns from "@/hooks/useColumns";
import { itemValidationSchema as validationSchema } from "@/utils/validation/schemas";
import { ItemForm } from "@/interfaces/Items";

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

  //slow down the spinner to actually see it xD can completely be removed
  const delay = (ms = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <Formik
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
          className="m-4 rounded-lg  bg-white-to-gray center p-4"
        >
          <h1 className="w-[87%] text-center p-4 rounded-t-lg border-b-gray-300 border-b-2">
            Create Item
          </h1>
          <div className="w-full my-0 p-10 rounded-b-lg center">
            <label className="w-full text-center button-primary rounded-2">
              {columns[values.stateOrder]?.name ?? "Invalid choice"}
            </label>
            <InlineInput
              min={1}
              max={max}
              name="stateOrder"
              type="number"
              label="State Order"
            />
            <InlineInput name="task" type="text" label="Task" />

            <Button
              className="!border-gray-300 !bg-gray-300 !text-black px-3 py-1 w-full"
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
