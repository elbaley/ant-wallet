interface HomePageProps {}
import CallToAction from "@/components/CallToAction";
import WalletCard from "@/components/WalletCard";
const HomePage = ({}: HomePageProps) => {
  return (
    <main className="pl-10 pt-9">
      <h1 className="pb-3">Wallet</h1>
      <WalletCard name="My Wallet" amount={268} />
      <CallToAction />
    </main>
  );
};

export default HomePage;
