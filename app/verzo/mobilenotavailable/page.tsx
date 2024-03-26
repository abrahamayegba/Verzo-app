import React from "react";
import MobileUnavailable from "@/components/ui/icons/MobileUnavailable";

const MobileNotAvailable: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-3">
      <div>
        <MobileUnavailable />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-5 mt-2 text-center">
        This application is not available on mobile screens.
      </h1>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Please view this application on a desktop or larger screen for the best
        experience.
      </p>
      <p className="text-lg text-gray-600 text-center">
        Stay tuned! Our mobile app is coming soon.
      </p>
    </div>
  );
};

export default MobileNotAvailable;
