import { ArrowRight, House } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center font-poppins">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-lg mt-2 third-main">
          The page you are looking for does not exist.
        </p>

        <Link
          to={"/"}
          title="Go back to home page"
          replace
          className="group cursor-pointer slide-anime px-7 py-3 rounded-full w-[290px] mt-4 bg-base-dark   flex justify-between items-center font-semibold "
        >
          <House className="inline text-lg" />
          Go back to home page
          <div className="group-hover:translate-x-2 transition-all">
            <ArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
