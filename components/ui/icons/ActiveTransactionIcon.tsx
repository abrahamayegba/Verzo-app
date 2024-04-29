import React from "react";

const ActiveTransactionIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.594 3.86145H3.31615C2.53964 3.86145 1.91016 4.33749 1.91016 4.9247V21.9368C1.91016 22.524 2.53964 23 3.31615 23H21.594C22.3705 23 23 22.524 23 21.9368V4.9247C23 4.33749 22.3705 3.86145 21.594 3.86145Z"
        stroke="url(#paint0_linear_10060_16427)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.36357 1V5.15138M16.545 1V5.15138M7 11.3785H17.9085M8.36357 16.8081H15.9995"
        stroke="url(#paint1_linear_10060_16427)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10060_16427"
          x1="1.91016"
          y1="4.18505"
          x2="26.4818"
          y2="12.8562"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.307292" stopColor="#027DFF" stopOpacity="0.9" />
          <stop offset="0.494792" stopColor="#8C01E8" stopOpacity="0.9" />
          <stop offset="0.958333" stopColor="#6275E9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10060_16427"
          x1="7"
          y1="1.26729"
          x2="20.6268"
          y2="4.27863"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.307292" stopColor="#027DFF" stopOpacity="0.9" />
          <stop offset="0.494792" stopColor="#8C01E8" stopOpacity="0.9" />
          <stop offset="0.958333" stopColor="#6275E9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ActiveTransactionIcon;
