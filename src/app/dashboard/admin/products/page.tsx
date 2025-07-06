"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { getOptimizedImage } from "@/lib/utils/getOptimizedImage";
import ShimmerImage from "@/components/ui/ShimmerImage";
import ProductTableSkeleton from "@/components/ui/ProductTableSkeleton";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { motion, AnimatePresence } from "framer-motion";

interface ProductType {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export default function AdminProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/admin/products/${productToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p._id !== productToDelete));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return toast.error("No products selected");

    setBulkModalOpen(true); // Open modal first
  };

  const confirmBulkDelete = async () => {
    try {
      const res = await fetch("/api/admin/products/delete-multiple", {
        method: "POST",
        body: JSON.stringify({ ids: selected }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete");

      setProducts((prev) => prev.filter((p) => !selected.includes(p._id)));
      setSelected([]);
      toast.success("Products deleted");
    } catch (err) {
      toast.error("Failed to delete products");
    } finally {
      setBulkModalOpen(false);
    }
  };
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p._id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Products</h2>
          <Link
            href="/dashboard/admin/add-product"
            className="bg-[var(--color-brand)] text-white px-4 py-2 rounded hover:opacity-90"
          >
            + Add Product
          </Link>
        </div>
      </div>
      <div className="flex justify-end mb-5">
        <button
          onClick={handleDeleteSelected}
          disabled={selected.length === 0}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Delete Selected ({selected.length})
        </button>
      </div>
      {loading ? (
        <ProductTableSkeleton />
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm border border-gray-200 rounded overflow-hidden">
            <thead className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selected.length === products.length}
                  />
                </th>
                <th className="px-4 py-2">Thumbnail</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <AnimatePresence>
                {products.map((p) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(p._id)}
                        onChange={() => toggleSelect(p._id)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <ShimmerImage
                        src={getOptimizedImage(p.thumbnail, 100, 100)}
                        alt={p.title}
                        width={80}
                        height={80}
                        className="rounded border"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium">{p.title}</td>
                    <td className="px-4 py-2 text-gray-700">৳{p.price}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2">
                      {p.isActive ? (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <Link
                        href={`/dashboard/admin/products/edit/${p._id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setProductToDelete(p._id);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
      />
      <ConfirmDeleteModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Selected Products"
        description={`Are you sure you want to delete ${selected.length} selected product(s)? This action is permanent.`}
      />
    </div>
  );
}
