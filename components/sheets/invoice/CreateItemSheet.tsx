"use client";
import React, { useState } from "react";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlusIcon from "@/components/ui/icons/PlusIcon";

interface CreateItemProps {
  open: boolean;
  onClose: () => void;
  onItemSelected: (selectedItem: {
    name: string;
    price: number;
    quantity: number;
  }) => void;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

const Items = [
  {
    name: "Item A",
    quantity: 1,
    price: 0,
  },
  {
    name: "Item B",
    quantity: 1,
    price: 0,
  },
  {
    name: "Item C",
    quantity: 1,
    price: 0,
  },
  {
    name: "Item D",
    quantity: 1,
    price: 0,
  },
  {
    name: "Item E",
    quantity: 1,
    price: 0,
  },
];

const CreateItemSheet: React.FC<CreateItemProps> = ({
  open,
  onClose,
  onItemSelected,
}) => {
  const [selectedItem, setSelectedItem] = useState<InvoiceItem | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [openPopover, setOpenPopover] = React.useState(false);
  const [itemName, setItemName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleCategoryChangeAndNext = (value: any) => {
    handleCategoryChange(value);
    handleNext();
  };

  const handleItemSelect = () => {
    if (selectedItem) {
      onItemSelected({
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: 1,
      });
      onClose();
      setSelectedItem(null);
      setItemName("");
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[60px]">
          <button
            onClick={currentStep === 1 ? onClose : () => setCurrentStep(1)}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PlusIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Add item</p>
          <p className="font-light text-primary-greytext mt-2">
            Select item to add
          </p>
          <div className=" w-full mt-[30px] flex flex-col gap-y-6">
            {currentStep === 1 ? (
              <>
                <div className=" flex flex-col gap-y-6">
                  <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger asChild>
                      <button
                        aria-expanded={openPopover}
                        className=" w-full justify-between bg-gray-50 text-primary-black flex items-center border border-gray-200 py-2 px-3 rounded-[8px]"
                      >
                        {itemName ? itemName : "Select item..."}
                        <ChevronDown className=" w-5 h-5 text-primary-black text-opacity-70 mt-[2px]" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="  w-[327px] p-0 bg-white z-[200]">
                      <Command>
                        <CommandInput placeholder="Search items..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {Items.map((Item) => (
                            <CommandItem
                              key={Item.name}
                              value={Item.name} // Pass the whole item as the value
                              className=" hover:cursor-pointer hover:bg-gray-100 py-2 text-base text-gray-800"
                              onSelect={(currentItem) => {
                                setItemName(
                                  currentItem === itemName ? "" : currentItem
                                );
                                setSelectedItem(Item);
                                setOpenPopover(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  itemName === Item.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {Item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <button
                    onClick={handleItemSelect}
                    className=" bg-primary-blue text-white rounded-[10px] py-[9px] "
                  >
                    Add item
                  </button>
                  <div className=" flex flex-col gap-y-[6px]">
                    <label className=" text-primary-black" htmlFor="newitem">
                      Create new item
                    </label>
                    <Select onValueChange={handleCategoryChangeAndNext}>
                      <SelectTrigger className=" w-full rounded-lg border border-gray-200">
                        <SelectValue
                          className=" text-primary-greytext"
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                      <SelectContent className=" bg-white w-full z-[200] shadow-sm text-gray-800">
                        <SelectGroup>
                          <SelectItem
                            className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                            value="product"
                          >
                            Product
                          </SelectItem>
                          <SelectItem
                            className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                            value="service"
                          >
                            Service
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <>
                {selectedCategory === "product" && (
                  <form className=" gap-y-4 flex flex-col mb-3">
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="productname">Product name</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Product name"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="price">Price</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Price"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="basicunit">Basic unit</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="number"
                        placeholder="1"
                        min={1}
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="productunit">Product unit</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Product unit"
                      />
                    </div>
                    <button
                      onClick={onClose}
                      className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
                    >
                      Create product
                    </button>
                  </form>
                )}
                {selectedCategory === "service" && (
                  <form className=" gap-y-4 flex flex-col mb-3">
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="servicename">Service name</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Service name"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="price">Price</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Price"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="serviceunit">Service unit</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Service unit"
                      />
                    </div>
                    <button
                      onClick={onClose}
                      className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
                    >
                      Create service
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateItemSheet;
