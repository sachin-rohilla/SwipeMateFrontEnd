import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-smooth">
      <div className="flex flex-col md:flex-row items-center w-full max-w-screen-xl">
        {/* Left Image Section */}
        <div className="md:w-2/3 mb-8 md:mb-0">
          <img
            src="./main.png"
            alt="Sign Up Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Form Section */}
        <form className="flex flex-col gap-6 p-6 w-full sm:w-96 md:w-1/2">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold text-primary">Sign Up</h1>
            <p className="mt-2 font-modern">
              Ready to start something special? Let’s create your account 💖
            </p>
          </div>

          {/* Email Input */}
          <label className="input flex border border-base-300 items-center gap-2">
            <Mail className="h-5 w-5 opacity-50" />
            <input
              type="email"
              placeholder="mail@site.com"
              required
              className=" p-2 rounded w-full mt-1"
            />
          </label>

          {/* Password Input */}
          <label className="input border border-base-300 flex items-center gap-2 mt-4">
            <Lock className="h-5 w-5 opacity-50" />
            <input
              type={passwordVisible ? "text" : "password"}
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={handlePasswordChange}
              className=" p-2 rounded w-full mt-1"
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

          {/* Confirm Password Input */}
          <label className="input border border-base-300 flex items-center gap-2 mt-4">
            <Lock className="h-5 w-5 opacity-50" />
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              required
              placeholder="Confirm Password"
              minLength={8}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className=" p-2 rounded w-full mt-1"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="ml-2"
            >
              {confirmPasswordVisible ? (
                <EyeOff className="h-5 w-5 opacity-50" />
              ) : (
                <Eye className="h-5 w-5 opacity-50" />
              )}
            </button>
          </label>

          {/* Password Mismatch Validation */}
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm -mt-2 ml-4">
              Passwords do not match
            </p>
          )}

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              title="Sign Up"
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
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to={"/login"} className="text-neutral font-semibold">
                Sign In
              </Link>{" "}
              and join us!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
