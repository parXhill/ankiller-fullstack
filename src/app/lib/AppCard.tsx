'use client';

import React, { useState } from "react";
import { createCard } from "./actions";
import { create } from "domain";

// Define the Card type based on the schema
interface Card {
  id: number;
  deckId: number;
  deck?: { id: number; name: string }; // Example deck relation
  keyword: string;
  exemplar?: string;
  keywordTranslation?: string;
  exemplarTranslation?: string;
  targetLanguage?: string;
  lemmas?: string;
  dependencies?: string;
  aiGenerated: boolean;
  aiModel?: string;
  languageLevel?: string;
  numberOfKeywords?: number;
  exemplarSentenceLength?: number;
  keywordSignificance?: string;
  keywordGrammarFormat?: string;
  partOfSpeech?: string;
}

export default function AppCard(){

  const [card, setCard] = useState<Card | null>(null);

  const handleClick = (cardItem: any) => {
    setCard(cardItem);
    createCard(cardItem);
  }
    

  // Dummy data for the table
  const dummyCards: Card[] = [
    {
      id: 1,
      deckId: 1,
      deck: { id: 1, name: "french" },
      keyword: "Keyword1",
      exemplar: "Exemplar1",
      keywordTranslation: "Translation1",
      exemplarTranslation: "Exemplar Translation1",
      targetLanguage: "English",
      lemmas: "Lemma1",
      dependencies: "Dependency1",
      aiGenerated: true,
      aiModel: "Model1",
      languageLevel: "B2",
      numberOfKeywords: 3,
      exemplarSentenceLength: 15,
      keywordSignificance: "High",
      keywordGrammarFormat: "Noun",
      partOfSpeech: "Noun",
    },
    {
      id: 2,
      deckId: 1,
      deck: { id: 1, name: "french" },
      keyword: "Keyword2",
      exemplar: "Exemplar2",
      keywordTranslation: "Translation2",
      exemplarTranslation: "Exemplar Translation2",
      targetLanguage: "Spanish",
      lemmas: "Lemma2",
      dependencies: "Dependency2",
      aiGenerated: false,
      aiModel: "Model2",
      languageLevel: "C1",
      numberOfKeywords: 5,
      exemplarSentenceLength: 20,
      keywordSignificance: "Medium",
      keywordGrammarFormat: "Verb",
      partOfSpeech: "Verb",
    },
    {
      id: 3,
      deckId: 1,
      deck: { id: 1, name: "french" },
      keyword: "Keyword3",
      exemplar: "Exemplar3",
      keywordTranslation: "Translation3",
      exemplarTranslation: "Exemplar Translation3",
      targetLanguage: "French",
      lemmas: "Lemma3",
      dependencies: "Dependency3",
      aiGenerated: true,
      aiModel: "Model3",
      languageLevel: "A1",
      numberOfKeywords: 2,
      exemplarSentenceLength: 10,
      keywordSignificance: "Low",
      keywordGrammarFormat: "Adjective",
      partOfSpeech: "Adjective",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Card Table</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm uppercase tracking-wide">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Deck Name</th>
              <th className="p-4 text-left">Keyword</th>
              <th className="p-4 text-left">Exemplar</th>
              <th className="p-4 text-left">Translation</th>
              <th className="p-4 text-left">AI Generated</th>
              <th className="p-4 text-left">Language Level</th>
            </tr>
          </thead>
          <tbody>
            {dummyCards.map((cardItem, index) => (
              <tr
                key={cardItem.id}
                className={`hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => handleClick(cardItem)}
              >
                <td className="p-4">{cardItem.id}</td>
                <td className="p-4">{cardItem.deck?.name}</td>
                <td className="p-4">{cardItem.keyword}</td>
                <td className="p-4">{cardItem.exemplar}</td>
                <td className="p-4">{cardItem.keywordTranslation}</td>
                <td className="p-4">{cardItem.aiGenerated ? "Yes" : "No"}</td>
                <td className="p-4">{cardItem.languageLevel}</td>
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
    </div>
  );
};

