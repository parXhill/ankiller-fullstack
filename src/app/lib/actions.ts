'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// export interface Card {
//   keyword: string;
//   deckId?: number;
//   deck?: Deck;
//   exemplar?: string;
//   keywordTranslation?: string;
//   exemplarTranslation?: string;
//   targetLanguage?: string;
//   lemmas?: string;
//   dependencies?: string;
//   aiGenerated: boolean;
//   aiModel?: string;
//   languageLevel?: string;
//   numberOfKeywords?: number;
//   exemplarSentenceLength?: number;
//   keywordSignificance?: string;
//   keywordGrammarFormat?: string;
//   partOfSpeech?: string;
// }

export async function getCardsFromUsersDeck(name: string, title: string) {
  try {
    const data = await prisma.card.findMany({
      where: {
        deck: {
          title,
          user: {
            name,
          },
        },
      },
      include: {
        deck: true, 
      },
    });

    console.log(`Filtered cards for ${name}'s ${title} deck:`, data);
    return data;
  } catch (error) {
    console.error("Error fetching cards for Lara's French deck:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
export async function deleteDataByKeyword(keyword: string) {
  try {
    const data = await prisma.ankillerTestData.deleteMany({
      where: {
        keyword: keyword,
      },
    });
    console.log('data in server:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function createCard(cardItem: any) {
  try {
    // Adjust the cardItem structure to match Prisma's expectations
    const entry = await prisma.card.create({
      data: {
        deckId: cardItem.deck.id, // Use the deck's id
        keyword: cardItem.keyword,
        exemplar: cardItem.exemplar,
        keywordTranslation: cardItem.keywordTranslation,
        exemplarTranslation: cardItem.exemplarTranslation,
        targetLanguage: cardItem.targetLanguage,
        lemmas: cardItem.lemmas,
        dependencies: cardItem.dependencies,
        aiGenerated: cardItem.aiGenerated,
        aiModel: cardItem.aiModel,
        languageLevel: cardItem.languageLevel,
        numberOfKeywords: cardItem.numberOfKeywords,
        exemplarSentenceLength: cardItem.exemplarSentenceLength,
        keywordSignificance: cardItem.keywordSignificance,
        keywordGrammarFormat: cardItem.keywordGrammarFormat,
        partOfSpeech: cardItem.partOfSpeech,
      },
    });

    console.log("Entry created on the server:", entry);
    return entry;
  } catch (error) {
    console.log("Error creating entry:", error);
  }};

export async function createUser() {
  // Add a new user
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      country: 'USA',
    },
  });

};

export async function createDeck(userId: number) {
  
  // Add a deck for the user
  const deck = await prisma.deck.create({
    data: {
      title: 'Spanish Flashcards',
      userId: userId, // Associate deck with the user
    },
  });

  console.log('User and Deck created:', userId, deck);

};