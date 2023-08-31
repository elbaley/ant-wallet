import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="h-screen w-screen pattern-wavy pattern-gray-300 pattern-bg-white 
  pattern-size-6 pattern-opacity-10 absolute z-[-2]"
      ></div>
      <div className="dark:block hidden absolute h-screen w-screen bg-black bg-opacity-70 z-[-1]" />
      <nav className="w-full flex px-7 pt-5 pb-12">
        <Logo title="Ant Wallet" />
      </nav>
      <main>
        <section className="w-full flex flex-col text-center items-center h-3/4 py-28">
          <h1 className="font-bold text-5xl sm:text-6xl">
            <span className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text animate-bounce-text-gradient mr-2">
              Track
            </span>
            your expenses
          </h1>
          <h2 className="font-semibold text-2xl sm:text-3xl">
            See where your money goes
          </h2>
          <p className="max-w-lg mx-auto my-0 mt-4 text-lg">
            Ant Wallet is an opensource personal finance management platform.
            With AntWallet, you can easily record and track your income and
            expenses, allowing you to visualize your personal finances.
          </p>

          <Link href="/signin">
            <button className="bg-black text-white rounded-lg px-3 py-2 hover:bg-opacity-50 text-lg mt-10 dark:border dark:border-white hover:border-none">
              Get started
            </button>
          </Link>
        </section>
      </main>
      <footer className="text-center">
        <span>
          2023 © <a href="https://furkanleba.tech">Furkan Leba</a>
        </span>
      </footer>
    </>
  );
}
