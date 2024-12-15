'use client';

import { useState } from 'react';

export type User = {
  id: number;
  name: string;
};

export default function CreateDeckCard({
  createDeck,
  users,
}: {
  createDeck: (userId: number, deckTitle: string) => void;
  users: User[];
}) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [deckName, setDeckName] = useState('');

  const handleCreateDeck = () => {
    if (!selectedUserId) {
      alert('Please select a user');
      return;
    }

    if (deckName.trim() === '') {
      alert('Please enter a valid deck name');
      return;
    }

    createDeck(selectedUserId, deckName); // Call createDeck with user ID and deck name
    setDeckName(''); // Clear the deck name input
  };

  return (
    <div className="p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create Deck</h1>

      <label className="block mb-2">Select User:</label>
      <select
        value={selectedUserId || ''}
        onChange={(e) => setSelectedUserId(Number(e.target.value))}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="" disabled>
          Select a user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

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