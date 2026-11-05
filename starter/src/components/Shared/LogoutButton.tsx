"use client"

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/login";
    };

    return (
        <button
            onClick={handleLogout}className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
            Logg ut
        </button>
    );
}