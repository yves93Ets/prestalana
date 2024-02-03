"use client";

import Image from "next/image";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

import { emailValidation as validationSchema } from "@/utils/validation/schemas";
import WithHover from "@/app/components/hoc/WithHover";

export default function SignInWithEmail() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    onSubmit: async () => {},
    validationSchema,
  });

  const notify = (text: string, success = false) =>
    success ? toast.success(text) : toast.error(text);

  const handleSignInWithEmail = async () => {
    if (!formik.values.email) return notify("Email is required");
    if (!formik.isValid) return notify("Invalid email");
    if (formik.errors && formik.errors.email)
      return notify(formik.errors.email);

    formik.setSubmitting(true);
    const signInResult = await signIn("email", {
      email: formik.values.email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    formik.setSubmitting(false);

    if (!signInResult?.ok)
      return notify(
        "Something went wrong, please try again" + signInResult?.error
      );

    return notify("Check your email", true);
  };
  const disabled = formik.isSubmitting || formik.values.email === "";

  return (
    <>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        theme="colored"
      />
      <div className="loginBtn">
        <WithHover onlyGrow>
          <Image
            width={48}
            height={48}
            className="mx-auto h-10 w-auto rounded-full border border-black"
            src="/logo.png"
            alt="Prestalana"
          />
        </WithHover>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="loginBtn">
        <form className="space-y-6">
          <div className="mb-6">
            <label className="label">Email address</label>
            <div className="mt-2">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSignInWithEmail();
                  }
                }}
                id="email"
                name="email"
                type="email"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </form>
        <WithHover>
          <button
            className={disabled ? "button-disabled" : "button"}
            disabled={disabled}
            onClick={handleSignInWithEmail}
          >
            {formik.isSubmitting ? <Spinner /> : "Sign in with email"}
          </button>
        </WithHover>
      </div>
    </>
  );
}
