import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import GalleryForm from "@/components/admin/GalleryForm";
import GalleryGrid from "@/components/admin/GalleryGrid";
import { Images } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const [refresh, setRefresh] = useState(0);

  const reload = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-72 min-h-screen">

        {/* Header */}
        <div className="sticky top-0 z-20 border-b bg-white px-10 py-6 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-orange-500 p-3 text-white">
              <Images size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Gallery Management
              </h1>

              <p className="text-gray-500">
                Upload, Edit and Delete Gallery Images
              </p>
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="space-y-10 p-10">

          {/* Upload Form */}
          <GalleryForm refresh={reload} />

          {/* Gallery Grid */}
          <GalleryGrid refresh={refresh} />

        </div>

      </main>
    </div>
  );
}