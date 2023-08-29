import Logo from "./Logo";
interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <header className="shadow-sm shadow-zinc-300 sm:hidden pl-2 h-14 fixed w-full flex justify-between items-center z-20 bg-white dark:bg-black dark:bg-opacity-10 bg-opacity-10 backdrop-blur-md">
      <Logo title="Ant Wallet" />
    </header>
  );
};

export default Navbar;
