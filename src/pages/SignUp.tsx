import { Mail, Lock, User, Calendar, Trash } from "lucide-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import { signUpValidationSchema } from "../utils/formSchema";
import { useAppContext } from "../context/AppContext";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import toast from "react-hot-toast";
import UploadImageComp from "../components/UploadImageComp";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

declare global {
  interface Window {
    cloudinary: any;
  }
}

const SignUp = () => {
  const { userData } = useAppContext();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signUpApi, isLoading: isSignUpLoading } = useAuth();
  const handleUpload = () => {
    if (window.cloudinary) {
      setIsLoading(true);
      window.cloudinary.openUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET,
          cropping: true,
          showAdvancedOptions: true,
          sources: ["local"],
          multiple: false,
          maxFileSize: 5 * 1024 * 1024,
          acceptedFiles: "image/jpeg,image/jpg,image/png",
        },
        (error: any, result: any) => {
          setIsLoading(false);
          if (error) {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image. Please try again.");
          } else if (result && result.event === "success") {
            // console.log("Upload result:", result);
            const fileType = result.info.format.toLowerCase();
            if (["jpg", "jpeg", "png"].includes(fileType)) {
              setImageUrl(result.info.secure_url);
              // console.log("Image URL set:", result.info.secure_url);
            } else {
              toast.error(
                "Invalid file type. Please upload a JPG, JPEG, or PNG image."
              );
            }
          }
        }
      );
    } else {
      console.error("Cloudinary library is not loaded properly.");
      toast.error("Something went wrong! Please refresh the page.");
    }
  };

  if (userData) {
    return <Navigate to="/" />;
  }

  if (isSignUpLoading) {
    return <Loader />;
  }
  return (
    <div className="flex items-center  justify-center min-h-screen px-4 font-smooth">
      <div className="flex flex-col md:flex-row  w-full max-w-screen-xl">
        {/* Left Image Section (Small Image) */}
        <div className="md:w-1/2 mb-8 md:mb-0 p-4 flex justify-center">
          <img
            src="./love.png"
            alt="Sign Up Illustration"
            className="w-full h-[100vh] rounded-lg"
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
            gender: "",
            about: "",
            profilePicUrl: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={(values) => {
            if (imageUrl) {
              values.profilePicUrl = imageUrl;

              signUpApi(values);
            } else {
              toast.error("Please upload a profile picture");
            }
          }}
        >
          {({}) => (
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
                <label className="flex items-center gap-2">
                  <Field
                    as="select"
                    name="gender"
                    className="select w-full border border-base-300"
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                </label>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* about */}

              <div className="flex flex-col gap-2 col-span-full">
                <label className="textarea textarea-bordered flex items-start ">
                  <CiUser className="h-5 w-5 opacity-50 mt-4" size={20} />
                  <Field
                    as="textarea"
                    id="textarea"
                    name="about"
                    className="textarea resize-none p-2 w-full mt-1 focus:border-none focus:ring-0 border-base-300"
                    placeholder="About"
                  />
                </label>
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* image upload button  */}
              <div className="w-full col-span-full">
                <UploadImageComp
                  handleUpload={handleUpload}
                  imageUrl={imageUrl}
                  isLoading={isLoading}
                />
                {imageUrl && (
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-60 mx-auto rounded-xl h-60 object-cover mt-4"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl(""),
                          toast.success("Image deleted successfully");
                      }}
                      className="group relative   mt-4 inline-flex h-10 items-center justify-center overflow-hidden rounded-full border-2 dark:border-error border-error font-medium"
                    >
                      <div className="inline-flex h-10 translate-x-0 items-center justify-center gradient-button px-6 dark:text-error text-error transition group-hover:-translate-x-[150%]">
                        Delete Image
                      </div>
                      <div className="absolute inline-flex h-10 w-full translate-x-[100%] items-center justify-center bg-error dark:bg-error px-6 text-white transition duration-300 group-hover:translate-x-0">
                        <Trash size={20} />
                      </div>
                    </button>
                  </div>
                )}
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
