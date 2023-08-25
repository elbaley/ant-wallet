import Link from "next/link";

interface LogoProps {
  title?: string;
}

const Logo = ({ title }: LogoProps) => {
  if (title) {
    return (
      <Link className="flex items-center " href="/home">
        <img
          className="h-9 aspect-square hover:opacity-80 mx-auto "
          src="./antwallet_logo.png"
        />
        <h3 className="text-xl font-semibold">{title}</h3>
      </Link>
    );
  }
  return (
    <Link href="/home">
      <img
        className="h-9 aspect-square hover:opacity-80 mx-auto "
        src="./antwallet_logo.png"
      />
    </Link>
  );
};

export default Logo;
