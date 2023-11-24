"use client"
import React from "react";
import Link from "next/link";
import { useState } from "react";

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_6131_1093)">
        <path d="M23.524 12.2756C23.524 11.4599 23.4579 10.6397 23.3168 9.83722H11.998V14.4582H18.4798C18.2108 15.9486 17.3466 17.2669 16.0811 18.1047V21.1031H19.9481C22.2189 19.013 23.524 15.9265 23.524 12.2756Z" fill="#4285F4"/>
        <path d="M11.9969 24C15.2334 24 17.9628 22.9374 19.9514 21.1031L16.0844 18.1047C15.0085 18.8367 13.6196 19.2512 12.0013 19.2512C8.87072 19.2512 6.2163 17.1391 5.26388 14.2995H1.27344V17.3904C3.31055 21.4426 7.45973 24 11.9969 24Z" fill="#34A853"/>
        <path d="M5.26059 14.2995C4.75792 12.8091 4.75792 11.1953 5.26059 9.70494V6.614H1.27455C-0.427454 10.0048 -0.427454 13.9996 1.27455 17.3904L5.26059 14.2995Z" fill="#FBBC04"/>
        <path d="M11.9969 4.74885C13.7078 4.7224 15.3613 5.36616 16.6003 6.54786L20.0263 3.12181C17.8569 1.0847 14.9776 -0.0352747 11.9969 -4.98258e-08C7.45973 -4.98258e-08 3.31055 2.55741 1.27344 6.614L5.25947 9.70494C6.20748 6.86092 8.86631 4.74885 11.9969 4.74885Z" fill="#EA4335"/>
        </g>
        <defs>
        <clipPath id="clip0_6131_1093">
        <rect width="23.5238" height="24" fill="white"/>
        </clipPath>
        </defs>
    </svg>
)

const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10.8008 9.02187C10.8008 9.98921 9.99489 10.7734 9.00078 10.7734C8.00667 10.7734 7.20078 9.98921 7.20078 9.02187C7.20078 8.05454 8.00667 7.27036 9.00078 7.27036C9.99489 7.27036 10.8008 8.05454 10.8008 9.02187Z" stroke="#C4C4C4" stroke-width="2"/>
    </svg>
)

const EyeClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M15.2998 14.625L4.0498 3.375M7.6498 7.83118C7.36974 8.13994 7.1998 8.54553 7.1998 8.98973C7.1998 9.95707 8.00569 10.7412 8.9998 10.7412C9.45816 10.7412 9.87651 10.5745 10.1943 10.3M15.3289 10.7412C15.9486 9.81362 16.1998 9.0571 16.1998 9.0571C16.1998 9.0571 14.5613 3.825 8.9998 3.825C8.68757 3.825 8.38771 3.84149 8.0998 3.87262M13.0498 13.0121C12.0167 13.6711 10.6868 14.1371 8.9998 14.1096C3.5075 14.0197 1.7998 9.0571 1.7998 9.0571C1.7998 9.0571 2.5932 6.52356 4.9498 4.98249" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round"/>
    </svg>
)

const SignUpSection = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div className="tracking-[-0.3px] pt-[60px]">
            <div className="flex justify-end items-center pr-[60px] gap-x-9 pb-[60px]">
                <h4 className="text-xl text-primary-greytext">
                    Already have an account?
                </h4>
                <button className="rounded-[10px] text-primary-black inline-flex text-lg justify-center px-6 py-[9px] items-center border-[1px] border-primary-border tracking-[-0.3px]">
                      Sign in
                </button>
            </div>
            <div className="tracking-[-0.3px]">
                <div className="pb-12 pl-[100px] xl:pl-[140px]">
                    <h4 className="text-4xl font-medium text-primary-black height-normal pb-2">Sign up on Verzo</h4>
                    <p className="text-xl text-primary-greytext">Let’s get you set up</p>
                </div>
                <form className="pl-[100px] xl:pl-[140px]">
                   <div className="pb-9">
                        <div className="pb-2">
                             <label htmlFor="name" className="text-base font-medium text-primary-black">Full name</label>
                        </div>
                        <div>
                         <input type="text" name="name" className="w-[400px] h-[47px] pl-[14px] border-primary-mainGrey rounded-[8px] border-[1px] focus:outline-none placeholder:text-sm" placeholder="e.g John Doe" />
                        </div>
                   </div>
                   <div className="pb-9">
                        <div className="pb-2">
                             <label htmlFor="email" className="text-base font-medium text-primary-black">Email address</label>
                        </div>
                        <div>
                         <input type="text" name="email" className="w-[400px] h-[47px] pl-[14px] border-primary-mainGrey rounded-[8px] border-[1px] focus:outline-none placeholder:text-sm" placeholder="e.g john@mail.com" />
                        </div>
                   </div>
                   <div className="pb-9 flex space-x-6">
                        <div>
                            <div className="pb-2">
                                 <label htmlFor="password" className="text-base font-medium text-primary-black">Password</label>
                            </div>
                            <div className="relative">
                             <input type={showPassword ? 'text' : 'password'} name="name" className="w-[188px] h-[47px] pl-[14px] border-primary-mainGrey rounded-[8px] border-[1px] focus:outline-none placeholder:text-sm" placeholder="8+ characters" />
                             <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-[16px] right-[10px]">{showPassword ? <EyeOpenIcon/> : <EyeClosedIcon />}</span> 
                            </div>
                        </div>
                        <div>
                            <div className="pb-2">
                                 <label htmlFor="password" className="text-base font-medium text-primary-black">Confirm password</label>
                            </div>
                            <div className="relative">
                             <input type={showPassword ? 'text' : 'password'} name="name" className="w-[188px] h-[47px] pl-[14px] border-primary-mainGrey rounded-[8px] border-[1px] focus:outline-none placeholder:text-sm" placeholder="8+ characters" />
                             <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-[16px] right-[10px]">{showPassword ? <EyeOpenIcon/> : <EyeClosedIcon />}</span> 
                            </div>
                        </div>
                   </div>
                   <div className="">
                        <button className="w-[400px] h-[48px] rounded-[10px] text-primary-blue bg-primary-brandTint text-lg">Create account</button>
                   </div>
                </form>
                <div className="flex space-x-[11px] pt-6 items-center pl-[100px] xl:pl-[140px]">
                    <hr className="w-[182px] h-[1px] bg-primary-borderGrey"/>
                    <span className="text-sm text-primary-greytext">Or</span>
                    <hr className="w-[182px] h-[1px] bg-primary-borderGrey"/>
                </div>
                <div className="pt-6 pl-[100px] xl:pl-[140px] ">
                    <button className="w-[400px] h-[48px] rounded-[10px] border-primary-border border-[1px] bg-white text-lg flex items-center justify-center gap-x-[6px]"> <span><GoogleIcon/></span> Sign up with Google</button>
                </div>
                <div className="pt-[72px]">
                    <hr className="h-[1px] bg-primary-hrGrey"/>
                </div>
                <div className="pt-9 pb-[33px] pl-[100px] xl:pl-[140px] ">
                    <p className="text-base xl:text-lg text-primary-greytext">By using the platform you agree to <Link href="#" className="text-primary-blue">Verzo’s Privacy Policy</Link> and <Link href="#" className="text-primary-blue">Terms of Use</Link></p>
                </div>
            </div>
        </div>
    )
}


export default SignUpSection