import Navbar from "@/components/Navbar";
import IssueForm from "@/components/IssuesForm";

export default function AddActivityPage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex text-2xl font-bold justify-center">Add a New Issue</h1>
      <IssueForm />
    </div>
  );
}