"use client";
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const PaymentLoader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center mt-[-50px] justify-center bg-opacity-70 bg-gray-300">
      <FadeLoader width={4} color="#3b82f6" />
    </div>
  );
};

export default PaymentLoader;
