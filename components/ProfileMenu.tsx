"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiLogOut } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { signout } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sidebarIcons, sidebarLinks } from "@/lib/sidebarLinks";
import { IconType } from "react-icons";
import { useUser } from "@/context/authProvider";
function ProfileMenu() {
  const router = useRouter();
  const { setUser } = useUser();
  return (
    <div className="fixed sm:absolute right-0 mr-4 z-50 mt-1">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <img
              className="h-12 rounded-full"
              src="https://i.pravatar.cc/200?img=5"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-darkSecondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {sidebarLinks
                .filter((link) => link.href !== "/profile")
                .map((link) => {
                  const Icon: IconType = sidebarIcons[link.icon];
                  return (
                    <Menu.Item key={link.label + "-profile-menu"}>
                      <Link className="sm:hidden" href={link.href}>
                        <button className="hover:bg-gray-400 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
                          <Icon className="mr-2 h-5 w-5 text-black dark:text-white" />
                          {link.label}
                        </button>
                      </Link>
                    </Menu.Item>
                  );
                })}
              <Menu.Item>
                <Link href="/profile">
                  <button className="hover:bg-gray-400 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
                    <IoPerson className="mr-2 h-5 w-5 text-black dark:text-white" />
                    Profile
                  </button>
                </Link>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  onClick={async () =>
                    await signout().then(() => {
                      // remove the user from the localStorage
                      setUser(null);
                      router.replace("/");
                    })
                  }
                  className="hover:bg-gray-400 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                >
                  <BiLogOut className="mr-2 h-5 w-5 text-black dark:text-white" />
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
