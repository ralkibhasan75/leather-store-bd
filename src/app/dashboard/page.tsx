"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";

export default function DashboardPage() {
  const { user } = useAuth();

  const [summary, setSummary] = useState({
    productCount: 0,
    orderCount: 0,
    customerCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetch("/api/admin/summary")
        .then((res) => res.json())
        .then(setSummary)
        .catch(console.error);
    }

    if (user?.role === "client") {
      fetch("/api/orders/me")
        .then((res) => res.json())
        .then((data) => setRecentOrders(data.orders || []))
        .catch(console.error);
    }
  }, [user]);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl font-serif font-semibold">
        Welcome, {user?.name}
      </h1>

      {/* ADMIN DASHBOARD */}
      {user?.role === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <DashboardCard
            icon={<FiPackage />}
            label="Total Products"
            count={summary.productCount}
          />
          <DashboardCard
            icon={<FiShoppingBag />}
            label="Total Orders"
            count={summary.orderCount}
          />
          <DashboardCard
            icon={<FiUsers />}
            label="Total Customers"
            count={summary.customerCount}
          />
        </div>
      )}

      {/* CLIENT DASHBOARD */}
      {user?.role === "client" && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">My Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-600">You have no recent orders.</p>
          ) : (
            <ul className="space-y-3">
              {recentOrders.slice(0, 5).map((order: any) => (
                <li
                  key={order._id}
                  className="bg-white rounded px-4 py-4 shadow text-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium mb-1 text-gray-700">
                        {order.items.map((item: any, idx: number) => (
                          <span key={idx}>
                            {item.title} × {item.quantity}
                            {idx < order.items.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                      <p className="text-xs text-gray-500">
                        Ordered on:{" "}
                        {new Date(order.createdAt).toLocaleString("en-BD", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Payment: {order.payment.method}{" "}
                        {order.payment.trxId && `(TXN: ${order.payment.trxId})`}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        ৳{order.total}
                      </p>
                      <p
                        className={`text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function DashboardCard({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="bg-white p-6 rounded shadow flex items-center gap-4">
      <div className="text-3xl text-[var(--color-brand)]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{count}</p>
      </div>
    </div>
  );
}
