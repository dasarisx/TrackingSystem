"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from '@/context/AuthContext';

export default function Navbar() {
  // const [role, setRole] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  // useEffect(() => {
    // const storedUser = localStorage.getItem("user");
    // console.log("Stored user in Navbar:", storedUser);
    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
      // setRole(user.role);
    // }
    
    // setRole(authContext.user?.role);
  // }, []);

  

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex gap-6">
      
      <Link href="/issues">Issues</Link>
      
      {/* Hide these for 'crew' and vessel*/}
      {authContext.user?.role !== "Crew" && (
        <>          
          <Link href="/vessels">Vessels</Link>
          <Link href="/users">Users</Link>
        </>
      )}
      <Link href="/logout">Logout</Link>
    </nav>
  );
}
