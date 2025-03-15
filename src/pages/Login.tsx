import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loginApi, isLoading } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginApi(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-smooth">
      <div className="flex flex-col md:flex-row items-center w-full max-w-screen-xl">
        {/* Left Image Section */}
        <div className="md:w-2/3 mb-8 md:mb-0">
          <img
            src="./main.png"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-6 w-full sm:w-96 md:w-1/2"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold text-primary">Sign In</h1>
            <p className=" mt-2 font-modern">
              Our Story Awaits… Let’s Make It Real 💑
            </p>
          </div>

          {/* Email Input */}
          <label className="input flex border border-base-300 items-center gap-2">
            <Mail className="h-5 w-5 opacity-50" />
            <input
              name="email"
              type="email"
              placeholder="mail@site.com"
              required
              value={formData?.email}
              onChange={handleChange}
              className=" p-2 rounded w-full mt-1"
            />
          </label>
          <div className="validator-hint hidden text-red-500">
            Enter valid email address
          </div>

          {/* Password Input */}
          <label className="input border border-base-300 flex items-center gap-2 mt-4">
            <Lock className="h-5 w-5 opacity-50" />
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              required
              placeholder="Password"
              value={formData?.password}
              onChange={handleChange}
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className=" p-2 rounded  w-full mt-1"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2"
            >
              {passwordVisible ? (
                <EyeOff className="h-5 w-5 opacity-50" />
              ) : (
                <Eye className="h-5 w-5 opacity-50" />
              )}
            </button>
          </label>
          <p className="validator-hint hidden text-red-500">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              title="Sign In"
              className="group relative cursor-pointer p-3 w-full border text-white rounded-full overflow-hidden font-semibold btn btn-primary transition-all duration-300"
            >
              <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
                Sign In
              </span>
              <div className="flex gap-2 text-white z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                <span>Let's Connect! </span>
                💕
              </div>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              New here?{" "}
              <Link to="/signup" className="text-neutral font-semibold">
                Sign up
              </Link>{" "}
              and join us!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
