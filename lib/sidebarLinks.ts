import { IoGrid, IoHome, IoPerson, IoSettings } from "react-icons/io5";

interface SidebarLink {
  label: string;
  icon: keyof typeof sidebarIcons;
  href: string;
}
export const sidebarIcons = { IoHome, IoGrid, IoPerson, IoSettings };

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Home",
    icon: "IoHome",
    href: "/home",
  },
  {
    label: "Transactions",
    icon: "IoGrid",
    href: "/transactions",
  },
  {
    label: "Profile",
    icon: "IoPerson",
    href: "/profile",
  },
  {
    label: "Settings",
    icon: "IoSettings",
    href: "/settings",
  },
];
