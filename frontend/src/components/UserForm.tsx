"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import VesselSelect from "@/components/VesselSelect";


interface UserFormState {
  email: string;
  password: string;
  role: string;
  assignedVesselIds: string[];
}

export default function UserForm() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [vessels, setVessels] = useState<any[]>([]); // Store vessels list
  const [form, setForm] = useState<UserFormState>({
    email: "",
    password: "",
    role: "Crew",
    assignedVesselIds: []
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchVessels();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.users.list();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchVessels = async () => {
    try {
      const data = await api.vessels.list();
      setVessels(data);
    } catch (err) {
      console.error("Error fetching vessels:", err);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/user-edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.users.delete(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email) return "Email is required";
    if (!form.password) return "Password is required";
    return "";
  };

  // Handler for VesselSelect
  const handleVesselChange = (selectedIds: string[]) => {
    setForm({ ...form, assignedVesselIds: selectedIds });
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
      const newUser = await api.users.create(form);
      setUsers([...users, newUser]);
      setForm({
        email: "",
        password: "",
        role: "Crew",
        assignedVesselIds: [],
      });
    } catch (err: any) {
      setError(err.message || "Failed to add user");
      console.error("Error adding user:", err);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}



        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          placeholder="Email"
          type="email"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          placeholder="Password"
          type="password"
        />
        {/* Vessel Dropdown */}
        <VesselSelect vessels={vessels} handleChange={handleVesselChange} />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="crew">Crew</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </form>

      {/* Display Users */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Added Users</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border rounded p-4 bg-white shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p>{user.mobile}</p>
                <p className="text-sm">{user.summary}</p>
                <p className="text-sm font-medium">Role: {user.role}</p>
                {user.vesselId && (
                  <p className="text-sm text-gray-700">
                    Vessel ID: {user.vesselId?.name || user.vesselId}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {/* <button
                  onClick={() => handleEdit(user._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(user._id)}
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
  );
}
