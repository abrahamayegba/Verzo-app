"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import NotificationsIcon from "./ui/icons/NotificationsIcon";
import { ChevronDown } from "lucide-react";

const NotificationsDropdown = () => {
  const newTabNumber = "(5)";
  const allTabNumber = "(10)";
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger className=" focus:outline-none">
        <div className="relative rounded-full border p-[10px] text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-verzoblue focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <span>
            <svg
              width={16}
              height={16}
              fill="none"
              viewBox="0 0 24 24"
              role="none"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 3a2 2 0 1 0-4 0v.27a7.482 7.482 0 0 0-5.457 6.636L4.228 14H1v4a3 3 0 0 0 3 3h5.172a3 3 0 0 0 5.656 0H20a3 3 0 0 0 3-3v-4h-3.228l-.315-4.094A7.482 7.482 0 0 0 14 3.27V3Zm-2 2a5.48 5.48 0 0 0-5.463 5.059L6.08 16H3v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2h-3.08l-.457-5.941A5.48 5.48 0 0 0 12 5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white mt-1 p-6 text-primary-greytext shadow1 w-[400px] mr-5">
        <p className=" text-primary-black text-lg mb-4">Notifications</p>
        <Tabs defaultValue="new" className=" w-full mb-[20px]">
          <TabsList className=" border-b border-b-gray-100 flex flex-row gap-x-6 mb-[15px]">
            <TabsTrigger
              className=" p-1 data-[state=active]:border-b-2 data-[state=active]:text-primary-blue border-primary-blue"
              value="new"
            >
              New {newTabNumber}
            </TabsTrigger>
            <TabsTrigger
              className=" p-1 data-[state=active]:border-b-2 data-[state=active]:text-primary-blue border-primary-blue"
              value="all"
            >
              All {allTabNumber}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <Accordion
              className=" max-h-[200px] overflow-y-scroll"
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="all">
            <Accordion
              className=" max-h-[200px] overflow-y-scroll"
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className=" flex flex-row justify-between items-center">
                  <div className=" flex items-center gap-x-3">
                    <span className=" p-[9px] bg-[#F9FCFF] rounded-full">
                      <NotificationsIcon />
                    </span>
                    <div className=" text-sm font-normal">
                      <div className=" flex flex-row gap-x-3">
                        <p className=" text-primary-black">
                          {" "}
                          Notification title
                        </p>
                        <p>Friday, 2:30pm</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className=" w-[18px] h-[18px]" />
                </AccordionTrigger>
                <AccordionContent className=" text-sm font-normal text-primary-greytext">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
        <button
          onClick={() => setOpenDropdown(false)}
          className=" px-6 py-3 text-sm text-primary-black rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
        >
          Cancel
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
