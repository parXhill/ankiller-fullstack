'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Card, Deck, User, Prisma } from '@prisma/client';
import { CardToSend } from '@/store/promptSlice';


export async function getDecksFromUserId(
  userId: string
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

// export async function createCard(cardItem: Card) {
//   try {
//     // Adjust the cardItem structure to match Prisma's expectations
//     const entry = await prisma.card.create({
//       data: {
//         deckId: cardItem.deckId, // Use the deck's id
//         keyword: cardItem.keyword,
//         exemplar: cardItem.exemplar,
//         keywordTranslation: cardItem.keywordTranslation,
//         exemplarTranslation: cardItem.exemplarTranslation,
//         targetLanguage: cardItem.targetLanguage,
//         lemmas: cardItem.lemmas,
//         dependencies: cardItem.dependencies,
//         aiGenerated: cardItem.aiGenerated,
//         aiModel: cardItem.aiModel,
//         languageLevel: cardItem.languageLevel,
//         numberOfKeywords: cardItem.numberOfKeywords,
//         exemplarSentenceLength: cardItem.exemplarSentenceLength,
//         keywordSignificance: cardItem.keywordSignificance,
//         keywordGrammarFormat: cardItem.keywordGrammarFormat,
//         partOfSpeech: cardItem.partOfSpeech,
//       },
//     });

//     console.log("Entry created on the server:", entry);
//     return entry;
//   } catch (error) {
//     console.log("Error creating entry:", error);
//   }};

export async function createCards(cards: CardToSend[]) {
  console.log("Cards to process:", cards);
  for (let cardItem of cards) {
    try {
      const entry = await prisma.card.create({
        data: cardItem,
      });
      console.log("Entry created on the server:", entry);
    } catch (error) {
      console.error("Error creating entry for card:", cardItem, error);
      // Optional: continue to next card without breaking the loop
    }
  }
}



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


export async function createDeck(userId: string, deckTitle: string) {
  
  // Add a deck for the user
  const deck = await prisma.deck.create({
    data: {
      title: deckTitle,
      userId: userId,
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

export async function getAllUsers(): Promise<User[]> {
  try {
    const data = await prisma.user.findMany();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function getUserIdFromEmail(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user?.id || null;
}