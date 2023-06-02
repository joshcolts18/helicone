/* eslint-disable @next/next/no-img-element */
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { StarIcon } from "@heroicons/react/20/solid";
import AdvancedAnalytics from "./AdvancedAnalytics";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DEMO_EMAIL } from "../../../lib/constants";
import Details from "./detailsV2";
import BasePageV2 from "../../shared/layout/basePageV2";

import { createRef, SVGProps, useEffect, useRef, useState } from "react";
import OnboardingButton from "../../shared/auth/onboardingButton";
import {
  ArrowPathIcon,
  BanknotesIcon,
  ChevronRightIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BaseUrlInstructions } from "../welcome/welcomePage";
import { clsx } from "../../shared/clsx";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Logos from "./logos";
import {
  ChartPieIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import CodeSnippet from "./codeSnippet";
import LoginButton from "../../shared/auth/loginButton";
import { BsDiscord } from "react-icons/bs";

const timeline = [
  {
    name: "Founded company",
    description:
      "After years of working as software engineers, we quit our jobs looking to build within the generative AI space.",
    date: "Jan 2023",
    dateTime: "2023-01",
  },
  {
    name: "Backed by Y Combinator",
    description:
      "We were accepted into YCombinator's Winter 2023 batch and have been working closely with the YC partners.",
    date: "Jan 2023",
    dateTime: "2023-01",
  },
  {
    name: "Launched Helicone",
    description:
      "After building multiple LLM apps and struggling with the lack of good monitoring and observability tools, we decided to build Helicone.",
    date: "Feb 2022",
    dateTime: "2023-02",
  },
  {
    name: "5 million requests",
    description:
      "We reached 5 million requests in just over a months time, and we're just getting started.",
    date: "Mar 2023",
    dateTime: "2023-03",
  },
];

const testimonials = [
  {
    body: `Keeping costs under control was a huge issue 2-3 weeks ago but we are now profitable per user.
        We leveraged a mix of caching, model-swapping, fine-tuning, and product updates to get here
        @helicone_ai has been a godsend for LLM cost analytics, especially cost/user`,
    author: {
      name: "Daniel Habib",
      handle: "DannyHabibs",
      imageUrl: "/assets/daniel-habib.png",
    },
  },

  {
    body: "My favourite of the new AI apps? @helicone_ai - Observability for @OpenAI is pretty bad. Hard to track bills and specific usage with native tools. I see Helicone as the next @datadoghq",
    author: {
      name: "John Ndege",
      handle: "johnndege",
      imageUrl: "/assets/john-ndege.png",
    },
  },
  {
    body: `I'm now using Helicone and it's a major QoL improvement while deving on LLMs

        Add one line to your python/JS OpenAI project and get
        - input/output logging
        - user-level metrics
        - caching (soon)
        
        Also OSS 👏`,
    author: {
      name: "Jay Hack",
      handle: "mathemagic1an",
      imageUrl: "/assets/jay-hack.png",
    },
  },
  {
    body: `As an early-stage startup, speed is everything at Trelent. Helicone helps us quickly understand user behaviour when we're iterating with OpenAI, shorten our testing cycles.`,
    author: {
      name: "Calum Bird",
      handle: "calumbirdo",
      imageUrl: "/assets/calum-bird.png",
    },
  },
  // More testimonials...
];

const meta = {
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/helicone_ai",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/Helicone/helicone",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "https://discord.gg/2TkeWdXNPQ",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <BsDiscord {...props} />
      ),
    },
  ],
};

export default function HomePage() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [demoLoading, setDemoLoading] = useState(false);
  if (!demoLoading && user?.email === DEMO_EMAIL) {
    supabaseClient.auth.signOut();
  }
  // const { data: globalMetrics } = useQuery({
  //   queryKey: ["global_metrics"],
  //   queryFn: async () => {
  //     const data = fetch("/api/global_metrics").then((res) => res.json());
  //     return data;
  //   },
  // });

  const observabilityDiv = useRef(null);
  const rateDiv = useRef(null);
  const bucketDiv = useRef(null);

  const [currentPanel, setCurrentPanel] = useState("observability");

  useEffect(() => {
    const observability = observabilityDiv.current;
    const rate = rateDiv.current;
    const bucket = bucketDiv.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPanel(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    if (observability) {
      observer.observe(observability);
    }

    if (rate) {
      observer.observe(rate);
    }

    if (bucket) {
      observer.observe(bucket);
    }

    return () => {
      if (observability) {
        observer.unobserve(observability);
      }

      if (rate) {
        observer.unobserve(rate);
      }

      if (bucket) {
        observer.unobserve(bucket);
      }
    };
  }, []);

  return (
    <div className="flex-col w-full">
      <div className="bg-gray-50 sticky top-0 z-50 shadow-sm">
        <div
          className={
            "border-dashed flex flex-row px-8 py-4 mx-auto max-w-7xl justify-between"
          }
        >
          <div className="flex flex-row gap-12 items-center">
            <a href="/">
              <img
                className="rounded-xl"
                alt="Helicone-logo"
                src="/assets/landing/helicone.webp"
                width={150}
                height={150 / (1876 / 528)}
              />
            </a>

            <a href="/pricing" className="text-md font-semibold text-gray-900">
              Pricing
            </a>
            <a
              href="https://docs.helicone.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-gray-900"
            >
              Documentation
            </a>
            <a href="/roadmap" className="text-md font-semibold text-gray-900">
              Roadmap
            </a>
            <a
              href="https://github.com/Helicone/helicone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-gray-900"
            >
              Github
            </a>
          </div>
          <LoginButton />
        </div>
      </div>
      <div className="bg-gray-50">
        <div className="px-8 grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-300 border-dashed w-full items-center justify-center">
          <div className="col-start-1 col-span-2 space-y-12 h-[80vh] justify-center flex flex-col">
            <span className="rounded-full w-fit bg-orange-600/10 px-3 py-1 text-sm font-semibold leading-6 text-orange-600 ring-1 ring-inset ring-orange-600/10">
              Backed by Y Combinator
            </span>
            <div className="text-[5rem] leading-none font-bold text-gray-900 text-left space-y-2">
              <p>Tooling for</p>
              <span className="bg-gradient-to-r from-sky-500 via-pink-500 to-violet-500 bg-[length:100%_7px] pb-2 bg-no-repeat bg-bottom">
                Generative AI
              </span>
            </div>
            <p className="text-xl leading-9 text-gray-700">
              Hundreds of organizations leverage Helicone to make their
              Large-Language Model operations more efficient.
            </p>
            <div className="flex flex-row gap-8">
              <OnboardingButton title={"Get Started"} />
              {demoLoading ? (
                <button className="flex flex-row underline underline-offset-2 font-semibold text-gray-900 items-center">
                  <ArrowPathIcon className="w-4 h-4 mr-1.5 animate-spin" />
                  Logging In...
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDemoLoading(true);
                    supabaseClient.auth.signOut().then(() => {
                      supabaseClient.auth
                        .signInWithPassword({
                          email: DEMO_EMAIL,
                          password: "valyrdemo",
                        })
                        .then((res) => {
                          router.push("/demo").then(() => {
                            setDemoLoading(false);
                          });
                        });
                    });
                  }}
                  className="underline underline-offset-2 font-semibold text-gray-900"
                >
                  View Demo
                </button>
              )}
            </div>
          </div>
          <div className="col-span-2 h-[80vh] flex flex-col items-center justify-center align-middle relative">
            <div className="bg-sky-300 rounded-xl h-1/4 w-[45%] p-4 flex flex-col justify-between z-20 shadow-md">
              <p className="font-semibold text-sky-900 text-lg">
                Tokens per Request
              </p>
              <p className="font-semibold text-sky-900 text-5xl text-right">
                124
              </p>
            </div>
            <div className="bg-pink-300 rounded-xl h-1/4 w-2/5 p-4 flex flex-col justify-between absolute left-[15%] top-[27.5%] z-10 shadow-md">
              <p className="font-semibold text-pink-900 text-lg">User Growth</p>
              <p className="font-semibold text-pink-900 text-5xl text-right">
                1,534
              </p>
            </div>
            <div className="bg-violet-300 rounded-xl h-[30%] w-[45%] p-4 flex flex-col justify-between absolute right-[12.5%] top-[20%] shadow-md">
              <p className="font-semibold text-violet-900 text-lg">
                Cache Hits
              </p>
              <p className="font-semibold text-violet-900 text-5xl text-right">
                5,421
              </p>
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-8 pb-32">
            {/* <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />

            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-1 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            /> */}
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-8 pb-24 relative grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-300 border-dashed w-full items-center justify-center">
          <div className="flex flex-col col-span-2 space-y-8 py-32 pr-32">
            <p className="text-lg text-sky-500 tracking-wide font-semibold">
              Real Time Metrics
            </p>
            <p className="text-5xl text-gray-900 font-semibold">
              Insights into your Usage and Performance
            </p>
            <div
              ref={observabilityDiv}
              id="observability"
              className="sr-only"
            />
            <p className="text-xl text-gray-700 font-normal leading-8">
              Building a Large-Language Model monitoring tool is time consuming
              and hard to scale. So we did it for you:
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-700">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Monitor Spending:
                  </span>{" "}
                  Keep a close eye on your AI expenditure to control costs
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Analyze Traffic Peaks:
                  </span>{" "}
                  Identify high-traffic periods to allocate resources more
                  efficiently
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Track Latency Patterns:
                  </span>{" "}
                  Detect patterns in application speed and rectify slowdowns
                  proactively
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col col-span-2 h-full flex-1 sticky top-[5%] 2xl:top-[15%] py-28">
            <div className="h-full relative">
              <div
                className={clsx(
                  currentPanel === "observability"
                    ? "bg-sky-50 border-sky-500 text-sky-500"
                    : "bg-gray-50 border-gray-300 text-gray-500",
                  "h-[10%] w-[10%] z-10 shadow-sm border rounded-xl absolute top-0 flex items-center justify-center"
                )}
              >
                <ChartPieIcon className="h-8 w-8" />
              </div>
              <div
                className={clsx(
                  currentPanel === "rate"
                    ? "bg-pink-50 border-pink-500 text-pink-500"
                    : "bg-gray-50 border-gray-300 text-gray-500",
                  "h-[10%] w-[10%] z-10 shadow-sm border rounded-xl absolute top-1/3 right-0 flex items-center justify-center"
                )}
              >
                <UserGroupIcon className="h-8 w-8" />
              </div>
              <div
                className={clsx(
                  currentPanel === "bucket"
                    ? "bg-purple-50 border-purple-500 text-purple-500"
                    : "bg-gray-50 border-gray-300 text-gray-500",
                  "h-[10%] w-[10%] z-10 shadow-sm border rounded-xl absolute left-[10%] bottom-0 flex items-center justify-center"
                )}
              >
                <CodeBracketIcon className="h-8 w-8" />
              </div>
              <svg className="h-full w-full">
                {currentPanel === "observability" && (
                  <>
                    <line
                      x1="10%"
                      y1="5.5%"
                      x2="50%"
                      y2="5.5%"
                      stroke={"#0ea4e9"}
                      strokeWidth={1.25}
                    />
                    <line
                      x1="50%"
                      y1="5.5%"
                      x2="50%"
                      y2="20%"
                      stroke={"#0ea4e9"}
                      strokeWidth={1.25}
                    />
                  </>
                )}
                {currentPanel === "rate" && (
                  <>
                    <line
                      x1="95%"
                      y1="40%"
                      x2="95%"
                      y2="50%"
                      stroke="#ec489a"
                      strokeWidth={1.25}
                    />
                    <line
                      x1="95%"
                      y1="50%"
                      x2="85%"
                      y2="50%"
                      stroke="#ec489a"
                      strokeWidth={1.25}
                    />
                  </>
                )}
                {currentPanel === "bucket" && (
                  <>
                    <line
                      x1="15%"
                      y1="95%"
                      x2="50%"
                      y2="95%"
                      stroke="#a955f7"
                      strokeWidth={1.25}
                    />
                    <line
                      x1="50%"
                      y1="95%"
                      x2="50%"
                      y2="80%"
                      stroke="#a955f7"
                      strokeWidth={1.25}
                    />
                  </>
                )}
              </svg>
              <div
                className={clsx(
                  currentPanel === "observability" && "border-sky-500",
                  currentPanel === "rate" && "border-pink-500",
                  currentPanel === "bucket" && "border-purple-500",
                  "h-[70%] w-[70%] shadow-md border rounded-xl bg-white absolute top-0 bottom-0 left-0 right-0 m-auto p-4"
                )}
              >
                {currentPanel === "observability" && (
                  <div className="relative h-full">
                    <div className="p-6 w-56 bg-white border border-gray-300 rounded-lg space-y-2 absolute">
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-sm  text-gray-700">
                          Total Costs
                        </div>
                        {
                          <CurrencyDollarIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        }
                      </div>
                      <div className="text-2xl font-semibold">$432.24</div>
                    </div>
                    <div className="p-6 w-56 bg-white border border-gray-300 rounded-lg space-y-2 absolute top-[20%] right-0 z-10">
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-sm  text-gray-700">
                          Avg Latency / Req
                        </div>
                        {
                          <CloudArrowDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        }
                      </div>
                      <div className="text-2xl font-semibold">437.27 ms</div>
                    </div>
                    <div className="p-2 bottom-2 absolute rounded-lg border border-gray-300 mr-8">
                      <img
                        src="/assets/landing/requests.png"
                        alt="requests-graph"
                      />
                    </div>
                  </div>
                )}
                {currentPanel === "rate" && (
                  <div className="h-full flex flex-col space-y-4">
                    <div className="w-full font-semibold text-gray-900 grid grid-cols-8 divide-x divide-gray-300 px-2 border-b border-gray-300 pb-1">
                      <p className="col-span-2">User</p>
                      <p className="col-span-3 pl-4">Total Cost</p>
                      <p className="col-span-3 pl-4">Avg Req / Day</p>
                    </div>
                    <ul className="space-y-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <li key={i}>
                          <ul className="w-full grid grid-cols-8 px-1">
                            <li className="bg-gray-400 rounded-lg h-6 w-12 col-span-2" />
                            <li className="bg-gray-400 rounded-lg h-6 w-16 col-span-3 ml-2" />
                            <li className="bg-gray-400 rounded-lg h-6 w-16 col-span-3 ml-2" />
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentPanel === "bucket" && (
                  <div className="relative h-full">
                    <div className="p-6 w-56 z-10 bg-white border border-gray-300 rounded-lg right-0 space-y-2 absolute">
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-sm  text-gray-700">
                          Total Saved
                        </div>
                        {
                          <BanknotesIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        }
                      </div>
                      <div className="text-2xl font-semibold">$146.21</div>
                    </div>
                    <div className="p-2 left-0 top-[15%] absolute rounded-lg border border-gray-300">
                      <img
                        src="/assets/landing/piechart.png"
                        alt="pie-chart"
                        className="h-56 w-56"
                      />
                    </div>
                    <div className="p-4 h-40 w-56 bg-white border border-gray-300 rounded-lg flex flex-col space-y-4 absolute bottom-0 right-0">
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-12" />
                        <div className="bg-gray-400 rounded-md h-4 w-12" />
                        <div className="bg-gray-400 rounded-md h-4 w-8" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-8" />
                        <div className="bg-gray-400 rounded-md h-4 w-20" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-12" />
                        <div className="bg-gray-400 rounded-md h-4 w-20" />
                        <div className="bg-gray-400 rounded-md h-4 w-8" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="bg-gray-400 rounded-md h-4 w-16" />
                        <div className="bg-gray-400 rounded-md h-4 w-24" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 space-y-8 py-32 pr-32">
            <p className="text-lg text-pink-500 tracking-wide font-semibold">
              User Management Tools
            </p>
            <p className="text-5xl text-gray-900 font-semibold">
              Easily manage your application&apos;s users
            </p>
            <div ref={rateDiv} id="rate" className="sr-only" />
            <p className="text-xl text-gray-700 font-normal leading-8">
              Our intuitive user management tools offer a hassle-free way to
              control access to your system.
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-700">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    User Rate Limiting:
                  </span>{" "}
                  Limit the number of requests per user to prevent abuse
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    User Metrics:
                  </span>{" "}
                  Identify power users and optimize your application for them
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Request Retries:
                  </span>{" "}
                  Automatically retry failed requests to ensure users
                  aren&apos;t left in the dark
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col col-span-2 col-start-1 space-y-8 py-32 pr-32">
            <p className="text-lg text-purple-500 tracking-wide font-semibold">
              Tooling for LLMs
            </p>
            <p className="text-5xl text-gray-900 font-semibold">
              Tools to scale your LLM-powered application
            </p>
            <div ref={bucketDiv} id="bucket" className="sr-only" />
            <p className="text-xl text-gray-700 font-normal leading-8">
              Our toolkit provides an array of features to manage and control
              your AI applications.
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-700">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Bucket Cache:
                  </span>{" "}
                  Save money by caching and configuring responses
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Custom Properties:
                  </span>{" "}
                  Tag requests to easily segment and analyze your traffic
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-900 underline">
                    Streaming Support:
                  </span>{" "}
                  Get analytics into streamed responses out of the box
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#0a2540] h-full">
        <div className="px-8 pb-16 relative grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-400 border-dashed w-full items-center justify-center">
          <div className="col-span-2 flex flex-col space-y-12 py-32 pr-32">
            <p className="text-lg text-sky-400 tracking-wide font-semibold">
              Made By Developers, For Developers
            </p>
            <p className="text-5xl text-white font-semibold">
              Simple and Flexible Integration
            </p>
            <p className="text-xl text-gray-300 font-normal leading-8">
              Our solution is designed to seamlessly integrate with your
              existing setup:
            </p>
            <ul className="flex flex-col space-y-4 list-disc ml-4 font-normal text-gray-300">
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-100 underline">
                    Effortless Setup:
                  </span>{" "}
                  Get started with only 2 lines of code
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-100 underline">
                    Versatile Support:
                  </span>{" "}
                  Our platform smoothly integrates with your preferred tool
                </p>
              </li>
              <li>
                <p className="leading-7">
                  <span className="font-semibold text-gray-100 underline">
                    Package Variety:
                  </span>{" "}
                  Choose from a wide range of packages to import
                </p>
              </li>
            </ul>
            <div>
              <button className="px-4 py-2 bg-sky-400 font-semibold text-gray-900 rounded-xl">
                Read Our Docs
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-2 h-full py-16 space-y-4">
            <CodeSnippet />
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        <div className="px-8 grid grid-cols-4 gap-24 h-full max-w-7xl mx-auto border-r border-l border-gray-300 border-dashed w-full items-center justify-center">
          <div className="col-span-2 flex flex-col space-y-8 py-32">
            <p className="text-4xl text-sky-500 tracking-wide font-semibold">
              Open Source
            </p>
            <p className="text-2xl text-gray-900 font-semibold">
              Open-source is more than a choice—it&apos;s a commitment to
              user-centric development, community collaboration, and absolute
              transparency.
            </p>
            <div className="flex flex-row gap-8">
              <button className="px-4 py-2 bg-gray-800 font-semibold text-white rounded-xl">
                Star us on GitHub
              </button>
              <button className="underline underline-offset-2 font-semibold text-gray-900">
                View Roadmap
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-1 h-full py-32 space-y-4">
            <div className="flex flex-col space-y-2">
              <CloudIcon className="h-8 w-8 inline text-sky-500" />
              <p className="text-gray-900 font-semibold text-lg">
                Cloud Solution
              </p>
            </div>
            <p className="text-gray-500">
              We offer a fully-managed cloud solution, allowing you to focus on
              what matters most.
            </p>
            <div>
              <button className="underline underline-offset-2 font-semibold text-gray-900">
                View Pricing
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-1 h-full py-32 space-y-4">
            <div className="flex flex-col space-y-2">
              <CloudArrowUpIcon className="h-8 w-8 inline text-sky-500" />
              <p className="text-gray-900 font-semibold text-lg">AWS Deploy</p>
            </div>
            <p className="text-gray-500">
              Deploy your own instance of Helicone on AWS, with just a few
              clicks.
            </p>
            <div>
              <button className="underline underline-offset-2 font-semibold text-gray-900">
                View Docs
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-violet-200 h-full">
        <div className="px-8 grid grid-cols-4 h-full max-w-7xl mx-auto border-r border-l border-gray-400 border-dashed w-full text-center items-center justify-center">
          <div className="col-span-4 flex flex-col space-y-8 py-32">
            <p className="text-4xl text-violet-900 tracking-wide font-semibold">
              Join Our Community
            </p>
            <p className="text-2xl text-gray-700 font-medium">
              We&apos;re always looking for new contributors to help us improve
            </p>
            <div className="flex flex-row gap-8 w-full justify-center">
              <a
                href="https://discord.gg/zsSTcH2qhG"
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-2 bg-gray-800 font-semibold text-white rounded-xl"
              >
                Join Discord
              </a>
            </div>
          </div>
          <section className="col-span-4">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
              <div className="mx-auto grid gap-4 max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none md:grid-cols-2 xl:grid-cols-4">
                {testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="bg-violet-100 shadow-sm flex flex-col p-8 rounded-xl space-y-4 h-full justify-between"
                  >
                    <blockquote className="text-sm leading-6">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-x-4 w-fit">
                      <img
                        className="h-10 w-10 flex-none rounded-full bg-gray-50"
                        src={testimonial.author.imageUrl}
                        alt=""
                      />
                      <div className="flex-auto text-left">
                        <div className="font-semibold">
                          {testimonial.author.name}
                        </div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:flex md:items-center md:justify-between lg:px-8  border-r border-l border-gray-300 border-dashed">
          <div className="flex space-x-6 md:order-2">
            {meta.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0 space-x-4 flex flex-row">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2023 Helicone, Inc. All rights reserved.
            </p>
            <a
              href="/privacy"
              className="text-center text-xs leading-5 text-gray-500"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-center text-xs leading-5 text-gray-500"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
