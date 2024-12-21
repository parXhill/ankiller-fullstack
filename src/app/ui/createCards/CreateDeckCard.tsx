'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function CreateDeckCard({
  createDeck,
  userId,
}: {
  createDeck: (userId: string, deckName: string) => void;
  userId: string;
})  {

  const router = useRouter();

  const [deckName, setDeckName] = useState('');

  const handleCreateDeck = () => {

    if (deckName.trim() === '') {
      alert('Please enter a valid deck name');
      return;
    }
    createDeck(userId, deckName); // Call createDeck with user ID and deck name
    router.push("/");
    setDeckName(''); // Clear the deck name input

  };

  return (
    <div className="p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create Deck</h1>

      <label className="block mb-2">Enter Deck Name:</label>
      <input
        type="text"
        placeholder="Enter deck name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <button
        onClick={handleCreateDeck}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Deck
      </button>
    </div>
  );
}