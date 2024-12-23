'use client';

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { clearSelectedDeck } from '@/store/deckSlice';
import { useDispatch } from 'react-redux';

import Link from "next/link";


// Define the session type properly, allowing null
export default function NavigationBar(
) {

  const { data: session } = useSession();
  const dispatch = useDispatch();

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


  const handleSignOut = async () => {
    // Clear Redux state
    dispatch(clearSelectedDeck())
    
    // Clear localStorage
    localStorage.removeItem('selectedDeck')
    
    // Sign out
    await signOut()
}


  // Default case for logged-in user
  return (
    <nav className="bg-gray-800 text-white h-20 w-full flex items-center justify-between px-8">
      <Link href='/'><div tabIndex={0} className="flex-1 text-xl font-bold cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out">Ankiller</div></Link>
      <div className="p-5">{session.user?.name || "User"}</div>
      <div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}