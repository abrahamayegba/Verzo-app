import React from "react";
import SideBar from "../register/SideBar";
import SignInSection from "./SignInSection";

const SignIn = () => {

    return (
        <div className="flex">
            <div className="w-[420px] xl:w-[503px] fixed inset-y-0 h-screen">
                <SideBar />
            </div>
            <div className="flex-1 pl-[400px] xl:pl-[503px] h-full">
               <SignInSection />
            </div>
        </div>
    )
}



export default SignIn