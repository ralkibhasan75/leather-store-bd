"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UploadCloud, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/utils/uploadToCloudinary";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";

export default function ProductCreateForm() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const router = useRouter();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setGallery((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnail(file);
    setThumbPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!thumbnail) return toast.error("Thumbnail is required");

    toast.dismiss();
    toast.loading("Uploading images...");
    setLoading(true);

    try {
      const thumbUrl = await uploadToCloudinary(thumbnail, () => {});
      const galleryUrls: string[] = [];

      for (let i = 0; i < gallery.length; i++) {
        const file = gallery[i];
        const url = await uploadToCloudinary(file, (percent) =>
          setProgressMap((prev) => ({ ...prev, [i]: percent }))
        );
        galleryUrls.push(url);
      }

      // ✅ Safe runtime check
      if (!(e.target instanceof HTMLFormElement)) {
        toast.error("Form not submitted correctly");
        return;
      }

      const formData = new FormData(e.target);
      formData.append("thumbnailUrl", thumbUrl);
      formData.append("description", description);
      galleryUrls.forEach((url) => formData.append("galleryUrls", url));
      formData.append("tags", JSON.stringify(tags));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("category", category);
      const res = await fetch("/api/admin/products/create", {
        method: "POST",
        body: formData,
      });

      toast.dismiss();

      const data = await res.json();

      if (res.ok) {
        toast.success("Product created successfully");
        router.push("/dashboard/admin/products");
      } else {
        toast.error(data?.error || "Failed to create product");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error("Upload failed: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!["belt", "shoe"].includes(category)) setSizes([]);
  }, [category]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-6 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            name="title"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Brand</label>
          <input name="brand" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Model</label>
          <input name="model" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Category</label>
          <select
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="wallet">Wallet</option>
            <option value="belt">Belt</option>
            <option value="shoe">Shoe</option>
          </select>
        </div>

        {["belt", "shoe"].includes(category) && (
          <div>
            <label className="block mb-1 text-sm font-medium">
              Sizes (comma-separated)
            </label>
            <input
              onChange={(e) =>
                setSizes(
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="e.g. 40, 41, 42"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Discount (%)</label>
          <input
            name="discount"
            type="number"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Coupon Code</label>
          <input
            name="couponCode"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <RichTextEditor content={description} onChange={setDescription} />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Tags (comma-separated)
        </label>
        <input
          onChange={(e) =>
            setTags(
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            )
          }
          placeholder="e.g. leather,handmade,men"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="text-sm font-medium">Thumbnail</label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleThumbnailChange(e.target.files?.[0] || null)}
            className="w-full border rounded px-3 py-2"
          />
          {thumbPreview && (
            <Image
              src={thumbPreview}
              alt="Thumbnail"
              width={80}
              height={80}
              className="rounded border"
            />
          )}
        </div>
      </div>

      {/* Gallery Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed border-gray-400 p-6 text-center rounded-lg"
      >
        <UploadCloud className="mx-auto text-gray-500 mb-2" />
        <p className="text-gray-600 text-sm">Drag & drop gallery images here</p>
        <p className="text-gray-400 text-xs mt-1">
          Or select from file input below
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setGallery((prev) => [...prev, ...files]);
            setGalleryPreviews((prev) => [
              ...prev,
              ...files.map((f) => URL.createObjectURL(f)),
            ]);
          }}
          className="mt-3 w-full text-sm border rounded px-3 py-2"
        />
      </div>

      {/* Gallery Thumbnails */}
      {galleryPreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {galleryPreviews.map((url, idx) => (
            <div key={idx} className="relative">
              <Image
                src={url}
                alt=""
                width={100}
                height={100}
                className="rounded"
              />
              {progressMap[idx] !== undefined && progressMap[idx] < 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all"
                    style={{ width: `${progressMap[idx]}%` }}
                  ></div>
                </div>
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                onClick={() => {
                  setGallery((prev) => prev.filter((_, i) => i !== idx));
                  setGalleryPreviews((prev) =>
                    prev.filter((_, i) => i !== idx)
                  );
                }}
              >
                <Trash2 size={12} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Checkboxes */}
      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="isFeatured" className="accent-brand" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked
            className="accent-brand"
          />
          Active
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 bg-[var(--color-brand)] text-white px-6 py-2 rounded hover:opacity-90 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4z"
            ></path>
          </svg>
        )}
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}
