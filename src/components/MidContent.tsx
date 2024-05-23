/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import AnalyticsCard from "./AnalyticsCard";
import WidgetCard from "./WidgetCard";
import { useInView } from "react-intersection-observer";

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

const MidContent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust the threshold as needed
  });

  console.log(ref);

  return (
    <div className="bg-[#F9F9F9] rounded-[60px] w-full px-24 py-40 h-full">
      <div className="flex justify-between items-center">
        <p className="text-black text-5xl">
          Your keys to strategic
          <br />
          success through analytics
        </p>

        <p className="text-gray-700 text-xl font-light">
          Ready for exciting, instantaneous,
          <br />
          all-accessible insights in real time?
        </p>
      </div>

      <div className="mt-32 flex justify-between gap-4">
        <AnalyticsCard />
        <WidgetCard />
      </div>

      <div className="mt-24 items-center text-center flex gap-8 justify-center">
        <p className="text-xl mt-10">Up to</p>
        <AnimatedNumber
          inView={inView}
          value={45}
          format="percent"
          className="text-8xl text-black"
        />
        <p className="text-sm font-light text-black text-left">
          Increase your analytics up to 45%. Unique
          <br />
          algorithms provide insights from data, reduce time for analysis
          <br />
          and save time for making important, informed decisions
        </p>
      </div>
    </div>
  );
};

export default MidContent;
