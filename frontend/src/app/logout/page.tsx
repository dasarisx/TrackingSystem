"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    authContext.logout();
    router.replace("/login");
  }, [router]);
  return null;
}