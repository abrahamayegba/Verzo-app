import React from "react";

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-x-3 cursor-pointer py-3.5"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`relative w-[22px] h-[22px] flex items-center justify-center rounded-md border-2 transition-all duration-200 ${
          checked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="text-[15px] text-primary-greytext">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
