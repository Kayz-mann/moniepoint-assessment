import { BoltIcon } from "@heroicons/react/20/solid";
import picture from "../../src/assets/p1.png";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { PlayIcon } from "@heroicons/react/20/solid";

const Headline = () => {
  return (
    <div className="mx-8 mb-40">
      <div className="mt-10 items-center flex w-full justify-center -ml-[40px]">
        <div className="flex">
          <div className="flex mt-8  items-center">
            <div className="mt-20">
              <div className="flex items-center text-right justify-end">
                <span className="inline-flex items-center mt-2">
                  <div className="rounded-full bg-[#F2F2F2] px-8 py-8 flex items-center justify-center">
                    <BoltIcon height={30} color="#FE4A22" />
                  </div>
                  <div className="rounded-full bg-[#FE4A22] px-8 py-8 flex items-center justify-center ml-16 absolute">
                    <BoltIcon height={30} color="#FFF" />
                  </div>
                </span>
                <div className="ml-20">
                  <p className="text-black text-[130px]  text-right font-[500] w-[100%] relative">
                    Analytics
                  </p>
                </div>
              </div>
              <div>
                <p className="text-black text-[130px] font-[500]  text-right w-[100%] relative -ml-20">
                  that <span className="text-[#CCCCCC]">helps</span> you
                </p>
              </div>
              <div className="text-right ml-[280px] w-full flex items-center justify-evenly">
                <p className="text-black text-[130px] font-[500] relative">
                  shape
                </p>
                <span className="rounded-full bg-[#FFD025] flex items-center justify-center w-[90px] h-[90px] mx-2 mt-8">
                  <ChartBarIcon color="black" height={35} />
                </span>

                <p className="text-black text-[130px] font-[500] relative">
                  the future
                </p>
              </div>
            </div>

            <div>
              <div className="rounded-full bg-[#FE4A22] px-4 py-4 flex items-center justify-center absolute -mt-4">
                <PlayIcon height={20} color="#FFF" />
              </div>
              <img
                src={picture}
                alt=""
                className="rounded-[30px] floa  mr-4 h-[260px] ml-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headline;
