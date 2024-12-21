'use client'

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { get } from 'http';
import { useState, useEffect } from 'react';
import { deleteDataByKeyword } from '@/app/lib/actions';

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


export default function ShowCards({deck: initialDeck}: any){


  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  function handleEditCheckboxChange(event: any) {
    const id = Number(event.target.value);
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };    

  const handleDeleteClick = async () => {
    // Remove selected cards from the local state
    const updatedCards = deck.filter((card) => !selectedCards.includes(card.id));
    setDeck(updatedCards);

    // Delete cards from the server
    for (const id of selectedCards) {
      await deleteDataByKeyword(id); // Assuming this deletes the card on the server
    }

    // Clear the selection
    setSelectedCards([]);
  };

  useEffect(() => {
    console.log('Selected Cards:', selectedCards);
  }, [selectedCards]);

    return (<div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{initialDeck.title} Deck</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              
              <th className="border border-gray-300 px-4 py-2 text-left">Keyword</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Translation</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Exemplar</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Exemplar Translation</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {deck.map((card: Card) => (
              <tr key={card.id} className="even:bg-gray-50">
                
                <td className="border border-gray-300 px-4 py-2">{card.keyword}</td>
                <td className="border border-gray-300 px-4 py-2">{card.keywordTranslation}</td>
                <td className="border border-gray-300 px-4 py-2">{card.exemplar}</td>
                <td className="border border-gray-300 px-4 py-2">{card.exemplarTranslation}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                      <input 
                        type="checkbox" 
                        value={card.id}
                        onChange={handleEditCheckboxChange}/>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-between'>
      <Link href="/aigeneration">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Generate AI Cards</button>
      </Link>
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleDeleteClick}>Delete Selected Cards</button>
      </div>
    </div>)
};