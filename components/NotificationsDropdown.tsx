"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import NotificationsIcon from "./ui/icons/NotificationsIcon";
import { ChevronDown, Settings } from "lucide-react";
import NotificationsIcon2 from "./ui/icons/NotificationsIcon2";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useSubscription,
} from "@apollo/client";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";
import { formatDistanceToNow } from "date-fns";
import localStorage from "local-storage-fallback";
import { Menu, Transition } from "@headlessui/react";
import EmptyNotificationIcon from "./ui/icons/EmptyNotificationIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Message {
  title: string;
  message: string;
  key: string;
  type: string;
  dateTime: string;
}

const NotificationsDropdown = () => {
  const getBusinessByUserId = useGetBusinessesByUserIdQuery();
  const userId = getBusinessByUserId?.data?.getBusinessesByUserId?.user?.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [alerts, setAlerts] = useState(0);
  const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription NewMessage($topic: String!) {
      newMessage(topic: $topic) {
        title
        message
        key
        type
        dateTime
      }
    }
  `;
  const { data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { topic: userId },
  });
  const router = useRouter();

  const client = new ApolloClient({
    uri: "https://queue.api2.verzo.app/graphql", // replace with your GraphQL endpoint
    cache: new InMemoryCache(),
  });

  const GET_MESSAGES = gql`
    query GetMessage($topic: String!) {
      getMessages(topic: $topic) {
        title
        message
        key
        type
        dateTime
      }
    }
  `;
  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchMessages = async () => {
      try {
        const { data } = await client.query({
          query: GET_MESSAGES,
          variables: { topic: userId },
        });
        setMessages(data.getMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [client, userId]);

  useEffect(() => {
    const savedAlerts = localStorage.getItem("alerts");
    if (savedAlerts) {
      setAlerts(parseInt(savedAlerts, 10)); // Parse integer from string
    }
  }, []);

  useEffect(() => {
    if (data) {
      setAlerts((prevAlerts) => prevAlerts + 1);
      localStorage.setItem("alerts", (alerts + 1).toString());
    }
  }, [data]);

  const handleClick = () => {
    setAlerts(0);
    localStorage.setItem("alerts", "0"); // Store as string
  };

  const allTabNumber = messages?.length ?? 0;

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button onClick={handleClick}>
            <div className="relative rounded-full border p-[10px] text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-verzoblue focus:ring-offset-2">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <div>
                <NotificationsIcon2 />
                {alerts > 0 && (
                  <span className="absolute top-0 right-0 mr-[5px] mt-[2px] inline-flex items-center justify-center w-[14px] h-[14px] text-[11px] font-medium leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    {alerts}
                  </span>
                )}
              </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-[400px] origin-top-right bg-white shadow1 rounded-md border border-gray-200 focus:outline-none text-primary-greytext p-0 shadow1 ">
            <Tabs defaultValue="all" className=" w-full p-0">
              <TabsList className=" border-b border-b-gray-200 flex flex-row items-end gap-x-6 px-4 h-[40px] mt-1">
                <TabsTrigger
                  className=" p-[6px] text-[15px] data-[state=active]:border-b-2 data-[state=active]:text-primary-blue border-primary-blue"
                  value="all"
                >
                  All ({allTabNumber})
                </TabsTrigger>
                <Link href="/dashboard/settings" className=" pb-2 ml-auto">
                  <Settings className=" w-[18px] h-[18px]" />
                </Link>
              </TabsList>
              <TabsContent
                className=" max-h-[400px] overflow-y-scroll"
                value="all"
              >
                <Accordion type="single" collapsible>
                  {messages?.length > 0 ? (
                    messages
                      ?.slice()
                      ?.reverse()
                      ?.map((message, index) => (
                        <AccordionItem
                          key={index}
                          className="border-b border-b-gray-200"
                          value={message.message}
                        >
                          <AccordionTrigger className="flex flex-row justify-between hover:no-underline items-start p-4 data-[state=open]:pb-2 [&[data-state=open]>svg]:rotate-180">
                            <div className="flex items-start gap-x-3">
                              <span className="bg-[#F9FCFF] rounded-full mt-1">
                                <NotificationsIcon />
                              </span>
                              <div className="text-sm font-normal text-start">
                                <div className="flex flex-col gap-y-[2px]">
                                  <p className="text-primary-black">
                                    {message.title}
                                  </p>
                                  <p>
                                    {formatDistanceToNow(
                                      new Date(message.dateTime),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <ChevronDown className="w-[18px] h-[18px] transition-transform duration-200" />
                          </AccordionTrigger>
                          <AccordionContent className="text-sm font-normal text-gray-800 pl-[46px] pr-3">
                            {message.message}
                          </AccordionContent>
                        </AccordionItem>
                      ))
                  ) : (
                    <div className=" flex flex-col gap-y-3 items-center justify-center h-[300px]">
                      <span className=" w-[48px] h-[48px] rounded-full bg-gray-50 flex items-center justify-center">
                        <EmptyNotificationIcon />
                      </span>
                      <p>No new notifications</p>
                    </div>
                  )}
                </Accordion>
              </TabsContent>
            </Tabs>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
