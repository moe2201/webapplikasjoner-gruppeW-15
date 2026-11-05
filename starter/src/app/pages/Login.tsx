"use client";

import {useState, FormEvent} from "react";
import { authClient } from "@/lib/auth-client";
import {Navbar} from "@/components/Shared/Navbar";

export function Login() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result =
        mode === "login"
            ? await authClient.signIn.email({email, password})
            : await authClient.signUp.email({name, email, password});

    if (result.error) {
        const code = result.error.code;
        if (code === "INVALID_EMAIL_OR_PASSWORD") {
            setError("Ugyldig e-post eller passord. har du ikke bruker? Opprett en konto.");
        } else if (code === "EMAIL_ALREADY_EXISTS") {
            setError("E-postadressen er allerede i bruk. Vennligst logg inn.");
        } else if (code === "PASSWORD_TOO_SHORT") {
            setError("Passordet er for kort. Vennligst bruk minst 8 tegn.");
        } else {
            setError(result.error.message ?? "noe gikk galt");
        }
    } else {
        window.location.href = "/dashboard";
    }
};

return (
    <>
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">{mode === "login" ? "Logg inn" : "Registrer deg"}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                {mode === "register" && (
                    <input placeholder="Navn" value={name} onChange={(e) => setName(e.target.value)} required className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                )}
                <input placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} required className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" placeholder="Passord" value={password} onChange={(e) => setPassword(e.target.value)} required className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {mode === "login" ? "Logg inn" : "Registrer deg"}
                </button>
            </form>
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="mt-4 text-blue-500 hover:underline">
                {mode === "login" ? "Opprett en konto" : "Har du allerede en konto? Logg inn"}
            </button>
        </main>
    </>
);
}
