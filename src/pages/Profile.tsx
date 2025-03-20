import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import { Mail, User, Calendar, Trash } from "lucide-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { CiUser } from "react-icons/ci";
import toast from "react-hot-toast";
import UploadImageComp from "../components/UploadImageComp";
import { useAppContext } from "../context/AppContext";
import { profileValidationSchema } from "../utils/formSchema";
import ProfileSkeleton from "../components/ProfileSkeleton";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAppContext();

  const { updateProfile, isLoading: isProfileLoading } = useProfile();

  useEffect(() => {
    if (userData) {
      setImageUrl(userData?.profilePicUrl);
    }
  }, [userData]);

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
            const fileType = result.info.format.toLowerCase();
            if (["jpg", "jpeg", "png"].includes(fileType)) {
              setImageUrl(result.info.secure_url);
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

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex flex-col items-center">
      {imageUrl && (
        <div className="flex flex-col justify-center items-center mt-8">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-2">
              <img src={imageUrl} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setImageUrl(""), toast.success("Image deleted successfully");
            }}
            className="group relative mt-4 inline-flex h-10 items-center justify-center overflow-hidden rounded-full border-2 dark:border-error border-error font-medium"
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

      {/* Image upload button */}
      <div className="w-1/2 px-6 mb-2">
        <UploadImageComp
          handleUpload={handleUpload}
          imageUrl={imageUrl}
          isLoading={isLoading}
        />
      </div>
      <Formik
        initialValues={{
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          email: userData?.email || "",
          password: "",
          confirmPassword: "",
          age: userData?.age || "",
          gender: userData?.gender || "",
          about: userData?.about || "",
          profilePicUrl: imageUrl || userData?.profilePicUrl || "",
        }}
        validationSchema={profileValidationSchema}
        onSubmit={(values) => {
          if (imageUrl) {
            values.profilePicUrl = imageUrl;
            updateProfile(values);
          } else {
            toast.error("Please upload a profile picture");
          }
        }}
      >
        {({}) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 w-full sm:w-96 md:w-1/2">
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
                  disabled
                />
              </label>
              <ErrorMessage
                name="email"
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

            {/* About */}
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

            {/* Submit Button */}
            <div className="text-center mt-6 col-span-full">
              <button
                type="submit"
                className="group relative cursor-pointer p-3 w-full border text-white rounded-full overflow-hidden font-semibold btn btn-primary transition-all duration-300"
              >
                <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
                  Update Profile
                </span>
                <div className="flex gap-2 text-white z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                  <span>Let’s Start This Journey 💖</span>
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
