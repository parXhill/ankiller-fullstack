'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Card, User, Deck }from '@prisma/client';



export async function getDecksFromUserId(
  userId: number
): Promise<Deck[]> {
  try {
    const data = await prisma.deck.findMany({
      where: {
          userId: userId
        },
    });
    console.log('deck data:', data);
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch data");
  }
}




export async function getCardsFromUsersDeck(
  name: string,
  title: string
): Promise<Card[]> {
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
    });

    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch data");
  }
}

export async function deleteDataByKeyword(keyword: string) {
  try {
    const data = await prisma.card.deleteMany({
      where: {
        deckId: 1,
      },
    });
    //console.log('data in server:', data);
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



export async function createUser(userName: string) {
  // Add a new user

try {
  const user = await prisma.user.create({
    data: {
      name: userName,
      country: 'USA',
    },
  });

  console.log('User created successfully:', user);
  return user;

} catch (error) {
  console.error('Error creating user:', error);
  throw new Error('Failed to create user');
}
};


export async function createDeck(userId: number, deckTitle: string) {
  
  // Add a deck for the user
  const deck = await prisma.deck.create({
    data: {
      title: deckTitle,
      userId: userId, // Associate deck with the user
    },
  });

  console.log('User and Deck created:', userId, deck);

};


//test to find username from card

export async function getUserNameFromCard(cardId: number): Promise<string | null> {
  const card = await prisma.card.findUnique({
    where: {
      id: cardId, // Use the card ID to look up the card
    },
    include: {
      deck: {
        include: {
          user: true, // Include the associated user of the deck
        },
      },
    },
  });

  // If card or associated user is not found, return null
  console.log('card:', card?.deck.user.name);
  return card?.deck?.user?.name || null;
}