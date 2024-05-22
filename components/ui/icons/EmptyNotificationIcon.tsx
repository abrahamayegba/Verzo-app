import React from "react";

const EmptyNotificationIcon = () => {
  return (
    <svg
      className=" w-5 h-5"
      data-testid="geist-icon"
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      aria-label="Empty inbox"
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"></path>
    </svg>
  );
};

export default EmptyNotificationIcon;
