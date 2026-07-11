import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { createGallery } from "@/api/gallery";

const categories = [
  "Architecture",
  "Interior",
  "Construction",
  "Commercial",
  "Residential",
  "Renovation",
  "Design",
  "Other",
];

export default function GalleryForm({
  refresh,
}: {
  refresh: () => void;
}) {
  const [title, setTitle] = useState("");

  const [category, setCategory] =
    useState("Architecture");

  const [customCategory, setCustomCategory] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!image) return;

    const fd = new FormData();

    fd.append("title", title);

    fd.append(
      "category",
      category === "Other"
        ? customCategory
        : category
    );

    fd.append("image", image);

    await createGallery(fd);

    setTitle("");

    setCategory("Architecture");

    setCustomCategory("");

    setImage(null);

    setPreview("");

    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow"
    >
      <h2 className="mb-5 text-xl font-bold">
        Upload Image
      </h2>

      <input
        className="mb-4 w-full rounded border p-3"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="mb-4 w-full rounded border p-3"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {category === "Other" && (
        <input
          className="mb-4 w-full rounded border p-3"
          placeholder="Custom Category"
          value={customCategory}
          onChange={(e) =>
            setCustomCategory(e.target.value)
          }
        />
      )}

      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => {
          if (!e.target.files?.[0]) return;

          setImage(e.target.files[0]);

          setPreview(
            URL.createObjectURL(
              e.target.files[0]
            )
          );
        }}
      />

      {preview && (
        <img
          src={preview}
          className="mb-4 h-60 w-full rounded object-cover"
        />
      )}

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 text-white">
        <UploadCloud />

        Upload Image
      </button>
    </form>
  );
}