
import { LibraryBig, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },

    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },

  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen text-gray-300 border-r border-gray-700 shadow-lg shadow-white ">
      <div className="p-5">
        {menuList.map((menu, i) => (
          <Link
            href={menu.path}
            key={i}
            className={`flex items-center gap-3 p-4 mb-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${path == menu.path && "bg-primary text-white"
              } `}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed w-64 px-4 bottom-7">
        <Link
          href="/dashboard"
          className="w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-none hover:text-white hover:shadow-md hover:shadow-purple-600 sm:w-auto">
          Create Form
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
