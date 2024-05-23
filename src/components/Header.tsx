import { LinkIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const navLink = [
    { item: "Dasboard", href: "/" },
    { item: "Reports", href: "/" },
    { item: "Documents", href: "/" },
    { item: "History", href: "/" },
    { item: "Settings", href: "/" },
  ];
  return (
    <div className="h-[70px] bg-black  flex  font-bold items-center rounded-[16px]  my-8 px-4 justify-between mx-8">
      <div className="flex flex-row font-bold items-center">
        <LinkIcon height={20} color="white" />
        <p className="text-white ml-1 text-md">ramos</p>
      </div>

      <ul className="text-white text-sm font-extralight justify-around list-none flex w-[45%] h-[50px] items-center bg-[#252525] rounded-lg">
        {navLink.map((i) => (
          <li>{i.item}</li>
        ))}
      </ul>

      <button className="h-[50px] bg-white rounded-lg px-8 font-extralight text-sm text-black">
        Sign Up
      </button>
    </div>
  );
};

export default Header;
