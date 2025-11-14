import Navbar from "@/components/Navbar";
import VesselForm from "@/components/VesselForm";


export default function AddVesselPage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex text-2xl font-bold justify-center">Add a New Vessel</h1>
      <VesselForm />
    </div>
  );
}