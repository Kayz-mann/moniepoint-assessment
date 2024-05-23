import { PlusIcon } from "@heroicons/react/20/solid";
import first from "../../src/assets/first.png";
import second from "../../src/assets/second.png";
const DataContent = () => {
  return (
    <div className="bg-[#F9F9F9] rounded-[60px] w-full pl-24 pt-40 pb-80 h-full mt-32">
      <div className="flex gap-32 justify-between">
        <div>
          <p className="text-black text-5xl">
            Turn data into real
            <br />
            actions and ideas.
          </p>

          <div className="mt-20">
            <div className="mb-4 rounded-[30px] w-[320px] px-6 py-3 shadow-lg bg-white flex justify-between items-center">
              <p className="text-xl text-black">Instant Insights</p>

              <div className="rounded-full  px-4 py-4 justify-center items-center flex bg-[#F2F2F2]">
                <PlusIcon height={20} color="black" />
              </div>
            </div>

            <div className="mb-4 rounded-[30px] w-[320px] px-6 py-3 shadow-lg bg-white flex justify-between items-center">
              <p className="text-xl text-black">AI technology</p>

              <div className="rounded-full  px-4 py-4 justify-center items-center flex bg-[#F2F2F2]">
                <PlusIcon height={20} color="black" />
              </div>
            </div>

            <div className="mb-4 rounded-[30px] w-[320px] px-6 py-3 shadow-lg bg-white flex justify-between items-center">
              <p className="text-xl text-black">Easy Integration</p>

              <div className="rounded-full  px-4 py-4 justify-center items-center flex bg-[#F2F2F2]">
                <PlusIcon height={20} color="black" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <img
            src={first}
            alt=""
            height={400}
            width={650}
            className="shadow-lg"
          />

          <img
            src={second}
            alt=""
            height={60}
            width={320}
            className="absolute shadow-lg z-50"
            style={{ marginTop: -450, marginLeft: -150 }}
          />
        </div>

        <h1 className="text-[450px] text-[#FE4A22] my-20 absolute font-[500] mt-[550px] ml-[38px]">
          Ramos
        </h1>
      </div>
    </div>
  );
};

export default DataContent;
