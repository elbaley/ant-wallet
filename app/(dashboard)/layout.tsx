import Navbar from "@/components/Navbar";
import ProfileMenu from "@/components/ProfileMenu";
import Sidebar from "@/components/Sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="dashboardLayout" className="">
      <Navbar />
      <ProfileMenu />
      <Sidebar />
      <div id="dashboardContentSafe" className="sm:ml-24 pt-16 sm:pt-12">
        {children}
      </div>
    </div>
  );
}
