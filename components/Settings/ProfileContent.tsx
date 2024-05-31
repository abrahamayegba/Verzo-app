import React, { useEffect, useState } from "react";
import ProfileSheet from "../sheets/settings/profile/ProfileSheet";
import SecuritySheet from "../sheets/settings/profile/SecuritySheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import localStorage from "local-storage-fallback";
import {
  useGetNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} from "@/src/generated/graphql";
import CustomCheckbox from "../Checkbox";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

const ProfileContent = () => {
  const [openProfileSheet, setOpenProfileSheet] = useState(false);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const router = useRouter();
  const businessId = storedBusinessId[0] || "";
  const [openSecuritySheet, setOpenSecuritySheet] = useState(false);
  const getNotifications = useGetNotificationPreferencesQuery({
    variables: {
      businessId: businessId,
    },
  });
  const [updateNotificationPreferencesMutation] =
    useUpdateNotificationPreferencesMutation();

  const [preferences, setPreferences] = useState({
    trackUsers: false,
    trackTasks: false,
    trackInvoices: false,
    trackProducts: false,
    trackServices: false,
    trackExpenses: false,
    trackPurchases: false,
    trackCustomers: false,
    trackMerchants: false,
  });

  useEffect(() => {
    if (getNotifications?.data?.getNotificationPreferences) {
      setPreferences({
        trackUsers:
          getNotifications?.data.getNotificationPreferences.trackUsers ?? false,
        trackTasks:
          getNotifications?.data.getNotificationPreferences.trackTasks ?? false,
        trackInvoices:
          getNotifications?.data.getNotificationPreferences.trackInvoices ??
          false,
        trackProducts:
          getNotifications?.data.getNotificationPreferences.trackProducts ??
          false,
        trackServices:
          getNotifications?.data.getNotificationPreferences.trackServices ??
          false,
        trackExpenses:
          getNotifications?.data.getNotificationPreferences.trackExpenses ??
          false,
        trackPurchases:
          getNotifications?.data.getNotificationPreferences.trackPurchases ??
          false,
        trackCustomers:
          getNotifications?.data.getNotificationPreferences.trackCustomers ??
          false,
        trackMerchants:
          getNotifications?.data.getNotificationPreferences.trackMerchants ??
          false,
      });
    }
  }, [getNotifications?.data]);
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, []);

  const handleCloseProfileSheet = () => {
    setOpenProfileSheet(false);
  };

  const handleCloseSecuritySheet = () => {
    setOpenSecuritySheet(false);
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;
    const updatedPreferences = {
      ...preferences,
      [id]: checked,
    };
    setPreferences(updatedPreferences);
    try {
      await updateNotificationPreferencesMutation({
        variables: {
          businessId,
          notificationPreferences: updatedPreferences,
        },
      });
      toast("Preference updated", {
        cancel: {
          label: "✕",
          onClick: () => {},
        },
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">
          Manage data and security
        </p>
        <div className=" bg-white min-h-[366px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Personal information</p>
              <p className=" text-sm text-primary-greytext">
                {" "}
                Name and email address
              </p>
            </div>
            <button
              onClick={() => setOpenProfileSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Security</p>
              <p className=" text-sm text-primary-greytext">Password</p>
            </div>
            <button
              onClick={() => setOpenSecuritySheet(true)}
              className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-y border-y-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Authentication</p>
              <p className=" text-sm text-primary-greytext">2FA</p>
            </div>
            <button
              disabled
              className=" px-6 py-3 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Set up
            </button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" w-full flex flex-row font-normal hover:no-underline p-0">
                <div className=" flex flex-row justify-between w-full p-6 items-center ">
                  <div className=" flex flex-col gap-y-[6px] text-start">
                    <p className=" text-primary-black">Notifications</p>
                    <p className=" text-sm text-primary-greytext">
                      Choose how your notifications will reach you
                    </p>
                  </div>
                  <ChevronDown className=" text-gray-500 w-5 h-5 mr-7" />
                </div>
              </AccordionTrigger>
              <AccordionContent className=" px-6 max-w-[1100px] pb-0 mt-[-10px]">
                <div className=" flex flex-col rounded-md">
                  <p className=" text-base text-primary-black py-[10px] px-4 border-b border-b-gray-100">
                    Web
                  </p>
                  <ul className="px-4">
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackUsers"
                        label="User notifications"
                        checked={preferences.trackUsers}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackTasks"
                        label="Task notifications"
                        checked={preferences.trackTasks}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackInvoices"
                        label="Invoice notifications"
                        checked={preferences.trackInvoices}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackProducts"
                        label="Product notifications"
                        checked={preferences.trackProducts}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackServices"
                        label="Service notifications"
                        checked={preferences.trackServices}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackExpenses"
                        label="Expense notifications"
                        checked={preferences.trackExpenses}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackPurchases"
                        label="Purchase notifications"
                        checked={preferences.trackPurchases}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className="border-b border-b-gray-100">
                      <CustomCheckbox
                        id="trackCustomers"
                        label="Customer notifications"
                        checked={preferences.trackCustomers}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                    <li className=" pb-1">
                      <CustomCheckbox
                        id="trackMerchants"
                        label="Merchant notifications"
                        checked={preferences.trackMerchants}
                        onChange={handleCheckboxChange}
                      />
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <ProfileSheet open={openProfileSheet} onClose={handleCloseProfileSheet} />
      <SecuritySheet
        open={openSecuritySheet}
        onClose={handleCloseSecuritySheet}
      />
    </>
  );
};

export default ProfileContent;
