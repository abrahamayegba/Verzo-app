"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, X } from "lucide-react";
import Link from "next/link";
import {
  useCreateSubscriptionNewCardAMutation,
  useGetPlansQuery,
} from "@/src/generated/graphql";
import { useToast } from "@/app/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
  businessName: string;
}
type Frequency = {
  value: "monthly" | "annually";
  label: string;
  priceSuffix: string;
};

const frequencies: Frequency[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SubscriptionExpiredModal: React.FC<Props> = ({
  open,
  onClose,
  businessName,
}) => {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const Plans = useGetPlansQuery();
  const Planlist = Plans.data?.getPlans;
  const basicPlan = Planlist?.find((plan) => plan?.planName === "Basic");
  const standardPlan = Planlist?.find((plan) => plan?.planName === "Standard");
  const premiumPlan = Planlist?.find((plan) => plan?.planName === "Premium");

  const basicPlanId = basicPlan?.id;
  const standardPlanId = standardPlan?.id;
  const premiumPlanId = premiumPlan?.id;

  const tiers = [
    {
      name: "Basic",
      id: "tier-basic",
      planId: basicPlanId,
      price: { monthly: "₦5,500", annually: "₦55,000" },
      description: "Ideal for freelancers and small businesses",
      features: [
        "Create 100 Invoices",
        "Send 100 Invoices",
        "Access to Invoice Dashboard",
        "Create 100 Products/Services",
      ],
      mostPopular: true,
    },
    {
      name: "Standard",
      id: "tier-standard",
      planId: standardPlanId,
      price: { monthly: "₦12,500", annually: "₦125,000" },
      description: "Tailored for growing businesses and entrepreneurs",
      features: [
        "Create 500 Invoices",
        "Send 500 Invoices",
        "Unlimited access to Invoice Dashboard",
        "Create 500 Products/Services",
        "Assign 1 admin, manager or staff",
      ],
      mostPopular: false,
    },
    {
      name: "Premium",
      id: "tier-premium",
      planId: premiumPlanId,
      price: { monthly: "₦25,000", annually: "₦250,000" },
      description:
        "Tailored for larger enterprises and complex financial needs",
      features: [
        "Create unlimited Invoices",
        "Send unlimited Invoices",
        "Unlimited access to Invoice Dashboard",
        "Unlimited Products/Services",
        "Assign 5 admin's, manager's or staff",
      ],
      mostPopular: false,
    },
  ];
  const { toast } = useToast();
  const router = useRouter();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [createSubscriptionNewCardAMutation, { loading }] =
    useCreateSubscriptionNewCardAMutation();

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error.message,
      duration: 3000,
    });
  };
  const handleCreateSubscription = async (planId: string) => {
    try {
      const { data } = await createSubscriptionNewCardAMutation({
        variables: {
          businessId: businessId,
          currentPlanId: planId,
          tax: 0,
        },
      });
      const paymentLink = data?.createSubscriptionNewCardA?.paymentLink;
      if (paymentLink) {
        router.push(paymentLink);
      }
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform bg-white w-screen transition-all">
                <>
                  <div className="flex flex-col items-center justify-center p-5 pb-14 gap-y-6">
                    <div className="relative w-[60%] border-b border-b-gray-400 border-opacity-50 pt-2 pb-5">
                      <div className="flex justify-center">
                        <p className="text-xl text-gray-800 capitalize">
                          {businessName}
                        </p>
                      </div>
                    </div>
                    <div className="absolute right-8 top-12 transform -translate-y-1/2">
                      <X
                        onClick={onClose}
                        className=" w-7 h-7 mt-[-5px] text-slate-800 cursor-pointer"
                      />
                    </div>
                    <p className="text-4xl font-medium text-slate-800 tracking-tight">
                      Your Subscription Plan Has Ended — It’s Time to Upgrade
                    </p>
                    <p className="text-slate-800 text-lg">
                      Select a plan below to jump back into Verzo today. <br />
                      Need a hand? Send a mail to our support team
                      <Link
                        href="mailto:info@verzo.app"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-primary-blue ml-1 focus:outline-none">
                          here.
                        </span>
                      </Link>
                    </p>
                    <div className=" mt-3 flex justify-center">
                      <fieldset aria-label="Payment frequency">
                        <div className="grid grid-cols-2 gap-x-1 rounded-full pt-3 pb-2.5 px-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                          {frequencies.map((option) => (
                            <label
                              key={option.value}
                              className="cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="frequency"
                                value={option.value}
                                checked={option.value === frequency.value}
                                onChange={() => setFrequency(option)}
                                className="hidden"
                              />
                              <span
                                className={classNames(
                                  option.value === frequency.value
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700",
                                  "cursor-pointer rounded-full px-2.5 py-2 text-[15px] font-normal"
                                )}
                              >
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                    <div className="isolate mx-auto mt-3 grid max-w-md grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                      {tiers.map((tier) => (
                        <div
                          key={tier.id}
                          className={classNames(
                            tier.mostPopular
                              ? "ring-2 ring-primary-blue"
                              : "ring-1 ring-gray-200",
                            "rounded-3xl p-6"
                          )}
                        >
                          <div className="flex items-center justify-between gap-x-4">
                            <h3
                              id={tier.id}
                              className={classNames(
                                tier.mostPopular
                                  ? "text-primary-blue"
                                  : "text-gray-900",
                                "text-lg font-semibold leading-8"
                              )}
                            >
                              {tier.name}
                            </h3>
                            {tier.mostPopular ? (
                              <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                                Most popular
                              </p>
                            ) : null}
                          </div>
                          <p className="mt-4 text-start text-sm leading-6 text-gray-600">
                            {tier.description}
                          </p>
                          <p className="mt-6 flex items-baseline gap-x-1">
                            <span className="text-4xl font-bold tracking-tight text-gray-900">
                              {tier.price[frequency.value]}
                            </span>
                            <span className="text-sm font-semibold leading-6 text-gray-600">
                              {frequency.priceSuffix}
                            </span>
                          </p>
                          <button
                            className={classNames(
                              tier.mostPopular
                                ? "bg-primary-blue text-white shadow-sm hover:bg-blue-500"
                                : "text-primary-blue ring-1 ring-inset ring-blue-200 hover:ring-blue-300",
                              "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            )}
                            onClick={() =>
                              handleCreateSubscription(tier.planId!)
                            }
                          >
                            Buy plan
                          </button>
                          <ul
                            role="list"
                            className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                          >
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex gap-x-3">
                                <CheckIcon
                                  className="h-6 w-5 flex-none text-blue-600"
                                  aria-hidden="true"
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubscriptionExpiredModal;
