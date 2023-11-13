import React from "react";

const ExpenseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity: 0.7 }} // Adjust the value as needed (0.0 to 1.0)
    >
      <path
        d="M13.6542 18.8999H4.05456C2.7291 18.8999 1.65459 17.8254 1.65455 16.5L1.6543 7.50016C1.65426 6.17465 2.72879 5.1001 4.0543 5.1001H18.4537C19.7793 5.1001 20.8538 6.17399 20.8538 7.49951L20.8538 11.7001M2.25383 9.29995H20.2538M17.2534 16.0457L22.3448 16.0454"
        stroke="#757575"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExpenseIcon;
