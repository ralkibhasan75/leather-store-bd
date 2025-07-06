"use client";

import {
  FileText,
  Trash2,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  BadgeDollarSign,
  ClipboardList,
  PackageCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Order {
  _id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  payment: {
    method: string;
    trxId?: string;
  };
  total: number;
  status: string;
  createdAt: string;
  items?: {
    model: any;
    title: string;
    quantity: number;
    price: number;
    selectedSize?: string; // ✅ Added here
  }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders);
    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders();
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "DELETE",
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusBadge = (status: string) => {
    const base =
      "text-xs font-medium px-3 py-1 rounded-full inline-block text-center shadow-sm";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "Confirmed":
        return `${base} bg-blue-100 text-blue-800`;
      case "Delivered":
        return `${base} bg-green-100 text-green-800`;
      case "Cancelled":
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-gray-200 text-gray-700`;
    }
  };

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          All Orders
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 bg-white text-sm px-3 py-1.5 rounded-md shadow-sm focus:outline-none"
        >
          {["All", "Pending", "Confirmed", "Delivered", "Cancelled"].map(
            (s) => (
              <option key={s}>{s}</option>
            )
          )}
        </select>
      </div>

      <div className="overflow-x-auto border rounded-xl shadow-md bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Placed</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">{idx + 1}</td>
                <td className="p-4 whitespace-nowrap">
                  <div className="font-semibold text-gray-800">
                    {order.customer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.customer.phone}
                    <br />
                    {order.customer.email}
                  </div>
                  {order.items?.some((item) => item.selectedSize) && (
                    <div className="mt-1 text-xs text-gray-500">
                      Sizes:{" "}
                      {order.items
                        ?.filter((item) => item.selectedSize)
                        .map((item) => item.selectedSize)
                        .join(", ")}
                    </div>
                  )}
                </td>

                <td className="p-4">
                  <div>{order.payment.method}</div>
                  {order.payment.trxId && (
                    <div className="text-xs text-gray-500">
                      TrxID: {order.payment.trxId}
                    </div>
                  )}
                </td>
                <td className="p-4 font-semibold text-gray-900 whitespace-nowrap">
                  ৳ {order.total.toFixed(2)}
                </td>
                <td className="p-4">
                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-4 flex gap-2 items-center whitespace-nowrap">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    title="View Details"
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <Eye size={16} />
                  </button>

                  {order.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(order._id, "Confirmed")}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(order._id, "Delivered")}
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        Deliver
                      </button>
                      <button
                        onClick={() => updateStatus(order._id, "Cancelled")}
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                    >
                      Deliver
                    </button>
                  )}

                  {["Delivered", "Cancelled"].includes(order.status) && (
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-xs text-gray-400 hover:text-red-600"
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Transition appear show={!!selectedOrder} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedOrder(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4 border-b pb-3">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-[var(--color-brand)]" />
                      <Dialog.Title className="text-lg font-bold">
                        Order Summary
                      </Dialog.Title>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {selectedOrder && (
                    <div className="space-y-5 text-sm text-gray-700">
                      {/* Customer Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                          <User className="w-4 h-4" />
                          Customer Info
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div>
                            <span className="font-medium">Name:</span>{" "}
                            {selectedOrder.customer.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {selectedOrder.customer.phone}
                          </div>
                          <div className="col-span-2 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {selectedOrder.customer.email}
                          </div>
                          <div className="col-span-2 flex items-start gap-1">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span>{selectedOrder.customer.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                          <CreditCard className="w-4 h-4" />
                          Payment
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div>
                            <span className="font-medium">Method:</span>{" "}
                            {selectedOrder.payment.method}
                          </div>
                          {selectedOrder.payment.trxId && (
                            <div>
                              <span className="font-medium">TrxID:</span>{" "}
                              {selectedOrder.payment.trxId}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status & Total */}
                      <div className="grid grid-cols-2 gap-x-4">
                        <div className="flex items-center gap-1">
                          <PackageCheck className="w-4 h-4" />
                          <span>
                            <span className="font-medium">Status:</span>{" "}
                            {selectedOrder.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BadgeDollarSign className="w-4 h-4" />
                          <span>
                            <span className="font-medium">Total:</span> ৳{" "}
                            {selectedOrder.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                          <ClipboardList className="w-4 h-4" />
                          Items
                        </h3>
                        <ul className="divide-y divide-gray-200 border rounded-md">
                          {selectedOrder.items?.map((item, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 flex justify-between items-start text-sm"
                            >
                              <div>
                                <div className="font-medium">{item.title}</div>
                                <div className="text-gray-500">
                                  Quantity: {item.quantity}
                                </div>
                                {item.model && (
                                  <div className="text-gray-500">
                                    Model: {item.model}
                                  </div>
                                )}
                                {item.selectedSize && (
                                  <div className="text-gray-500">
                                    Size:{" "}
                                    <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
                                      {item.selectedSize}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="font-medium text-right">
                                ৳ {(item.price * item.quantity).toFixed(2)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
