
'use client'

import { useSession, signIn, signOut } from "next-auth/react"


export default function NavigationBar() {

    const { data: session } = useSession()

    if (session?.user?.name === "admin") {
        return <p>You are an admin, welcome!</p>
      };
     
    return (
        <nav className="bg-gray-800 text-white h-20 w-full flex items-center px-8">
          <div className="flex-1 text-xl font-bold">My App</div>
          <div>User: {session?.user?.name}</div>
          <div>
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      );
    }

  
    


  