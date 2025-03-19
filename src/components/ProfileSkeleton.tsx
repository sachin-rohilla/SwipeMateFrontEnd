const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Skeleton for Profile Picture */}
      <div className="skeleton h-40 w-40 rounded-full mb-6"></div>

      {/* Skeleton for Name and Email (Top Section) */}
      <div className="flex flex-col gap-4 items-center mb-6">
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-20"></div>
      </div>

      {/* Skeleton for Form Inputs */}
      <div className="w-full sm:w-96 md:w-1/2 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
            <div className="skeleton h-8 w-full"></div>
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
            <div className="skeleton h-8 w-full"></div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 col-span-full">
            <div className="skeleton h-8 w-full"></div>
          </div>

          {/* Age */}
          <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
            <div className="skeleton h-8 w-full"></div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
            <div className="skeleton h-8 w-full"></div>
          </div>

          {/* About Section */}
          <div className="flex flex-col gap-2 col-span-full">
            <div className="skeleton h-16 w-full"></div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <div className="skeleton h-12 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
