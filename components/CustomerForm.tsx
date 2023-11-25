"use client";
import { CalendarIcon, ChevronDown, Plus } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

interface CustomerFormProps {
  openCustomerSheet: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ openCustomerSheet }) => {
  const [date, setDate] = React.useState<Date>();
  const [dueDate, setDueDate] = React.useState<Date>();
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const [openDueDate, setOpenDueDate] = React.useState(false);

  return (
    <div className=" flex w-full justify-between flex-col gap-y-7">
      <div className=" flex flex-row w-full justify-between">
        <p className=" text-primary-black text-lg">Customer details</p>
        <button
          onClick={openCustomerSheet}
          className=" text-primary-blue flex items-center gap-x-2"
        >
          Add customer <Plus className=" w-5 h-5" />
        </button>
      </div>
      <form className=" flex flex-col gap-y-[50px]">
        <div className=" flex flex-row gap-x-6">
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="customer">
              Customer
            </label>
            <Select>
              <SelectTrigger className=" w-full rounded-lg border border-gray-200">
                <SelectValue
                  className=" text-primary-greytext"
                  placeholder="Select a customer"
                />
              </SelectTrigger>
              <SelectContent className=" bg-white w-full">
                <SelectGroup>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="apple"
                  >
                    Customer A
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="banana"
                  >
                    Customer B
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="blueberry"
                  >
                    Customer C
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="grapes"
                  >
                    Customer D
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="pineapple"
                  >
                    Customer E
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="customer">
              Email address
            </label>
            <input
              className="border border-gray-200 rounded-lg h-10 text-sm focus:outline-none px-3 py-2"
              type="text"
              placeholder="email@gmail.com"
            />
          </div>
        </div>
        <div className=" flex flex-row gap-x-6">
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="issuedate">
              Issue date
            </label>
            <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
              <PopoverTrigger asChild>
                <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <div className=" justify-between flex items-center w-full">
                      <span className=" text-sm">Pick a date</span>
                      <ChevronDown className=" w-4 h-4 text-primary-greytext" />
                    </div>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setOpenIssueDate(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="duedate">
              Due date
            </label>
            <Popover open={openDueDate} onOpenChange={setOpenDueDate}>
              <PopoverTrigger asChild>
                <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                  {dueDate ? (
                    format(dueDate, "PPP")
                  ) : (
                    <div className=" justify-between flex items-center w-full">
                      <span className=" text-sm">Pick a date</span>
                      <ChevronDown className=" w-4 h-4 text-primary-greytext" />
                    </div>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(dueDate) => {
                    setDueDate(dueDate);
                    setOpenDueDate(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
