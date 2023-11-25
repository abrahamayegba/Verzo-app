import Link from "next/link";
import React from "react";

const Signin = () => {
  return (
    <div className=" w-full min-h-screen">
      <div className=" flex flex-col md:flex-row min-h-screen">
        <div className=" w-full md:w-[35%] flex flex-col purplegradient md:px-[30px] lg:px-[60px] px-[20px] py-[40px] md:py-[65px] gap-y-10 text-white">
          <Link href="#">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="104"
                height="36"
                viewBox="0 0 104 36"
                fill="none"
              >
                <g clipPath="url(#clip0_5918_1715)">
                  <path
                    d="M93.0688 35.9553C96.5133 35.9553 99.1898 34.9607 101.1 32.9521C103.01 30.9444 103.947 28.1621 103.947 24.5181C103.947 20.8734 103.003 18.0256 101.1 16.0172C99.1986 14.0088 96.5133 13.0347 93.0688 13.0347C89.6234 13.0347 86.9364 14.0288 85.0366 16.0172C83.1376 18.0055 82.1895 20.8534 82.1895 24.5181C82.1895 28.1823 83.135 30.9866 85.0366 32.975C86.939 34.9633 89.6007 35.9553 93.0688 35.9553ZM93.0688 31.5631C88.9656 31.5631 86.9897 29.3081 86.9897 24.5181C86.9897 19.6816 88.9656 17.4525 93.0688 17.4525C97.171 17.4525 99.1242 19.6816 99.1242 24.5181C99.1242 29.2878 97.1282 31.5631 93.0688 31.5631Z"
                    fill="white"
                  />
                  <path
                    d="M63.3366 29.016C60.5149 31.9268 61.3126 36.0901 64.8831 35.9519H78.7765C80.0518 35.9519 80.6895 35.3111 80.6895 34.0295V33.2963C80.6895 32.0165 80.0518 31.3758 78.7765 31.374H68.6153C68.0004 31.374 67.8412 31.0871 68.2051 30.7323L78.9646 19.951C80.3282 18.4612 80.8749 16.6762 80.6239 15.3498C80.3737 14.0232 79.1754 13.0348 77.4444 13.0348H63.5448C62.2686 13.0119 61.6345 13.6536 61.6345 14.9372V15.6448C61.6345 16.9284 62.2713 17.5702 63.5448 17.5702H73.7147C74.2842 17.5702 74.4635 17.8567 74.1241 18.232L63.3366 29.016Z"
                    fill="white"
                  />
                  <path
                    d="M57.8422 13.0376C48.5831 12.8715 47.2023 13.6937 46.9375 19.3838V34.0525C46.9375 34.3025 46.9865 34.5507 47.0816 34.7813C47.1769 35.0128 47.3164 35.2223 47.4922 35.3992C47.668 35.5752 47.8768 35.7161 48.1065 35.8111C48.3362 35.9062 48.5823 35.9555 48.8308 35.9555H50.0006C50.2491 35.9555 50.4957 35.9062 50.7249 35.8111C50.9549 35.7161 51.164 35.5752 51.3398 35.3992C51.5156 35.2223 51.6547 35.0128 51.75 34.7813C51.8454 34.5507 51.8943 34.3025 51.8943 34.0525V19.951C51.8865 19.4983 51.9092 19.0455 51.9626 18.5958C52.0002 18.3199 52.1323 18.0659 52.3369 17.8784C52.5416 17.6909 52.8049 17.5817 53.0813 17.5702H57.8081C59.1831 17.5702 59.8688 16.9141 59.8688 15.6449V14.9171C59.8688 13.6708 59.1717 13.0177 57.8422 13.0376Z"
                    fill="white"
                  />
                  <path
                    d="M14.0495 28.7577C13.6907 29.8606 13.3576 30.5569 13.0444 30.8948C12.8846 31.0586 12.6926 31.1871 12.481 31.2724C12.2693 31.3578 12.0424 31.3983 11.8145 31.3904C11.5967 31.3974 11.38 31.357 11.1794 31.2716C10.9789 31.1862 10.7992 31.0577 10.6529 30.8948C10.3169 30.5569 9.98095 29.8606 9.62504 28.7577L5.15794 14.5874C4.8476 13.5531 4.15293 13.0374 3.05677 13.0374H1.78411C0.420385 13.0374 -0.208863 13.8454 0.218245 15.1718L5.11525 29.8835C5.91813 32.2442 6.7922 33.8409 7.70607 34.6744C8.62003 35.508 10.0094 35.9551 11.8201 35.9551C13.6309 35.9551 15.0374 35.5282 15.9769 34.6744C16.9165 33.8206 17.7649 32.2442 18.5393 29.8835L23.4648 15.1718C23.889 13.8454 23.2627 13.0374 21.8989 13.0374H20.6262C19.5301 13.0145 18.8383 13.5302 18.5023 14.5874L14.0495 28.7577Z"
                    fill="white"
                  />
                  <path
                    d="M43.5825 24.893C44.3711 24.1422 44.7669 22.9504 44.7669 21.3376C44.7669 18.7103 43.9327 16.6561 42.2415 15.2007C40.5503 13.7452 38.1844 13.0347 35.1323 13.0347C28.0145 13.0347 24.2051 17.1202 24.2051 24.5181C24.2051 28.2422 25.193 31.0755 27.1689 33.0181C28.8203 34.6799 30.9983 35.6516 33.6632 35.9122L34.1501 35.9518C34.4831 35.9747 34.8191 35.9861 35.1636 35.9861H41.6664C41.7285 35.9694 41.7894 35.9492 41.8486 35.9236C42.8394 35.7916 43.3377 35.1587 43.3377 34.0294V33.2962C43.3377 32.0164 42.7008 31.3757 41.4272 31.3739C41.4272 31.3739 35.5878 31.5746 33.6574 31.3739C31.3285 31.1301 29.9078 29.5686 29.3071 27.3884L39.2463 26.3515C41.3418 26.1306 42.7682 25.6438 43.5825 24.893ZM29.011 23.1053C29.3612 19.1085 31.3798 17.3752 35.1323 17.3752C38.4036 17.3523 40.0492 18.5442 40.0492 20.9078C40.0492 21.7673 39.7645 22.0108 38.1844 22.1884L29.011 23.1053Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M92.8912 0.0517991L92.4224 0.0523273L91.8862 0.0574324L89.7808 0.0547038C89.598 0.0538236 89.4169 0.0728358 89.2385 0.111476C89.0749 0.146684 88.9131 0.187877 88.7522 0.234968L88.7452 0.237608C88.6507 0.265071 88.558 0.294293 88.467 0.326684C87.2941 0.720132 86.2471 1.41971 85.431 2.35386C85.3374 2.46503 85.2447 2.57875 85.1529 2.69494C84.9604 2.94588 84.7846 3.2095 84.6272 3.48386C83.7621 4.98794 83.4805 6.76056 83.8347 8.46128C83.8592 8.57984 83.8872 8.69823 83.9178 8.81591C83.9257 8.8461 83.9344 8.87629 83.9432 8.90481C83.9493 8.924 83.958 8.95762 83.9659 8.99045C83.9703 9.00647 83.9747 9.02231 83.9782 9.03613L83.9887 9.07469C84.0158 9.16244 84.0438 9.24976 84.0744 9.33734C84.0831 9.3633 84.0936 9.38979 84.1032 9.41611C84.1146 9.44754 84.1269 9.47878 84.1365 9.50897C84.1776 9.61697 84.2196 9.72374 84.2659 9.82945C84.2712 9.84116 84.2782 9.85172 84.2869 9.86035C84.384 9.95682 84.4933 10.0397 84.6123 10.1069C84.6657 10.1381 84.7216 10.166 84.7785 10.1902C84.8292 10.2121 84.8843 10.2229 84.9394 10.2218L85.9593 10.2236L92.8343 10.2229L93.7834 10.2196L94.2776 10.2193C94.8208 10.2842 95.37 10.2843 95.9132 10.2195C96.9235 10.1004 97.8961 9.76168 98.7638 9.22687C99.6315 8.69198 100.373 7.97374 100.938 7.12179C101.005 7.02207 101.07 6.92014 101.132 6.81619L101.21 6.67967C101.296 6.53074 101.372 6.37856 101.445 6.2254L101.469 6.17303C101.908 5.22541 102.13 4.19083 102.12 3.14533L102.123 3.1412L102.122 3.11875C102.118 2.89466 102.107 2.66624 102.081 2.44672C102.088 2.44373 102.087 2.41979 102.086 2.3955C102.085 2.37076 102.084 2.34585 102.092 2.34233C102.022 1.59065 101.825 0.856474 101.51 0.171154L101.418 0.0102539L92.8912 0.0517991ZM87.9772 4.29373C87.3125 4.96734 86.918 5.864 86.8699 6.81205C86.8637 6.91627 86.8629 7.02004 86.8699 7.12716L87.0588 7.12611L89.0758 7.12699L89.2604 7.12347L89.3269 7.124L94.5391 7.12708C95.1111 7.17795 95.6876 7.10287 96.229 6.90711C97.0241 6.66242 97.7186 6.16405 98.2075 5.48718C98.6965 4.8104 98.9536 3.99182 98.9396 3.15519L98.8443 3.15546H91.2669L90.938 3.15282L90.8042 3.1529C90.778 3.15334 90.7517 3.15352 90.7264 3.1537C90.6896 3.15387 90.6529 3.15414 90.617 3.15493L90.6021 3.15537C89.71 3.17843 88.8536 3.5129 88.1793 4.1014L88.146 4.13133C88.0883 4.18291 88.0314 4.23678 87.9772 4.29373ZM102.026 2.50112L102.028 2.4961L102.024 2.49241C102.012 2.49866 102.001 2.50385 101.99 2.50799L101.991 2.51582C101.998 2.51432 102.003 2.51203 102.009 2.50913L102.026 2.50112Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5918_1715">
                    <rect width="104" height="36" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </Link>
          <p className=" text-lg">
            Ready to revolutionize your business finances? Join Verzo’s
            exclusive waitlist today and be among the first to experience the
            future of financial management.
          </p>
          <div className=" flex flex-col gap-y-6 text-lg"></div>
        </div>
        <div className=" w-full flex">
          <div className=" flex md:px-[66px] px-[20px] py-[40px] md:py-[65px] w-full flex-col">
            <h3 className=" text-3xl text-primary-black font-medium">
              Join our waitlist
            </h3>
            <form
              action="#"
              method="POST"
              className="mt-6 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8"
            >
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="first-name"
                  className=" text-[15px] text-primary-black"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    id="first-name"
                    autoComplete="first-name"
                    className="block w-full rounded-md bg-transparent border focus:border-[1.5px] border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="last-name"
                  className=" text-[15px] text-primary-black"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="last-name"
                    autoComplete="last-name"
                    className="block w-full rounded-md bg-transparent border focus:border-[1.5px] border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="email"
                  className=" text-[15px] text-primary-black"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-transparent border focus:border-[1.5px] border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
              <div className=" mt-1 col-span-2 lg:col-span-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="phone"
                    className=" text-[15px] text-primary-black"
                  >
                    Phone
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-transparent border focus:border-[1.5px] border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:outline-none focus:border-primary-blue"
                    aria-describedby="phone-optional"
                  />
                </div>
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="businessname"
                  className=" text-[15px] text-primary-black"
                >
                  Business name
                </label>
                <div className="mt-1">
                  <input
                    id="businessname"
                    type="text"
                    autoComplete="businessname"
                    className="block w-full rounded-md bg-transparent border border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:border-[1.5px] focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="businessemail"
                  className=" text-[15px] text-primary-black"
                >
                  Business email
                </label>
                <div className="mt-1">
                  <input
                    id="businessemail"
                    type="email"
                    autoComplete="businessemail"
                    className="block w-full rounded-md bg-transparent border border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:border-[1.5px] focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="industry"
                  className=" text-[15px] text-primary-black"
                >
                  Industry
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="industry"
                    placeholder="eg. Manufacturing"
                    className="block w-full rounded-md bg-transparent border border-gray-200 border-opacity-75 px-4 py-2.5 text-gray-700 focus:border-[1.5px] focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="numberofemployees"
                  className=" text-[15px] text-primary-black"
                >
                  Number of employees
                </label>
                <div className="mt-1 w-full"></div>
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <label
                  htmlFor="annualrevenue"
                  className=" text-[15px] text-primary-black"
                >
                  Annual revenue (approximate)
                </label>
                <div className="mt-1 w-full"></div>
              </div>
              <div className="sm:col-span-2 sm:flex sm:justify-end"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
