import Navbar from "@/components/Navbar";
import ProfileMenu from "@/components/ProfileMenu";
import Sidebar from "@/components/Sidebar";
import { TransactionsContextProvider } from "@/context/transactionsProvider";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsContextProvider>
      <div id="dashboardLayout" className="">
        <Navbar />
        <ProfileMenu />
        <Sidebar />
        <div id="dashboardContentSafe" className="sm:ml-24 pt-16 sm:pt-12">
          {children}
        </div>
      </div>
    </TransactionsContextProvider>
  );
}
