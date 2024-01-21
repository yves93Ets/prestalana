import Image from "next/image";

import { emailValidation } from "../utils/validation/schemas";

// rgb(246 189 13)
export default function SignUp() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    onSubmit: async () => {
      console.log(1111);
    },
    validationSchema: emailValidation,
  });
  const button =
    "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={48}
          height={48}
          className="mx-auto h-10 w-auto rounded-full border border-black"
          src="/logo.png"
          alt="Prestalana"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button type="submit" className={button}>
              Sign in
            </button>
          </div>
          <div>
            <button type="submit" className={`${button} bg-black`}>
              Sign up
            </button>
          </div>
          <div>
            <button type="submit" className={`${button} bg-red-600`}>
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
