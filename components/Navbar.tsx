import Logo from "./Logo";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <header className="sm:hidden h-14 fixed w-full flex items-center z-20 bg-white bg-opacity-10 backdrop-blur-md">
      <h1 className="w-1/3">☰</h1>
      <Logo title="Ant Wallet" />
    </header>
  );
};

export default Navbar;
