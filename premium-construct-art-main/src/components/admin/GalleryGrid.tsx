import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { deleteGallery, getGallery } from "@/api/gallery";
import type { Gallery } from "@/types/gallery";
import EditGalleryModal from "./EditGalleryModal";

export default function GalleryGrid({
  refresh,
}: {
  refresh: number;
}) {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Gallery | null>(null);

  const fetchGallery = async () => {
    try {
      const res = await getGallery();
      setGallery(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [refresh]);

  const filtered = useMemo(() => {
    return gallery.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [gallery, search]);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this image?");

    if (!ok) return;

    await deleteGallery(id);

    fetchGallery();
  };

  if (loading)
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Gallery Images
        </h2>

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search..."
            className="rounded-lg border pl-10 pr-4 py-2"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filtered.map((item) => (

          <div
            key={item._id}
            className="overflow-hidden rounded-xl bg-white shadow"
          >

            <img
              src={item.image}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">

              <h3 className="font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.category}
              </p>

              <div className="mt-5 flex gap-3">

                <button
                  onClick={() => setSelected(item)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 text-white"
                >
                  <Pencil size={18} />

                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white"
                >
                  <Trash2 size={18} />

                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {selected && (
        <EditGalleryModal
          gallery={selected}
          close={() => setSelected(null)}
          refresh={() => {
            fetchGallery();
            setSelected(null);
          }}
        />
      )}
    </>
  );
}