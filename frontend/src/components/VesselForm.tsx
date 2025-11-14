"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import { run } from "node:test";

interface VesselFormState {
  name: string;
  imo: string;
  flag: string;
  type: "Cargo" | "Tanker"
  status: "Active" | "Maintenance";
  lastInspectionDate: string;
}

export default function VesselForm() {
  const router = useRouter();
  const [vessels, setVessels] = useState<any[]>([]);
  const [form, setForm] = useState<VesselFormState>({
    name: "",
    imo: "",
    flag: "",
    type: "Cargo",
    status: "Active",
    lastInspectionDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVessels();
  }, []);

  const fetchVessels = async () => {
    try {
      const data = await api.vessels.list();
      setVessels(data);
    } catch (error) {
      console.error("Error fetching vessels:", error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/vessel-edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vessel?")) return;
    try {
      await api.vessels.delete(id);
      await fetchVessels();
    } catch (error) {
      console.error("Error deleting vessel:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name) return "Vessel name is required";
    if (!form.imo) return "IMO is required";
    if (!form.flag) return "Flag is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const newVessel = await api.vessels.create(form);
      setVessels([...vessels, newVessel]);
      setForm({ name: "", imo: "", flag: "", type: "Cargo", status: "Active", lastInspectionDate: "" });
    } catch (error: any) {
      setError(error.message || "Failed to add vessel");
      console.error("Error adding vessel:", error);
    }
  };

  return (
    <div>
      <div className="max-w-3xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
              {error}
            </div>
          )}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Vessel Name"
          />
          <input
            name="imo"
            value={form.imo}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="IMO"
          />
          <input
            name="flag"
            value={form.flag}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Flag"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="Cargo">Cargo</option>
            <option value="Tanker">Tanker</option>
          </select>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Vessel
            </button>
          </div>
        </form>
      </div>

      {/* Display Vessels */}
      <div className="max-w-5xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
        <div className="mt-8">
          <h2 className="flex justify-center text-xl font-bold mb-4">Added Vessels</h2>
          <div className="space-y-4">
            {vessels.map((vessel) => (
              <div
                key={vessel._id}
                className="border rounded p-4 bg-white shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{vessel.name}</h3>
                  <p className="text-sm text-gray-600">IMO: {vessel.imo}</p>
                  <p className="text-sm text-gray-600">Flag: {vessel.flag}</p>
                  <p className="text-sm text-gray-600">Type: {vessel.type}</p>
                  <p className="text-sm text-gray-500">Status: {vessel.status}</p>
                  <p className="text-sm text-gray-500">Last Inspection: {vessel.lastInspectionDate ? new Date(vessel.lastInspectionDate).toLocaleDateString() : 'N/A'}</p>  
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(vessel._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vessel._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
