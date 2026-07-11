import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "@/components/admin/Sidebar";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("admin");
    if (data) {
      setAdmin(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 mt-28 flex-1 p-10">
        <h1 className="text-4xl font-bold">
          Welcome, {admin?.name || "Admin"} 👋
        </h1>

        <p className="mt-3 text-gray-500">
          Construction Admin Dashboard
        </p>
      </main>
    </div>
  );
}