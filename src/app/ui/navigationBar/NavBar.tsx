'use client';

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"


// Define the session type properly, allowing null
export default function NavigationBar(
) {

  const { data: session } = useSession()


  // If session is null or undefined
  if (!session) {
    return (
      <nav className="bg-gray-800 text-white h-20 w-full flex items-center px-8">
        <div className="flex-1 text-xl font-bold">Ankiller</div>
        <div>
          <button
            onClick={() => signIn()}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Sign In
          </button>
          <button
          onClick={() => signOut()}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
        </div>
      </nav>
    );
  }

  // Check if user is an admin
  if (session.user?.name === "admin") {
    return (
      <nav className="bg-gray-800 text-white h-20 w-full flex items-center px-8">
        <div className="flex-1 text-xl font-bold">Ankiller</div>
        <p>You are an admin, welcome!</p>
      </nav>
    );
  }

  // Default case for logged-in user
  return (
    <nav className="bg-gray-800 text-white h-20 w-full flex items-center px-8">
      <div className="flex-1 text-xl font-bold">Ankiller</div>
      <div className="p-5">{session.user?.name || "User"}</div>
      <div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}