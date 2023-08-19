import Sidebar from "@/components/Sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="dashboardLayout" className="">
      <Sidebar />
      <div id="dashboardContentSafe" className="sm:ml-24">
        {children}
      </div>
    </div>
  );
}
