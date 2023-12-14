import { Menu, Trash2 } from "lucide-react";
import React from "react";

interface PurchaseItemProps {
  item: {
    itemDescription: string;
    quantity: number;
    unitPrice: number;
    index: number;
  };
  index: number;
  onDelete: (index: number) => void;
  onQuantityChange: (index: number, quantity: number) => void;
  onPriceChange: (index: number, price: number) => void;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({
  item,
  index,
  onDelete,
  onQuantityChange,
  onPriceChange,
}) => {
  return (
    <div className="grid grid-cols-5 gap-x-5 text-primary-black border-t text-lg border-t-[#f4f4f4] py-[18px]">
      <p className="col-span-3 flex flex-row pr-2 flex-wrap items-center gap-x-3">
        <Menu className=" w-4 h-4 text-primary-greytext mt-[2px]" />
        {item?.itemDescription}
      </p>
      <input
        type="number"
        required
        className="col-span-1 focus:outline-none bg-transparent border border-gray-200 rounded-[8px] px-3 py-1"
        value={item.quantity}
        onChange={(e) => {
          const inputValue = e.target.value.trim();
          const parsedValue = inputValue === "" ? 1 : parseInt(inputValue, 10);
          if (!isNaN(parsedValue)) {
            onQuantityChange(index, Math.max(1, parsedValue));
          }
        }}
      />
      <div className=" flex flex-row">
        <input
          type="tel"
          required
          className="col-span-1 max-w-[150px] focus:outline-none text-end bg-transparent border border-gray-200 rounded-[8px] px-3 py-1"
          value={`₦${item?.unitPrice}`}
          onChange={(e) => {
            const inputValue = e.target.value.trim();
            const parsedValue =
              inputValue === "" ? 0 : parseFloat(inputValue.replace("₦", ""));
            if (!isNaN(parsedValue)) {
              onPriceChange(index, parsedValue);
            } else {
              // Handle the case where parsing fails (e.g., non-numeric input)
              onPriceChange(index, 0);
            }
          }}
        />
        <div className="absolute mt-2 ml-[160px]">
          <Trash2
            onClick={() => onDelete(index)}
            className="w-5 h-5 text-primary-red cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;
