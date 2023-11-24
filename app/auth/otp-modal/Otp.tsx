import React from "react";

const EllipseIcon1 = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#F9FCFF"/>
    </svg>
)

const EllipseIcon2 = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#EDF6FF"/>
    </svg>
)

const PasswordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6.52928 9.30247H6.66931M12.0004 9.30247H12.1404M17.3299 9.30247H17.4699M11.4004 14.7025H4.53372C3.35552 14.7025 2.40039 13.7473 2.40039 12.5691V6.0358C2.40039 4.85759 3.35552 3.90247 4.53372 3.90247H19.4671C20.6453 3.90247 21.6004 4.85759 21.6004 6.0358V9.30247M15.4116 13.5975L16.8016 12.9025C17.8151 12.3958 19.0081 12.3958 20.0216 12.9025L21.4116 13.5975C21.4116 13.5975 21.4116 15.7875 21.4116 16.9425C21.4116 18.0975 20.3439 18.8772 18.4116 20.0975C16.4792 18.8772 15.4116 17.8475 15.4116 16.9425V13.5975Z" stroke="url(#paint0_linear_6144_958)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear_6144_958" x1="2.40039" y1="4.1763" x2="24.3868" y2="12.5237" gradientUnits="userSpaceOnUse">
          <stop offset="0.307292" stopColor="#027DFF" stopOpacity="0.9"/>
          <stop offset="0.494792" stopColor="#8C01E8" stopOpacity="0.9"/>
          <stop offset="0.958333" stopColor="#6275E9"/>
        </linearGradient>
      </defs>
    </svg>
)

const Otp = () => {
    return(
        <div className="fixed tracking-[-0.3px] z-20 top-[25%] left-[30%] xl:left-[40%]">
            <div className="w-[448px] rounded-[10px] bg-white">
                <div className="pl-6 pt-9">
                    <div className="relative">
                        <EllipseIcon1 />
                        <span className="absolute top-[6px] left-[6px]"><EllipseIcon2 /></span>
                        <span className="absolute top-[13px] left-[11px]"><PasswordIcon /></span>
                    </div>
                    <h4 className="text-lg pt-3 pb-2 font-medium">Enter OTP</h4>
                    <p className="text-base text-primary-greytext">Please enter the OTP sent to your email inbox</p>
                </div>
                <div className="w-[346px] mx-auto flex mt-12 justify-between">
                    <input type="password" className="w-[50px] h-[50px] text-center bg-primary-hrGrey rounded-[8px] focus:outline-none text-2xl" />
                    <input type="password" className="w-[50px] h-[50px] text-center bg-primary-hrGrey rounded-[8px] focus:outline-none text-2xl" />
                    <input type="password" className="w-[50px] h-[50px] text-center bg-primary-hrGrey rounded-[8px] focus:outline-none text-2xl" />
                    <input type="password" className="w-[50px] h-[50px] text-center bg-primary-hrGrey rounded-[8px] focus:outline-none text-2xl" />
                    <input type="password" className="w-[50px] h-[50px] text-center bg-primary-hrGrey rounded-[8px] focus:outline-none text-2xl" />
                </div>
                <div className="pt-12 pb-6">
                    <hr className="h-[1px] bg-primary-borderGrey" />
                    <div className="mt-3 flex justify-end pr-6">
                        <button className="text-white border-primary-blue bg-primary-blue rounded-[10px] inline-flex justify-center w-[136px] h-[48px] items-center border-[1px]  text-lg tracking-[-0.3px]">
                          Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Otp