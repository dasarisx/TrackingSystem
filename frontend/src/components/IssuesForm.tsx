"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import { AuthContext } from "@/context/AuthContext";

interface IssueFormState {
  _id: string;
  category: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Resolved";
  vesselId: string;
  userId: string;
}

export default function IssueForm() {
  const router = useRouter();
  const [issues, setIssues] = useState<any[]>([]);
  const [vessels, setVessels] = useState<any[]>([]);
  
  const authContext = useContext(AuthContext);
  const [role, setRole] = useState<string | null>(null);
  const [form, setForm] = useState<IssueFormState>({
    _id:"",
    category: "",
    description: "",
    priority: "Low",
    status: "Open",
    vesselId: "",
    userId: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if(authContext.user?.role === "Admin"){
      setRole(authContext.user?.role)
    }
    fetchIssues();
    fetchVessels();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await api.issues.list();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const fetchVessels = async () => {
    try {
      const data = await api.vessels.list();
      console.log(data)
      setVessels(data);
    } catch (error) {
      console.error("Error fetching vessels:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const validateForm = () => {
    if (!form.vesselId) return "VesselId is required";
    if (!form.category) return "Category is required";
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
      const newIssue = await api.issues.create(form);
      setIssues([...issues, newIssue]);
      setForm({ 
        _id: "",
        category: "",
        description: "",
        priority: "Low",
        status: "Open",
        vesselId: "",
        userId: "", 
      });
    } catch (error: any) {
      setError(error.message || "Failed to add issue");
      console.error("Error adding issue:", error);
    }
  };

  const handleResolve = async (issue: IssueFormState ) => {
    console.log(issue)
    issue.status = "Resolved";
    const updatedIssue = await api.issues.update(issue._id, issue);
    setIssues(prevIssues =>
      prevIssues.map(i =>
        i._id === updatedIssue._id ? updatedIssue : i
      )
    );
  }

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
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Category"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            name="vesselId"
            value={form.vesselId}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Select a vessel</option>
            {vessels.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name} ({v.imo})
              </option>
            ))}
          </select>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Description"
          />
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Issue
            </button>
          </div>
        </form>
      </div>

      {/* Display Issues */}
      <div className="max-w-5xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
        <div className="mt-8">
          <h2 className="flex justify-center text-xl font-bold mb-4">Added Issues</h2>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="border rounded p-4 bg-white shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{issue._id}</h3>
                  <p className="text-sm text-gray-600">IMO: {issue.vesselId.imo}</p>
                  <p className="text-sm text-gray-600">User: {issue.userId.email}</p>
                  <p className="text-sm text-gray-600">Category: {issue.category}</p>
                  <p className="text-sm text-gray-600">Description: {issue.description}</p>
                  <p className="text-sm text-gray-600">Priority: {issue.priority}</p>
                  <p className="text-sm text-gray-600">Status: {issue.status}</p>
                  <p>{issue.description}</p>
                </div>
                <div className="flex gap-2">
                  
                  {role === "Admin" && (
                  <button
                    onClick={() => handleResolve(issue)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Reslove
                  </button>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
