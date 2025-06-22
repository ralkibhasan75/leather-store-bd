"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FiGrid,
  FiPackage,
  FiPlusSquare,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft,
} from "react-icons/fi";

const navLinkStyle = (active: boolean) =>
  `flex items-center gap-3 px-4 py-2 rounded-md transition text-sm font-medium ${
    active
      ? "bg-[var(--color-brand)] text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`;

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = user?.role === "admin";
  if (!user || user.role !== "admin") return null;

  const links = isAdmin
    ? [
        { name: "Dashboard", href: "/dashboard", icon: <FiGrid /> },
        {
          name: "Add Product",
          href: "/dashboard/admin/add-product",
          icon: <FiPlusSquare />,
        },
        {
          name: "Manage Products",
          href: "/dashboard/admin/products",
          icon: <FiPackage />,
        },
        {
          name: "Orders",
          href: "/dashboard/admin/orders",
          icon: <FiShoppingBag />,
        },
      ]
    : [];

  const handleMobileNavClick = () => setOpen(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 border rounded p-2  shadow mt-14"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed left-0 top-[64px]
          h-[calc(100vh-64px)]
           border-r z-50
          transition-transform transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        <div
          className={`${
            collapsed ? "p-4" : "p-6"
          } h-full flex flex-col justify-between`}
        >
          {/* Top: Collapse & Menu Title */}
          <div>
            {/* Collapse (desktop) */}
            {isAdmin && (
              <div className="hidden md:flex justify-end mt-10">
                <button
                  onClick={() => setCollapsed((prev) => !prev)}
                  className="text-gray-400 hover:text-black transition"
                >
                  <FiChevronLeft
                    className={`transform transition ${
                      collapsed ? "-rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Mobile Close */}
            <div className="md:hidden flex justify-between items-center mt-6">
              <h2 className="text-xl font-serif font-semibold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <FiX />
              </button>
            </div>

            {/* Admin Nav Links */}
            {isAdmin && (
              <nav className="flex flex-col space-y-2 mt-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileNavClick}
                    className={navLinkStyle(pathname === link.href)}
                  >
                    {link.icon}
                    {!collapsed && <span>{link.name}</span>}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
