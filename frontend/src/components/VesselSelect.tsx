import { useState } from "react";

interface Vessel {
  _id: string;
  name: string;
  imo: string;
}

interface VesselProps {
    vessels: Vessel[];
    handleChange: (arry: string[]) => void
}

export default function VesselSelect({ vessels, handleChange }: VesselProps) {
  const [selectedVessels, setSelectedVessels] = useState<string[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    let updatedList: string[];
    if (selectedVessels.includes(value)) {
      // Remove if already selected
      updatedList = selectedVessels.filter((id) => id !== value);
    } else {
      // Add if not selected
      updatedList = [...selectedVessels, value];
    }

    setSelectedVessels(updatedList);
    handleChange(updatedList); // send array to parent
  };

   const removeVessel = (id: string) => {
    const updatedList = selectedVessels.filter((vid) => vid !== id);
    setSelectedVessels(updatedList);
    handleChange(updatedList);
  };

  return (
    <div>
      <label>Select Vessel(s):</label>
      <select
        multiple
        value={selectedVessels}
        onChange={handleSelect}
        className="border rounded px-3 py-2"
        size={vessels.length > 5 ? 5 : vessels.length} // optional: show 5 rows
      >
        {vessels.map((vessel) => (
          <option key={vessel._id} value={vessel._id}>
            {vessel.name} ({vessel.imo})
          </option>
        ))}
      </select>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedVessels.map((id) => {
          const vessel = vessels.find((v) => v._id === id);
          if (!vessel) return null;
          return (
            <div
              key={id}
              className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
            >
              <span>
                {vessel.name} ({vessel.imo})
              </span>
              <button
                type="button"
                onClick={() => removeVessel(id)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
