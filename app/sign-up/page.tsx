import Image from "next/image";
import { useFormik } from "formik";
import { emailValidation } from "../../utils/validation/schemas";

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

  return (
    <div className="container">
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
            <label className="label">Email address</label>
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
            <button type="submit" className="button">
              Sign in
            </button>
          </div>
          <div>
            <button type="submit" className={`button bg-black`}>
              Sign up
            </button>
          </div>
          <div>
            <button type="submit" className={`button bg-red-600`}>
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
