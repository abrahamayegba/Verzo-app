import React, { ReactElement, SVGProps } from "react";

interface Tableprops {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  emptytext: string;
}

const TableEmptyState: React.FC<Tableprops> = ({ icon, emptytext }) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-y-3">
      <span className=" rounded-full p-[20px] bg-[#F9FCFF]">{icon}</span>
      <p>{emptytext}</p>
    </div>
  );
};

export default TableEmptyState;
