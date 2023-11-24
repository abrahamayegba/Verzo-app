import React from "react";
import Otp from "./Otp";
const Modal = () => {

    return (
        <div className="relative">
            <Otp />
            <div className="bg-primary-overlay w-full h-full fixed top-0 left-0 z-10">
            </div>
        </div>
    )
}

export default Modal