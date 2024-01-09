import React from "react";
import Icon, { IconType } from "../../../common/Icon";
import { twMerge } from "tailwind-merge";
import useModal from "../../../hooks/useModal";

const features: { title: string; content: string[]; icon: IconType }[] = [
  {
    title: "Customizable Voting",
    content: [
      "Enjoy the peace of mind with our robust security measures.",
      "Customize every aspect of your voting event, from eligible voters to recasting options.",
    ],
    icon: "vpnLock",
  },
  {
    title: "Web5 Technology",
    content: [
      "Harness the latest in web technologies for a seamless and responsive user experience.",
      "Accessible from any device, ensuring convenience for all participants.",
    ],
    icon: "solidCube",
  },
  {
    title: "Real-time Results",
    content: [
      "Track the progress of your event with real-time result updates.",
      "Visualize voting outcomes through dynamic graphs and charts.",
    ],
    icon: "clock",
  },
];

export default function Hero() {
  const modal = useModal();

  return (
    <section className="p-page h-[92vh] relative flex">
      <div className="bg-foreground bg-opacity-5 top-0 right-0 h-full w-2/5 absolute" />

      <div className="basis-3/5 flex flex-col justify-center">
        <div className="flex flex-col">
          <p className="flex mb-6 items-center font-bold gap-x-2">
            <Icon
              icon="howToVote"
              className="bg-foreground p-[6px] rounded-full text-4xl bg-opacity-10"
            />
            Voting doesn't need to be complex
          </p>
          <h1 className="font-raleway font-extrabold tracking-tighter leading-none text-6xl">
            Make your <br /> Vote <br /> Count!
          </h1>

          <div className="mt-8 mb-32 flex gap-x-10">
            <button className="bg-foreground text-back px-10 py-3 rounded-full">
              Get Started
            </button>
            <button className="underline underline-offset-8">
              View Results
            </button>
          </div>

          <div className="mb-10">
            <p className="text-xl font-medium tracking-tight pr-[8vw]">
              At Fifth Poll, we believe in the power of collective
              decision-making. Whether you're running a community election,
              organizing a school event, or making group decisions, Fifth Poll
              provides a secure and flexible online voting platform tailored to
              your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="basis-2/5 relative flex flex-col justify-center items-center">
        <img
          src="/example.png"
          alt="example image"
          className="rounded-xl absolute top-[30%] -translate-y-1/2 left-0 -translate-x-[40%] w-[20vw] shadow-lg border border-front border-opacity-20 z-30"
        />
        <div className="relative">
          <img
            src="/fist.png"
            alt="fist"
            className="h-[64vh] bg-gradient-to-t from-primary to-pink-200 rounded-full px-4 pt-10"
          />
          <div className="absolute bottom-0 right-0 w-20 h-52 bg-primary rounded-full blur-2xl opacity-80 -z-1" />
          <div className="absolute bottom-0 right-0 w-20 h-52 bg-pink-300 rounded-full -translate-y-20 blur-2xl opacity-80 -z-1" />
        </div>

        <div className="flex flex-col mt-12">
          {features.map((feature, key) => (
            <div
              className={twMerge(
                `flex gap-x-3 px-5 py-4 items-center cursor-pointer relative before:absolute before:w-0 before:top-0 before:left-0 before:h-full hover:before:w-full before:bg-foreground before:-z-1
                duration-150 hover:duration-300 before:duration-inherit hover:text-back`,
                key != features.length - 1 &&
                  "border-b border-front border-opacity-30"
              )}
              onClick={() => {
                modal.show(
                  <div className="bg-background p-8 rounded-lg shadow-md">
                    <h1>{feature.title}</h1>
                    {feature.content.map((item, i) => (
                      <p>{item}</p>
                    ))}
                  </div>
                );
              }}
            >
              <Icon icon={feature.icon} className="text-xl" />
              <h5>{feature.title}</h5>
              <div className="flex-1" />
              <Icon icon="arrowForwardIos" className="ml-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
