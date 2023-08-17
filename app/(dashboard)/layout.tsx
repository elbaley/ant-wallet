import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="dashboardLayout" className="">
      <Sidebar />
      <div id="dashboardContentSafe" className="ml-24">
        Dashboard Layout
        {children}
      </div>
    </div>
  );
}
