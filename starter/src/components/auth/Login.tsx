"use client";

import { useState, FormEvent } from "react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Hent eksisterende brukere fra localStorage
    const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");

    if (isRegistering) {
      // Sjekk om e-posten allerede finnes
      const userExists = storedUsers.some((u: any) => u.email === email);
      if (userExists) {
        setError("Denne e-posten er allerede registrert. Prøv å logge inn.");
        return;
      } 

      // Registrer ny bruker
      const newUser = { email, password };
      storedUsers.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(storedUsers));
      
      localStorage.setItem("current_logged_in_user", email); 
      onLogin();
    } else {
      // Logg inn-sjekk
      const validUser = storedUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!validUser) {
        setError("Feil e-post eller passord. Registrer deg hvis du er ny!");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("current_logged_in_user", email);

      onLogin();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {isRegistering ? "Opprett ny konto" : "Logg inn"}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {isRegistering
            ? "Fyll ut opplysningene for å registrere deg."
            : "Skriv inn e-post og passord for å fortsette."}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-post</label>
            <input
              type="email"
              required
              placeholder="navn@eksempel.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-800 focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Passord</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-800 focus:border-purple-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 py-3 font-medium text-white hover:bg-purple-800 transition shadow"
          >
            {isRegistering ? "Registrer og logg inn" : "Logg inn"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {isRegistering ? "Har du allerede en konto?" : "Har du ikke konto?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="font-semibold text-purple-700 hover:underline"
          >
            {isRegistering ? "Logg inn her" : "Registrer deg her"}
          </button>
        </div>
      </div>
    </div>
  );
}