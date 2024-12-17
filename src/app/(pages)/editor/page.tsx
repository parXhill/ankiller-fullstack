'use client'

import React, { use } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

// Define the Deck and Card interfaces
interface Card {
  id: number;
  keyword: string;
  keywordTranslation: string;
  exemplar: string;
  exemplarTranslation: string;
}

interface Deck {
  id: number;
  title: string;
  cards: Card[];
}

export default function EditorPage() {
  // Fetch the selectedDeck from Redux state
  const selectedDeck: Deck = useSelector((state: any) => state.deck.selectedDeck);

  console.log('selectedDeck', selectedDeck)

  if (!selectedDeck) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">No deck selected</p>
      </div>
    );
  }

  return (
   
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{selectedDeck.title} Deck</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Keyword</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Translation</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Exemplar</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Exemplar Translation</th>
            </tr>
          </thead>
          {/* <tbody>
            {selectedDeck.cards.map((card) => (
              <tr key={card.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{card.id}</td>
                <td className="border border-gray-300 px-4 py-2">{card.keyword}</td>
                <td className="border border-gray-300 px-4 py-2">{card.keywordTranslation}</td>
                <td className="border border-gray-300 px-4 py-2">{card.exemplar}</td>
                <td className="border border-gray-300 px-4 py-2">{card.exemplarTranslation}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <Link href="/aigeneration">Generate AI Cards</Link>

    </div>
    );
  
}