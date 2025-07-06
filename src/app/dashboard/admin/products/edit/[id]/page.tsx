"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UploadCloud, Trash2, ArrowLeft } from "lucide-react";
import { uploadToCloudinary } from "@/lib/utils/uploadToCloudinary";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string>("");
  const [gallery, setGallery] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  // Fetch product
  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.product) return toast.error("Product not found");
        const p = data.product;
        setProduct(p);
        setDescription(p.description || "");
        setTags(p.tags || []);
        setThumbPreview(p.thumbnail);
        setGalleryPreviews(p.images || []);
        setCategory(p.category || "");
        setSizes(p.sizes || []);
      });
  }, [id]);

  const handleThumbnailChange = (file: File | null) => {
    setThumbFile(file);
    if (file) setThumbPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setGallery((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (["belt", "shoe"].includes(category) && sizes.length === 0) {
      return toast.error("Sizes are required for belt and shoe categories.");
    }
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let thumbnailUrl = thumbPreview;
      if (thumbFile) {
        thumbnailUrl = await uploadToCloudinary(thumbFile, () =>
          setProgressMap((prev) => ({ ...prev, thumbnail: 100 }))
        );
      }

      const galleryUrls: string[] = [];
      for (let i = 0; i < gallery.length; i++) {
        const file = gallery[i];
        const url = await uploadToCloudinary(file, (percent) =>
          setProgressMap((prev) => ({ ...prev, [i]: percent }))
        );
        galleryUrls.push(url);
      }

      const payload = {
        title: formData.get("title"),
        description,
        brand: formData.get("brand"),
        model: formData.get("model"),
        category,
        price: Number(formData.get("price")),
        discount: Number(formData.get("discount") || 0),
        couponCode: formData.get("couponCode"),
        stock: Number(formData.get("stock")),
        tags,
        sizes,
        isFeatured: formData.get("isFeatured") === "on",
        isActive: formData.get("isActive") !== null,
        thumbnail: thumbnailUrl,
        images: galleryUrls.length ? galleryUrls : product.images,
      };

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Product updated");
      router.push("/dashboard/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto ">
      <button
        onClick={() => router.push("/dashboard/admin/products")}
        className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black hover:underline mb-4"
      >
        <ArrowLeft size={16} />
        Back to Product List
      </button>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "title",
            "brand",
            "model",
            "price",
            "discount",
            "couponCode",
            "stock",
          ].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-sm font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={field}
                defaultValue={product[field]}
                type={
                  field === "price" || field === "discount" || field === "stock"
                    ? "number"
                    : "text"
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category"
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
                value={sizes.join(",")}
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
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <RichTextEditor content={description} onChange={setDescription} />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Tags (comma-separated)
          </label>
          <input
            defaultValue={tags.join(",")}
            onChange={(e) =>
              setTags(
                e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              )
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="text-sm font-medium">Thumbnail</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleThumbnailChange(e.target.files?.[0] || null)
              }
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

        {/* Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full border-2 border-dashed border-gray-400 p-6 text-center rounded-lg"
        >
          <UploadCloud className="mx-auto text-gray-500 mb-2" />
          <p className="text-gray-600 text-sm">
            Drag & drop gallery images here
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
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={product.isFeatured}
              className="accent-brand"
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={product.isActive}
              className="accent-brand"
            />
            Active
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-[var(--color-brand)] text-white px-6 py-2 rounded hover:opacity-90 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
