/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  LinkIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { animated, useSpring } from "react-spring";

export const AnimatedNumber = ({ value, format, className }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { number }: any = useSpring({
    number: inView ? value : 0,
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    config: { mass: 1, tension: 120, friction: 50 },
  });

  useEffect(() => {
    if (inView) {
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

const AnimatedLineGraph = ({ data }: { data: number[] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const generatePath = (data: number[]) => {
    let d = "";
    const width = 40; // Width between points
    const height = 100; // SVG height

    data.forEach((point, index) => {
      const x = index * width;
      const y = height - point;
      if (index === 0) {
        d += `M ${x},${y}`;
      } else {
        const prevX = (index - 1) * width;
        const prevY = height - data[index - 1];
        d += ` C ${prevX + width / 2},${prevY} ${x - width / 2},${y} ${x},${y}`;
      }
    });
    return d;
  };

  const path = generatePath(data);

  const { length } = useSpring({
    length: inView ? path.length : 0,
    from: { length: 0 },
    config: { mass: 1, tension: 120, friction: 50 },
  });

  return (
    <svg
      ref={ref}
      width={data.length * 40}
      height="200"
      className="absolute top-0 left-0 mb-[20px]"
    >
      <animated.path
        d={path}
        fill="none"
        stroke="#FFD025"
        strokeWidth="2"
        strokeDasharray={path.length}
        strokeDashoffset={length.interpolate((length) => path.length - length)}
      />
    </svg>
  );
};

const ProgressBar = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { width } = useSpring({
    width: inView ? "100%" : "0%",
    from: { width: "0%" },
    config: { mass: 1, tension: 120, friction: 50 },
  });

  return (
    <div
      ref={ref}
      className="w-[160px] bg-gray-200 rounded-full overflow-hidden h-2 mt-6"
    >
      <animated.div style={{ width }} className="h-full flex">
        <div className="bg-[#48C784] w-1/3"></div>
        <div className="bg-[#FFF] w-[2px]"></div>
        <div className="bg-[#FFD025] w-1/3"></div>
        <div className="bg-[#FFF] w-[2px]"></div>
        <div className="bg-[#48C784] w-1/3"></div>
      </animated.div>
    </div>
  );
};

const BarChart = ({ data }: { data: number[] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="relative flex items-end h-[150px] gap-2">
      {data.map((value, index) => {
        const { height } = useSpring({
          height: inView ? `${value}%` : "0%",
          from: { height: "0%" },
          config: { mass: 1, tension: 120, friction: 50 },
        });

        const barColor = index === 3 ? "#FFD025" : "#e2e2e2";

        return (
          <animated.div
            key={index}
            style={{ height, backgroundColor: barColor }}
            className="w-[30px] rounded mt-8"
          ></animated.div>
        );
      })}
      <AnimatedLineGraph data={data} />
    </div>
  );
};

const ControlContent = () => {
  const barData = [40, 60, 20, 80, 70];

  return (
    <div className="mt-32 px-24">
      <h1 className="text-[130px] text-black">
        We give you full
        <br /> <span className="text-[#CCCCCC]">control</span> over your data
      </h1>

      <div className="flex gap-4 mt-32 justify-around">
        <div className="rounded-[40px] px-12 pt-12 pb-12 bg-[#F9F9F9] border border-[#EFEFEF] w-[580px] flex flex-col">
          <div className="rounded-[30px] bg-white border border-[#EFEFEF] w-[240px] h-[300px] text-center items-center justify-center px-2 py-4 flex">
            <div>
              <p className="text-black text-[16px] pb-4">Conversion rate</p>

              <div className="flex-col rounded-full h-[35px] w-[35px] items-center justify-center flex bg-[#F2F2F2] absolute left-[234px]">
                <div className="flex-col rounded-full h-[25px] w-[25px] items-center justify-center flex bg-white">
                  <div>
                    <ArrowTrendingUpIcon height={9} />
                    <ChartBarIcon height={10} className="-mt-1" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-[#FFD025] py-4 text-center items-center justify-center w-[120px] mt-4">
                <h1 className="text-6xl text-black">
                  2,3<span className="text-2xl">%</span>
                </h1>
              </div>

              <div>
                <p className="text-gray-400 font-light mt-10 text-md">
                  Percentage of
                  <br />
                  website visitors
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] bg-white border border-[#EFEFEF] w-[240px] items-center px-8 py-4 flex flex-col absolute z-50 left-[380px] shadow-lg mt-[50px]">
            <div>
              <p className="text-gray-500 text-[16px] pb-4 text-left mt-4">
                Sales revenue
              </p>

              <div className="flex">
                <p className="mt-3">$</p>
                <AnimatedNumber
                  value={131000}
                  format="k"
                  className="text-[34px] text-black w-[40px]"
                />
              </div>

              <div>
                <ProgressBar />

                <div className="mt-8 flex items-center gap-2">
                  <img
                    src="https://images.pexels.com/photos/23201952/pexels-photo-23201952/free-photo-of-street-food.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt="Avatar 1"
                    className="w-12 h-10  rounded-full top-0 left-0"
                  />

                  <div className="flex items-center justify-between w-[140px]">
                    <p className="text-gray-400 text-sm">Min price</p>
                    <p className="text-black text-sm">1200 $</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <img
                    src="https://images.pexels.com/photos/23201952/pexels-photo-23201952/free-photo-of-street-food.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt="Avatar 1"
                    className="w-12 h-10  rounded-full top-0 left-0"
                  />

                  <div className="flex items-center justify-between w-[140px]">
                    <p className="text-gray-400 text-sm">Min price</p>
                    <p className="text-black text-sm">1200 $</p>
                  </div>
                </div>

                <div
                  className="flex absolute w-[160px] items-center mt-4"
                  style={{ borderBottom: "1px solid #F7F7F7" }}
                />

                <div className="flex items-center justify-between w-[170px] mt-8">
                  <p className="text-gray-400 text-sm">Engagement rate</p>
                  <p className="text-black text-sm">47,84%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-28 text-center">
            <h1 className="text-2xl">Improved Customer Service</h1>

            <p className="text-lg text-gray-400 mt-4 text-center">
              Analytics helps optimize service processes by
              <br />
              providing information on how to improve interactions
              <br />
              with customers and increase their satisfaction
            </p>
          </div>
        </div>

        <div className="rounded-[40px] px-12 pt-12 pb-30 bg-[#F9F9F9] border border-[#EFEFEF] w-[580px] flex justify-center items-center flex-col">
          <div className="items-center">
            <div className="rounded-[20px] border border-[#EFEFEF] w-[280px] h-[100px] bg-white"></div>
            <div className="rounded-[20px] bg-white border border-[#EFEFEF] w-[400px] h-[100px] absolute -ml-[60px] -mt-[85px]">
              <div className="flex px-4 ">
                <div className="relative flex items-center justify-center  w-[30px] h-[30px] rounded-[10px] bg-[#F2F2F2] mt-1">
                  <ShareIcon
                    height={14}
                    style={{ transform: "rotate(90deg)" }}
                  />
                </div>
                <p className="px-2 py-3">Finance reports</p>
              </div>
            </div>
            <div className="rounded-[20px] bg-white border border-[#EFEFEF] w-[450px] h-[240px] absolute -ml-[80px] -mt-[45px] shadow-lg flex gap-8">
              <div>
                <div className="flex px-4 py-6 ">
                  <div className="relative flex items-center justify-center  w-[30px] h-[30px] rounded-[10px] bg-[#F2F2F2] mt-1">
                    <div className="border border-black rounded-md">
                      <ArrowTrendingUpIcon height={14} />
                    </div>
                  </div>
                  <p className="px-2 py-3">Insights</p>
                </div>
                <div className="px-4">
                  <p className="text-gray-400 text-lg">Total profit</p>
                  <h1 className="text-4xl mt-2">
                    <span className="text-2xl">$</span>
                    264,2K
                  </h1>

                  <div className="px-4 py-2 items-center justify-center flex bg-[#FFD025] rounded-lg w-[140px] text-sm mt-4">
                    Data visualization
                  </div>
                </div>
              </div>

              <div className="w-full relative mt-10">
                <BarChart data={barData} />
              </div>
            </div>
          </div>

          <div className="mt-[240px] text-center items-center">
            <h1 className="text-2xl">Monitoring key indicators</h1>

            <p className="text-lg text-gray-400 mt-4 text-center">
              Analytics platforms allow business to track
              <br />
              KPIs, an important tool for measuring success
              <br />
              and achieving goals
            </p>
          </div>
        </div>
      </div>
      <div className="my-24 items-center flex flex-col justify-center">
        <div className="rounded-[40px] bg-[#FE4A22] w-[120px] h-[120px] flex items-center justify-center shadow-lg shadow-[0_4px_6px_-1px_#FE4A22,0_2px_4px_-2px_#FE4A22]">
          <LinkIcon color="white" height={50} />
        </div>

        <p className="text-[120px] text-center mt-10 font-[500]">Get Started</p>

        <p className="text-gray-400 mt-8 text-3xl text-center">
          Turn information into adantage! Start using <br />
          Ramos today. Signup for a free trial.
        </p>

        <div className="flex gap-4 mt-8">
          <div className="px-4 py-2 items-center justify-center flex bg-[#F2F2F2] rounded-xl w-[180px] text-lg mt-4">
            Request a demo
          </div>

          <div className="px-4 py-2 items-center justify-center flex bg-[#FE4A22] rounded-xl w-[180px] text-lg mt-4 text-white">
            Start for free
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlContent;
