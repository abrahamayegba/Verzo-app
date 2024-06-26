import Verzologoblue2 from "@/components/ui/icons/Verzologoblue2";
import Link from "next/link";
import React from "react";

const RedirectSignin = () => {
  return (
    <div>
      <div className="mx-auto flex h-screen min-h-full w-full max-w-xl flex-col justify-center py-12 font-Inter sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="space-y-3 sm:w-full flex items-center flex-col">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="40"
                viewBox="0 0 70 24"
                fill="none"
              >
                <g clipPath="url(#clip0_7135_8654)">
                  <path
                    d="M62.0465 23.9701C64.3428 23.9701 66.1272 23.307 67.4007 21.968C68.6742 20.6295 69.2988 18.7746 69.2988 16.3453C69.2988 13.9155 68.669 12.017 67.4007 10.6781C66.133 9.33911 64.3428 8.6897 62.0465 8.6897C59.7495 8.6897 57.9582 9.35249 56.6916 10.6781C55.4257 12.0036 54.7936 13.9022 54.7936 16.3453C54.7936 18.7881 55.4239 20.6577 56.6916 21.9832C57.9599 23.3088 59.7344 23.9701 62.0465 23.9701ZM62.0465 21.042C59.311 21.042 57.9938 19.5386 57.9938 16.3453C57.9938 13.121 59.311 11.6349 62.0465 11.6349C64.7813 11.6349 66.0834 13.121 66.0834 16.3453C66.0834 19.5251 64.7527 21.042 62.0465 21.042Z"
                    fill="#027DFF"
                  />
                  <path
                    d="M42.2252 19.3439C40.3441 21.2844 40.8759 24.06 43.2562 23.9678H52.5185C53.3687 23.9678 53.7938 23.5406 53.7938 22.6863V22.1975C53.7938 21.3443 53.3687 20.9171 52.5185 20.9159H45.7444C45.3344 20.9159 45.2283 20.7246 45.4709 20.4881L52.6439 13.3006C53.553 12.3074 53.9174 11.1174 53.7501 10.2331C53.5833 9.34873 52.7844 8.68976 51.6304 8.68976H42.364C41.5132 8.6745 41.0905 9.10233 41.0905 9.95806V10.4298C41.0905 11.2855 41.515 11.7133 42.364 11.7133H49.144C49.5236 11.7133 49.6431 11.9043 49.4169 12.1546L42.2252 19.3439Z"
                    fill="#027DFF"
                  />
                  <path
                    d="M38.562 8.69165C32.3893 8.58086 31.4687 9.12905 31.2922 12.9224V22.7015C31.2922 22.8682 31.3248 23.0337 31.3883 23.1874C31.4518 23.3417 31.5448 23.4814 31.662 23.5993C31.7792 23.7167 31.9184 23.8106 32.0715 23.874C32.2246 23.9373 32.3887 23.9702 32.5544 23.9702H33.3343C33.4999 23.9702 33.6643 23.9373 33.8171 23.874C33.9705 23.8106 34.1098 23.7167 34.227 23.5993C34.3442 23.4814 34.437 23.3417 34.5005 23.1874C34.5641 23.0337 34.5967 22.8682 34.5967 22.7015V13.3006C34.5915 12.9987 34.6066 12.6969 34.6422 12.3971C34.6673 12.2131 34.7553 12.0438 34.8918 11.9189C35.0282 11.7938 35.2038 11.721 35.388 11.7134H38.5392C39.4559 11.7134 39.9131 11.276 39.9131 10.4298V9.94463C39.9131 9.11379 39.4483 8.67833 38.562 8.69165Z"
                    fill="#027DFF"
                  />
                  <path
                    d="M9.36748 19.1719C9.12829 19.9071 8.90623 20.3713 8.69748 20.5966C8.59088 20.7058 8.46294 20.7914 8.32183 20.8484C8.18071 20.9053 8.02945 20.9323 7.87749 20.927C7.73229 20.9317 7.58785 20.9047 7.45414 20.8478C7.32043 20.7908 7.20066 20.7052 7.1031 20.5966C6.87912 20.3713 6.65515 19.9071 6.41787 19.1719L3.43981 9.72497C3.23291 9.03542 2.7698 8.69162 2.03903 8.69162H1.19058C0.281437 8.69162 -0.138062 9.2303 0.146677 10.1146L3.41135 19.9224C3.9466 21.4962 4.52931 22.5606 5.13856 23.1163C5.74787 23.672 6.6741 23.9701 7.88128 23.9701C9.08846 23.9701 10.0261 23.6855 10.6525 23.1163C11.2788 22.5471 11.8445 21.4962 12.3607 19.9224L15.6444 10.1146C15.9272 9.2303 15.5096 8.69162 14.6004 8.69162H13.752C13.0213 8.67636 12.56 9.02017 12.336 9.72497L9.36748 19.1719Z"
                    fill="#027DFF"
                  />
                  <path
                    d="M29.0563 16.5953C29.582 16.0947 29.8459 15.3002 29.8459 14.225C29.8459 12.4735 29.2898 11.104 28.1623 10.1337C27.0348 9.16336 25.4575 8.6897 23.4228 8.6897C18.6776 8.6897 16.138 11.4134 16.138 16.3453C16.138 18.828 16.7966 20.7169 18.1139 22.012C19.2148 23.1199 20.6668 23.7677 22.4434 23.9414L22.768 23.9678C22.99 23.983 23.214 23.9907 23.4437 23.9907H27.7789C27.8203 23.9795 27.8609 23.966 27.9004 23.949C28.5609 23.861 28.8931 23.4391 28.8931 22.6862V22.1974C28.8931 21.3442 28.4685 20.917 27.6194 20.9158C27.6194 20.9158 23.7265 21.0496 22.4396 20.9158C20.887 20.7533 19.9398 19.7123 19.5394 18.2588L26.1655 17.5676C27.5625 17.4203 28.5134 17.0958 29.0563 16.5953ZM19.342 15.4035C19.5754 12.7389 20.9211 11.5834 23.4228 11.5834C25.6037 11.5681 26.7007 12.3627 26.7007 13.9384C26.7007 14.5114 26.5109 14.6738 25.4575 14.7922L19.342 15.4035Z"
                    fill="#027DFF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M61.9289 0.0344717L61.6163 0.0348238L61.2589 0.0382272L59.8553 0.0364082C59.7334 0.0358214 59.6127 0.0484962 59.4938 0.0742566C59.3847 0.0977285 59.2769 0.125191 59.1696 0.156584L59.1649 0.158345C59.1019 0.176653 59.0401 0.196134 58.9795 0.217728C58.1975 0.480027 57.4995 0.946413 56.9555 1.56918C56.8931 1.64329 56.8312 1.71911 56.77 1.79656C56.6417 1.96386 56.5245 2.13961 56.4196 2.32251C55.8429 3.32523 55.6551 4.50698 55.8913 5.64079C55.9076 5.71983 55.9262 5.79876 55.9466 5.87721C55.9519 5.89734 55.9577 5.91746 55.9636 5.93648C55.9676 5.94927 55.9735 5.97168 55.9787 5.99357C55.9816 6.00425 55.9846 6.01481 55.9869 6.02403L55.9939 6.04973C56.012 6.10823 56.0306 6.16644 56.051 6.22483C56.0569 6.24214 56.0639 6.2598 56.0703 6.27735C56.0779 6.2983 56.086 6.31913 56.0924 6.33925C56.1198 6.41125 56.1478 6.48243 56.1787 6.55291C56.1822 6.56071 56.1869 6.56775 56.1927 6.5735C56.2575 6.63782 56.3303 6.69309 56.4096 6.73787C56.4452 6.7587 56.4825 6.77724 56.5204 6.79338C56.5543 6.80799 56.591 6.81521 56.6277 6.8145L57.3077 6.81568L61.891 6.81521L62.5237 6.81298L62.8532 6.8128C63.2153 6.85611 63.5815 6.85616 63.9436 6.81292C64.6171 6.73352 65.2655 6.50772 65.844 6.15119C66.4225 5.79459 66.9169 5.31576 67.2936 4.7478C67.338 4.68132 67.3817 4.61337 67.4231 4.54407L67.475 4.45305C67.5321 4.35377 67.5829 4.25231 67.6313 4.15021L67.6476 4.11529C67.9403 3.48355 68.0884 2.79383 68.0814 2.09683L68.0832 2.09407L68.0826 2.07911C68.0803 1.92971 68.0727 1.77744 68.0552 1.63109C68.0599 1.62909 68.0593 1.61313 68.0587 1.59694C68.0581 1.58045 68.0575 1.56384 68.0628 1.56149C68.0161 1.06037 67.8849 0.570922 67.675 0.114041L67.6132 0.0067749L61.9289 0.0344717ZM58.6529 2.86242C58.2097 3.3115 57.9468 3.90927 57.9147 4.54131C57.9106 4.61079 57.91 4.67997 57.9147 4.75138L58.0406 4.75068L59.3853 4.75126L59.5084 4.74892L59.5527 4.74927L63.0275 4.75132C63.4089 4.78524 63.7931 4.73519 64.1541 4.60468C64.6842 4.44155 65.1472 4.10931 65.4731 3.65806C65.7991 3.20687 65.9705 2.66115 65.9612 2.1034L65.8976 2.10358H60.846L60.6268 2.10182L60.5376 2.10188C60.5201 2.10217 60.5026 2.10229 60.4857 2.1024C60.4612 2.10252 60.4367 2.1027 60.4128 2.10322L60.4029 2.10352C59.8081 2.11889 59.2372 2.34188 58.7876 2.73421L58.7655 2.75416C58.727 2.78855 58.6891 2.82446 58.6529 2.86242ZM68.0185 1.66735L68.0202 1.66401L68.0173 1.66154C68.0097 1.66571 68.0021 1.66917 67.9945 1.67193L67.9957 1.67715C67.9998 1.67615 68.0033 1.67463 68.0074 1.67269L68.0185 1.66735Z"
                    fill="#027DFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7135_8654">
                    <rect width="69.3333" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <h2 className=" text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className=" px-[25px] sm:w-full">
            <div className="h-auto bg-white px-4 pt-[10px] sm:rounded-lg sm:px-10">
              <form className="flex flex-col gap-y-6">
                <div className=" h-[70px]">
                  <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-[#1e293b]"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      required
                      className={`block h-[46px] w-full focus:border-2 focus:border-primary-blue appearance-none rounded-md border border-gray-100 bg-gray-50 px-3 py-2 placeholder-gray-400 focus:outline-none `}
                    />
                  </div>
                </div>
                <div className=" h-[70px]">
                  <div className=" flex flex-row justify-between">
                    <label
                      htmlFor="password"
                      className="block font-medium text-[#1e293b]"
                    >
                      Password
                    </label>
                    <button className="block text-[15px] font-medium text-gray-700 underline pr-1">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-1 flex flex-col">
                    <input
                      required
                      className={`block h-[46px] w-full appearance-none focus:border-2 focus:border-primary-blue rounded-md border border-gray-100 bg-gray-50 px-3 py-2 placeholder-gray-400 focus:outline-none  sm:text-sm`}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className=" flex h-[46px] mt-4 w-full items-center justify-center rounded-md border border-transparent bg-primary-blue px-4 py-2 text-[16px] font-semibold text-white shadow-sm hover:bg-primary-verzobluehover focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-2 flex items-center justify-center p-4 pt-2">
              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium underline text-primary-verzoblue transition duration-100 hover:text-primary-verzobluehover active:text-primary-verzoblue"
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectSignin;
