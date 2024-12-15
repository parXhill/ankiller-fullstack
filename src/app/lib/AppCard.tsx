'use client';

import React, { useState } from "react";
import { getUserNameFromCard, getDecksFromUserId } from "./actions";
import { Card } from "@prisma/client";


export default function AppCard({cards}: {cards: Card[]}) {

  const [card, setCard] = useState<Card | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // User name to display

  const handleClick = (cardItem: any) => {
    const name = getUserNameFromCard(cardItem.id);    
  }
    

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Deck ID: {cards[0].deckId}</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm uppercase tracking-wide">
    
             
              <th className="p-4 text-left">Keyword</th>
              <th className="p-4 text-left">Translation</th>
              <th className="p-4 text-left">Exemplar</th>
              <th className="p-4 text-left">Exemplar Translation</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((cardItem, index) => (
              <tr
                key={cardItem.id}
                className={`hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => handleClick(cardItem)}
              >
                <td className="p-4">{cardItem.keyword}</td>
                <td className="p-4">{cardItem.keywordTranslation}</td>
                <td className="p-4">{cardItem.exemplar}</td>
                <td className="p-4">{cardItem.exemplarTranslation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {card && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Selected Card Details
          </h2>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
            {JSON.stringify(card, null, 2)}
          </pre>
        </div>
      )}
      <button onClick={() => getDecksFromUserId(2)}>Get Decks</button>
    </div>
  );
};

