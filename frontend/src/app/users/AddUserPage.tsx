import Navbar from "@/components/Navbar";
import UserForm from "@/components/UserForm";

export default function AddUserPage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex text-2xl font-bold justify-center">Add a New User</h1>
      <UserForm />
    </div>
  );
}