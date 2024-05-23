/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Square3Stack3DIcon from "@heroicons/react/24/outline/Square3Stack3DIcon";
import { useInView } from "react-intersection-observer";
import { animated, useSpring } from "react-spring";
import ArrowUpCircleIcon from "@heroicons/react/20/solid/ArrowUpCircleIcon";

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

const WidgetCard = () => {
  return (
    <div className="bg-black rounded-[40px] w-[500px] px-20 py-10 shadow-lg items-center">
      <div className="flex gap-4">
        <div className="border border-[#3B3939] px-6 py-8 w-[170px] items-center justify-center rounded-xl relative">
          <span className="absolute" style={{ marginLeft: 35 }}>
            <Square3Stack3DIcon height={35} color="#E7D228" />
          </span>
          <div className="relative mt-8 items-center justify-center top-6 left-2">
            <img
              src="https://images.pexels.com/photos/23201952/pexels-photo-23201952/free-photo-of-street-food.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="Avatar 1"
              className="w-12 h-12 rounded-full border-2 top-0 left-0"
            />
            <img
              src="https://images.pexels.com/photos/24702820/pexels-photo-24702820/free-photo-of-a-woman-sitting-on-a-chair-with-her-legs-crossed.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="Avatar 2"
              className="w-12 h-12 rounded-full border-2 absolute top-0 left-10"
            />
          </div>
        </div>
        <div className="border border-[#3B3939] px-2 py-8 w-[170px] items-center justify-center rounded-xl text-white">
          <p className="text-white text-xs">Transactions</p>
          <span className="flex flex-row">
            <div className="ml-1 flex gap-1  mt-4">
              <AnimatedNumber
                className="text-white text-6xl mt-8"
                value={43000} // Adjusted the value here
                format="k" // corrected typo here
              />
              <div className="ml-1 flex gap-1 items-center -mt-10">
                <ArrowUpCircleIcon height={26} color="#48C784" />
                <AnimatedNumber
                  value={14}
                  format="percent"
                  className="text-[10px] text-[#48C784]"
                />
              </div>
            </div>
          </span>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-center items-center text-white text-2xl">
          Widget control
        </p>

        <p className="text-center items-center text-gray-500 text-lg mt-8">
          Reports provide a comprehensive overview
          <br />
          of important aspects of web analytics
        </p>
      </div>
    </div>
  );
};

export default WidgetCard;
