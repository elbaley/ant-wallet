"use client";
interface SidebarProps {}
import clsx from "clsx";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarIcons, sidebarLinks } from "@/lib/sidebarLinks";
import Logo from "./Logo";
const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="sm:visible invisible flex flex-col h-screen w-24 fixed bg-white dark:bg-darkPrimary rounded-tr-[1.25rem] rounded-br-[1.25rem] pt-10 mr-24 dark:border-r dark:border-y dark:border-black overflow-scroll">
      <Logo />
      <hr className="w-[70px] mx-auto border-stone-300 dark:border-zinc-900 mt-7" />
      <div
        id="sidebar__container"
        className="flex-1 flex flex-col gap-9 items-center mt-8 "
      >
        {sidebarLinks.map((link) => {
          const Icon: IconType = sidebarIcons[link.icon];
          const isActive = pathname === link.href;
          const isSettings = link.label === "Settings";
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`cursor-pointer ${isSettings && "mt-auto mb-8 "}`}
            >
              <Icon
                size={28}
                className={clsx(
                  isActive
                    ? "text-sidebarBtn-active dark:text-dark-sidebarBtn-active"
                    : "text-sidebarBtn-inactive dark:text-dark-sidebarBtn-inactive",
                )}
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
