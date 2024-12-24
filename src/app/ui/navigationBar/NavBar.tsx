'use client';

import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { clearSelectedDeck } from '@/store/deckSlice';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "zod";



// Define the session type properly, allowing null
export default function NavigationBar(
) {

  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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


  const handleTitleClick = async () => { 
    setLoading(true);
    setTimeout(() => {setLoading(false)}, 2000);
    router.push('/')
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

      { loading ? 
      
      // Loading Spinner
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin">
      </div> : (

      <div onClick={handleTitleClick} className="text-xl font-bold cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out">Ankiller</div>
      )}
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