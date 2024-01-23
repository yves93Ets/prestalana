import * as yup from "yup";

export const emailValidation = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const itemValidationSchema = (maxStateOrder: number) =>
  yup.object({
    stateOrder: yup
      .number()
      .min(0, "State order must be at least 0")
      .max(maxStateOrder, `State order must be at most ${maxStateOrder}`)
      .required("State order is required"),
    task: yup.string().required("Task is required"),
  });
