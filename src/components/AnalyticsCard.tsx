/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  ArrowUpCircleIcon,
  ArrowsRightLeftIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/20/solid";
import { useInView } from "react-intersection-observer";
import { Line } from "react-chartjs-2";
import { useSpring, animated } from "react-spring";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ inView }: any) => {
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [0, 0, 0, 0, 0],
        borderColor: "#FFD025",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    if (inView) {
      setData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "Sales",
            data: [50, 40, 70, 60, 100, 80, 120, 100, 130, 100],
            borderColor: "#FFD025",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      });
    }
  }, [inView]);

  const animationProps = useSpring({
    to: { opacity: inView ? 1 : 0 },
    from: { opacity: 0 },
    config: { duration: 2000 }, // Adjusted duration to make the transition slower
  });

  return (
    <div className="px-4 py-4 border border-gray-200 rounded-lg mt-10 w-[308px] z-10">
      <animated.div style={animationProps}>
        <Line
          data={data}
          options={{
            scales: {
              y: {
                display: false,
              },
              x: {
                grid: {
                  display: true,
                  color: "rgba(200, 200, 200, 0.2)",
                },
              },
            },
            elements: {
              line: {
                tension: 0, // disables bezier curves
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
          }}
          height={150}
        />
      </animated.div>
    </div>
  );
};

export const AnimatedNumber = ({ value, inView, format, className }: any) => {
  const { number } = useSpring({
    number: inView ? value : 1,
    from: { number: 1 },
    config: { mass: 1, tension: 120, friction: 50 }, // Adjusted tension and friction for slower animation
  });

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
    <animated.div className={className}>
      {number.to((n: number) => formatNumber(n))}
    </animated.div>
  );
};

const AnalyticsCard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust the threshold as needed
  });

  return (
    <div className="pl-10 border-[1px] border-[#E7E7E7] rounded-[40px] flex w-[750px] space-y-10 shadow-md">
      <div className="mr-10 mt-10 w-full">
        <div className="items-center justify-center rounded-lg px-8 py-2 w-[160px] bg-[#FFD025] shadow-[0_4px_6px_-1px_rgba(255,208,37,0.7),0_2px_2px_-1px_rgba(255,208,37,0.06)]">
          <p className="text-gray-700 text-xs">Setting up reports</p>
        </div>

        <div className="mt-20">
          <p className="text-3xl text-black">
            Fast and easy access <br /> to analytics
          </p>

          <p className="text-xl text-gray-400 mt-10">
            One platform is a comprehensive
            <br />
            system of solutions that will be the <br />
            first step toward the digitalization of
            <br />
            your business!
          </p>
        </div>
      </div>

      <div className="border-t-[2px] border-[2px] border-r-0 border-b-0 border-[#E7E7E7] rounded-tl-xl rounded-bl-none rounded-tr-none rounded-br-none h-[400px] w-full px-4 py-4">
        <p className="text-black text-l">Sales statistic</p>
        <div className="flex justify-between w-full mt-4">
          <div className="mt-4 flex gap-4">
            <div className="rounded-full bg-[#FE4A22] px-2 py-2 w-[54px] h-[54px] flex items-center justify-center">
              <Square3Stack3DIcon height={16} color="#FFF" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total profit</p>
              <span className="flex items-center">
                <span className="text-xl font-extralight mr-1">$</span>
                <p className="text-2xl text-black">{"264,2K"}</p>
              </span>
            </div>
          </div>
          <div className="justify-start">
            <div className="rounded-lg px-4 py-2 bg-[#F6F6F6] w-[140px]">
              <p className="text-xs text-black">Visitors</p>

              <div className="relative w-full h-1 bg-gray-300 rounded-full mt-2 overflow-hidden">
                <div
                  ref={ref}
                  className="absolute left-0 top-0 h-full bg-green-500 rounded-full transition-all duration-2000"
                  style={{ width: inView ? "40%" : "0%" }}
                />
              </div>

              <div className="flex mt-4">
                <AnimatedNumber
                  className="text-2xl"
                  value={56000}
                  format="k"
                  inView={inView}
                />
                <div className="ml-1 flex gap-1 items-center -mt-4">
                  <ArrowUpCircleIcon height={15} color="#48C784" />
                  <AnimatedNumber
                    value={14}
                    format="percent"
                    inView={inView}
                    className="text-[8px] text-[#48C784]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Second container positioned near the graph */}
          <div
            className="absolute top-32 right-0 flex items-center rounded-xl px-4 py-2 bg-[#FE4A22] w-[110px] z-100 shadow-[0px_4px_6px_-1px_rgba(254,74,34,0.7),0px_2px_4px_-1px_rgba(254,74,34,0.06)]"
            style={{ marginTop: "-20px", marginRight: "20px" }}
          >
            <div>
              <p className="text-xs text-white font-light">Rate</p>

              <div className="flex items-center text-white">
                <p className="text-xl">+</p>
                <AnimatedNumber value={58} format="percent" inView={inView} />
              </div>
            </div>

            <span className="ml-4 -mt-4">
              <ArrowsRightLeftIcon height={20} color="#fff" />
            </span>
          </div>

          {/* Graph container */}
          <Graph inView={inView} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
