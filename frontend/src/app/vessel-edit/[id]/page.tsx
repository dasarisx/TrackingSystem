"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../lib/api";  

export default function VesselEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vessel, setVessel] = useState<any>(null);
  const [error, setError] = useState("");

    useEffect(() => {
    async function fetchVessel() {
      try {
        console.log("Fetching vessel with ID:", id);
        const data = await api.vessels.getById(id as string);
        setVessel(data);
      } catch (err) {
        console.error("Failed to fetch vessel:", err);
        setError("Could not load vessel. Please try again.");
      }
    }
    fetchVessel();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");   
    try {
      await api.vessels.update(id as string, vessel);
      router.push("/vessels");
    } catch (err: any) {
      console.error("Failed to save vessel:", err);
      setError(err.message || "Could not save changes. Please try again.");
    }
    };

    if (!vessel) return <p className="text-center mt-6">Loading...</p>;
    return (
    <div className="max-w-3xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <h2 className="flex justify-center text-xl font-semibold mb-4">Edit Vessel</h2>
        {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
          {error}
        </div>  
        )}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
            <input
                type="text"
                value={vessel.name}
                onChange={e => setVessel({ ...vessel, name: e.target.value })}
                className="border rounded px-3 py-2"
                placeholder="Name"
            />
            <input
                type="text"
                value={vessel.imo}
                onChange={e => setVessel({ ...vessel, imoNumber: e.target.value })}
                className="border rounded px-3 py-2"
                placeholder="IMO Number"
            />
            <input
                type="text"
                value={vessel.flag} 
                onChange={e => setVessel({ ...vessel, flag: e.target.value })}
                className="border rounded px-3 py-2"
                placeholder="Flag"
            />
            <select
                value={vessel.status}
                onChange={e => setVessel({ ...vessel, status: e.target.value })} 
                className="border rounded px-3 py-2"
            >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
            </select>
            <select
                value={vessel.type}
                onChange={e => setVessel({ ...vessel, type: e.target.value })}
                className="border rounded px-3 py-2"
            >
                <option value="Cargo">Cargo</option>
                <option value="Tanker">Tanker</option>
            </select>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Save Changes    
            </button>
        </form>
    </div>
  );
} 
