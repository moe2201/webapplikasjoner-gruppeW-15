"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Shared/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryList } from "@/components/home/CategoryList";
import {Login} from "@/components/auth/Login";
export function Home() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  if (isLoading) {
    return null; 
  }
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }
  
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl px-8 pt-6 flex justify-end">
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Logg ut
        </button>
      </div>
      <main className="mx-auto max-w-4xl px-8 py-24 font-sans">
        <h1 className="text-center text-4xl font-bold text-gray-900">Velkommen til vår bookingportal</h1>
        <HeroSection />
        <CategoryList />
      </main>
    </>
  );
}
