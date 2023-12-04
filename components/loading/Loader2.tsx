import React from "react";
import BarLoader from "react-spinners/BarLoader";

const Loader2 = () => {
  return (
    <div className="-mt-24 flex h-screen items-center justify-center">
      <div className=" z-[140px] flex w-full items-center justify-center bg-transparent">
        <BarLoader
          className=" ml-[-50px]"
          height={2}
          width={250}
          color="#3b82f6"
        />
      </div>
    </div>
  );
};

export default Loader2;
