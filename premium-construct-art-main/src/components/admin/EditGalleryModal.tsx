import { useState } from "react";
import { X } from "lucide-react";
import { updateGallery } from "@/api/gallery";
import type { Gallery } from "@/types/gallery";

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

export default function EditGalleryModal({
  gallery,
  close,
  refresh,
}: any) {
  const [title, setTitle] = useState(gallery.title);
  const [category, setCategory] = useState(gallery.category);
  const [image, setImage] = useState<File | null>(null);

  const save = async () => {
    const fd = new FormData();

    fd.append("title", title);

    fd.append("category", category);

    if (image) {
      fd.append("image", image);
    }

    await updateGallery(gallery._id, fd);

    refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-xl bg-white p-6">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Edit Gallery
          </h2>

          <button onClick={close}>
            <X />
          </button>

        </div>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
        >
          {categories.map((c) => (
            <option key={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
          className="mb-5"
        />

        <button
          onClick={save}
          className="w-full rounded-lg bg-orange-500 py-3 text-white"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}