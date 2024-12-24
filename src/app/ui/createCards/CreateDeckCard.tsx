'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import LoadingBar from '../loadingItems/loadingBar';


export default function CreateDeckCard({
  createDeck,
  userId,
}: {
  createDeck: (userId: string, deckName: string) => void;
  userId: string;
})  {

  const router = useRouter();

  const [deckName, setDeckName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateDeck = () => {

    if (deckName.trim() === '') {
      alert('Please enter a valid deck name');
      return;
    }
    setLoading(true);
    router.push("/");
    createDeck(userId, deckName); // Call createDeck with user ID and deck name
    setDeckName(''); // Clear the deck name input



  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mt-10">Create Deck</h1>
     
     
      { !loading &&

      <div className="flex flex-col items-center justify-center gap-4 mt-4 border bg-slate-200 p-8 rounded-lg">
      {/* <label className="block mb-2 font-bold">New Deck Name:</label> */}
      <input
        type="text"
        placeholder="Enter deck name..."
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className="border p-2 rounded mb-4 w-full "
      />
      
      <button
        onClick={handleCreateDeck}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Deck
      </button> 

      </div>}

      { loading && <LoadingBar/> }


  








    </div>
  );
}