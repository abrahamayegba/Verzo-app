import React from "react";

const ResetLinkSection = () => {

    return (
        <div className="tracking-[-0.3px] pt-[60px]">
            <div className="flex justify-end items-center pr-[60px] gap-x-9 pb-[60px]">
                <h4 className="text-xl text-primary-greytext">
                   Don't have an account?
                </h4>
                <button className="rounded-[10px] text-primary-black inline-flex text-lg justify-center px-6 py-[9px] items-center border-[1px] border-primary-border tracking-[-0.3px]">
                      Sign up
                </button>
            </div>
            <div className="tracking-[-0.3px]">
                <div className="pb-12 pl-[100px] xl:pl-[140px]">
                    <h4 className="text-4xl font-medium text-primary-black height-normal pb-2">Reset link</h4>
                    <p className="text-xl text-primary-greytext">A reset link will be sent to your email address</p>
                </div>
                <form className="pl-[100px] xl:pl-[140px]">
                   <div className="pb-9">
                        <div className="pb-2">
                             <label htmlFor="name" className="text-base font-medium text-primary-black">Email address</label>
                        </div>
                        <div>
                         <input type="text" name="name" className="w-[400px] h-[47px] pl-[14px] text-lg font-medium border-primary-mainGrey rounded-[8px] border-[1px] focus:outline-none placeholder:text-sm" placeholder="e.g john@mail.com" />
                        </div>
                   </div>
                   <div className="relative">
                        <button className="w-[400px] h-[48px] rounded-[10px] text-primary-blue bg-primary-brandTint text-lg">Send link</button>
                   </div>
                </form>
            </div>
        </div>
    )
}

export default ResetLinkSection