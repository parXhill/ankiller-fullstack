'use client';

import { useState } from 'react';

export default function CreateUserCard({ createUser }: { createUser: (name: string) => void}) {
  const [name, setName] = useState(''); // State to track the user name input

  const handleCreateUser = () => {
    if (name.trim() === '') {
      alert('Please enter a valid name'); // Handle empty input
      return;
    }

    createUser(name); // Call createUser function with the name input
    setName(''); // Clear the input field
  };

  return (
    <div className="p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create User Card</h1>
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update state on input change
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleCreateUser}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create User
      </button>
    </div>
  );
}