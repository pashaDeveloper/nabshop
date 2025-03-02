
"use client";

import React, { useState ,useEffect} from "react";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Down from "@/components/icons/Down";
import Link from "next/link";
import Logout from "@/components/icons/Logout";

const Dashboard = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);
  const [showMenu, setShowMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname();

  let routes = [];

  if (user?.userLevel === "verified") {
    routes = [
      {
        name: "پروفایل من",
        paths: [
          {
            name: "مشاهده پروفایل",
            path: "/dashboard/buyer/my-profile",
          },
          {
            name: "مشاهده خریدها",
            path: "/dashboard/buyer/my-purchases",
          },
        ],
      },
      {
        name: "سبد خرید من",
        paths: [
          {
            name: "مشاهده سبد خرید",
            path: "/dashboard/buyer/my-cart",
          },
          {
            name: "مشاهده لیست علاقه‌مندی‌ها",
            path: "/dashboard/buyer/my-wishlist",
          },
        ],
      },
      {
        name: "نظرات من",
        paths: [
          {
            name: "مشاهده نظرات",
            path: "/dashboard/buyer/my-reviews",
          },
        ],
      },
    ];
  }
  

  useEffect(() => {
    setIsClient(true); // فقط در سمت کلاینت اجرا می‌شود
  }, []);

  // فقط وقتی که isClient=true باشد، کامپوننت را رندر کنید
  if (!isClient) {
    return null; // یا یک لودر نمایش دهید
  }

  return (
    <main className="h-screen w-screen" dir="rtl">
      <section className="mx-auto dark:bg-slate-900 h-full flex flex-col gap-y-4 p-2">
        <nav className="border dark:border-gray-700 px-4 py-2 rounded flex justify-between items-center flex-row">
          {showMenu ? (
            <button
              type="button"
              className="border text-primary dark:border-gray-700 p-1 rounded-secondary md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className="border p-1 text-primary dark:border-gray-700 rounded-secondary md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}
          <div className="flex flex-col gap-y-0.5 md:items-start items-end">
            <h2 className="text-sm">{user?.name}</h2>
            <p className="text-xs">{user?.email}</p>
          </div>

          <button
            type="button"
            className="p-1 rounded-secondary border dark:border-gray-700 md:block hidden"
            title="خروج"
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.open("/", "_self");
            }}
          >
            <Logout />
          </button>
        </nav>

        <div className="grid grid-cols-12 gap-x-2 h-full overflow-hidden relative">
          <Sidebar />
          <div className="md:col-span-10 col-span-12 overflow-y-auto rounded">
            {children}
          </div>

          {showMenu && (
            <div className="absolute top-0 right-0 h-full overflow-y-auto w-3/4 bg-white dark:bg-slate-900 z-50 md:hidden">
              <div className="w-full h-full flex flex-col gap-y-4">
                {routes.map((route, index) => (
                  <div
                    key={index}
                    className="bg-slate-50/50 p-2 rounded flex flex-col gap-y-2"
                  >
                    <h2 className="flex flex-row justify-between items-center">
                      {route.name} <Down />
                    </h2>

                    <div className="flex flex-col gap-y-2 text-sm p-2 bg-slate-100/50 rounded">
                      {route.paths.map((path, index) => (
                        <Link
                          href={path.path}
                          key={index}
                          className={
                            "p-1 rounded flex flex-row gap-x-2" +
                            " " +
                            (pathname === path.path
                              ? "bg-purple-500 text-white"
                              : "bg-slate-200/50 text-black")
                          }
                        >
                          <span></span>
                          {path.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="flex flex-row justify-between items-center">
                  <Link
                    href="/"
                    className="text-sm bg-slate-50/50 p-2 rounded mt-auto flex flex-row gap-x-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
صفحه اصلی                  </Link>
                  <button
                    type="button"
                    className="p-0.5 rounded-secondary border block md:hidden"
                    title="Logout"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      window.open("/", "_self");
                    }}
                  >
                    <Logout />
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="border px-4 py-2 rounded flex justify-center items-center flex-row">
          <p className="text-xs">
          © {new Date().getFullYear()} تمام حقوق این صفحه نزد برنامه نویس محفوظ است.
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Dashboard;
