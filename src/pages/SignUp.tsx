import { Mail, Lock, Eye, EyeOff, User, Calendar } from "lucide-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { signUpValidationSchema } from "../utils/formSchema";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-smooth">
      <div className="flex flex-col md:flex-row items-center w-full max-w-screen-xl">
        {/* Left Image Section (Small Image) */}
        <div className="md:w-1/2 mb-8 md:mb-0 p-4 flex justify-center">
          <img
            src="./main.png"
            alt="Sign Up Illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Right Form Section (Grid Layout) */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            age: "",
            gender: "male",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 w-full sm:w-96 md:w-1/2">
              <div className="text-center mb-4 col-span-full">
                <h1 className="text-3xl font-semibold text-primary">Sign Up</h1>
                <p className="mt-2 font-modern">
                  Ready to start something special? Let’s create your account 💖
                </p>
              </div>

              {/* First Name */}
              <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
                <label className="input flex border border-base-300 items-center gap-2">
                  <User className="h-5 w-5 opacity-50" />
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="p-2 rounded w-full mt-1"
                  />
                </label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
                <label className="input flex border border-base-300 items-center gap-2">
                  <User className="h-5 w-5 opacity-50" />
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="p-2 rounded w-full mt-1"
                  />
                </label>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 col-span-full">
                <label className="input flex border border-base-300 items-center gap-2">
                  <Mail className="h-5 w-5 opacity-50" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="mail@site.com"
                    className="p-2 rounded w-full mt-1"
                  />
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 col-span-full">
                <label className="input flex border border-base-300 items-center gap-2">
                  <Lock className="h-5 w-5 opacity-50" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 rounded w-full mt-1"
                  />
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2 col-span-full">
                <label className="input flex border border-base-300 items-center gap-2">
                  <Lock className="h-5 w-5 opacity-50" />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="p-2 rounded w-full mt-1"
                  />
                </label>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Age */}
              <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
                <label className="input flex border border-base-300 items-center gap-2">
                  <Calendar className="h-5 w-5 opacity-50" />
                  <Field
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="p-2 rounded w-full mt-1"
                  />
                </label>
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
                <label className="input flex border border-base-300 items-center gap-2">
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={(e) => setFieldValue("gender", e.target.value)}
                    className="p-2 rounded w-full mt-1"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6 col-span-full">
                <button
                  type="submit"
                  className="group relative cursor-pointer p-3 w-full border text-white rounded-full overflow-hidden font-semibold btn btn-primary transition-all duration-300"
                >
                  <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
                    Sign Up
                  </span>
                  <div className="flex gap-2 text-white z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                    <span>Let’s Start This Journey 💖</span>
                  </div>
                </button>
              </div>

              {/* Already Have an Account Link */}
              <div className="text-center mt-4 col-span-full">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-neutral font-semibold">
                    Sign In
                  </Link>{" "}
                  and join us!
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
