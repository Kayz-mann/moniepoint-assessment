import barcode from "../../src/assets/bar-code.png";

const FooterContent = () => {
  return (
    <div className="bg-black w-full mt-20 px-20 py-20">
      <div className="flex justify-between items-center">
        <ul className="flex gap-12 text-white list-none font-extralight">
          <li> About</li>
          <li>Why Us</li>
          <li>Platform</li>
          <li>Pricing</li>
          <li>Contacts</li>
        </ul>

        <p className="text-7xl text-white">hello@ramos.com</p>
      </div>

      <div className="items-center justify-center flex scroll-px-20 my-10">
        <div
          className="flex absolute w-full"
          style={{
            borderBottom: "0.5px solid #FFF",
          }}
        />
      </div>

      <div className=" flex justify-between items-center">
        <div className="flex gap-20">
          <div>
            <p className="text-2xl text-white font-bold">
              Warrensville heights
            </p>
            <p className="text2xl text-gray-200 mt-4 font-extralight">
              14418 Vineyard Drive, NC <br />
              44128
            </p>
          </div>

          <div>
            <p className="text-2xl text-white font-bold">Saint Louis</p>
            <p className="text2xl text-gray-200 mt-4 font-extralight">
              1366 Penn Street <br />
              63101
            </p>
          </div>
        </div>

        <div className="justify-end text-right">
          <p className=" text text-2xl text-white mb-8">LinkedIn</p>
          <p className=" text text-2xl text-white mb-8">Instagram</p>
          <p className=" text text-2xl text-white mb-8">Facebook</p>
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <h1 className="text-white text-[220px]">Ramos</h1>

        <p className="text-gray-600 text-xl">Privacy Policy</p>
        <p className="text-gray-600 text-xl">License agreement</p>

        <img src={barcode} alt="/" className="h-[180px] w-[8]" />
      </div>
    </div>
  );
};

export default FooterContent;
