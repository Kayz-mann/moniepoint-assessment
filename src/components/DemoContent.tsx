/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowTrendingUpIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { animated, useSpring } from "react-spring";

export const AnimatedNumber = ({ value, format, className }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust the threshold as needed
  });

  const { number }: any = useSpring({
    number: inView ? value : 0, // Start from 0 when not in view
    from: { number: 0 }, // Start animation from 0
    to: { number: inView ? value : 0 }, // End animation at value when in view
    config: { mass: 1, tension: 120, friction: 50 }, // Adjusted tension and friction for slower animation
  });

  useEffect(() => {
    if (inView) {
      // When component comes into view, update the initial value of the animation
      // This triggers the animation from the correct starting point
      number.start({
        number: value,
      });
    }
  }, [inView, value, number]);

  const formatNumber = (num: number) => {
    if (format === "k") {
      return num >= 1000 ? (num / 1000).toFixed(0) + "K" : num.toString();
    }
    if (format === "percent") {
      return num.toFixed(0) + "%";
    }
    return num.toFixed(0);
  };

  return (
    <animated.div ref={ref} className={className}>
      {number.to((n: number) => formatNumber(n))}
    </animated.div>
  );
};

const DemoContent = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust the threshold as needed
  });

  console.log(ref);

  useEffect(() => {
    const textElement = document.querySelector(".scrolling-text");
    if (textElement) {
      textElement.classList.add("scroll");
    }
  }, [inView]);

  return (
    <div className="mt-20 px-20">
      <h1 className="text-[130px] text-black">
        Maximize <span className="text-[#CCCCCC]">efficiency</span>
        <br />
        with our intuitive
      </h1>

      <div className="flex justify-between mt-20 items-center">
        <div className=" flex relative">
          <div className="rounded-full w-70 h-70 bg-[#F2F2F2] px-12 py-12 flex flex-col items-center justify-center z-50 ">
            {/* dotted border of width 100px */}
            <div
              className=" top-1/2 transform  flex absolute "
              style={{
                width: "90px",
                //   height: "1px",
                borderBottom: "1px dotted #FE4A22",
                //   zIndex: "140",
              }}
            />
            <div className=" relative rounded-lg h-[40px] w-[40px] bg-[#FE4A22] items-center justify-center flex">
              <ArrowTrendingUpIcon height={20} color="white" />
            </div>
          </div>
          {/* Add the dotted divider line */}

          <div className="rounded-full w-70 h-70 bg-[#FFD025] px-12 py-12 flex flex-col items-center justify-center -ml-4">
            <AnimatedNumber
              inView={inView}
              value={45}
              format="percent"
              className="text-xl text-black -mt-10"
            />
            <p className="text-[14px] mt-4 text-center absolute top-[55px]">
              System grow <br />
              faster
            </p>
          </div>
        </div>

        <div className="px-8 py-4 rounded-[50px] bg-[#FFD025] items-center w-[580px] overflow-hidden">
          <h1 className="ml-[220px] text-[130px] text-black overflow-hidden whitespace-nowrap scrolling-text">
            Analytics service
          </h1>
        </div>
      </div>
      <style>{`
        .scrolling-text {
          display: inline-block;
          white-space: nowrap;
          transform: translateX(0);
          transition: transform 10s linear;
        }
        .scrolling-text.scroll {
          transform: translateX(
            calc(520px - 100%)
          ); /* Adjust this value based on container width */
        }
      `}</style>

      <div className="flex w-full my-20 border-b-[1px] " />
      <div className="my-10 flex justify-between items-center">
        <p className="text-sm font-light text-black text-left">
          Explore traffic sources, page behavior, conversations and more to gain
          deep insight
          <br />
          into your audience. With us your business doesn't just adopt - it
          evolves
        </p>

        <div className=" flex gap-6">
          <div className="items-center justify-center rounded-lg px-4 py-3 bg-[#F2F2F2] ">
            <p className="text-gray-700 text-xs">Request a demo</p>
          </div>

          <div className="items-center justify-center rounded-lg px-5 py-3 bg-[#FE4A22] ">
            <p className="text-white text-xs">Start for free</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoContent;
