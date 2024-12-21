'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Card, Deck, User } from '@prisma/client';
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
  deckId: number,
  userId: string
): Promise<Card[]> {
  try {
    const data = await prisma.card.findMany({
      where: {
        deckId: deckId,
        userId: userId,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch data");
  }
}

export async function deleteDataByKeyword(id: number) {
  try {
    const data = await prisma.card.deleteMany({
      where: {
        id: id,
      },
    });
    //console.log('data in server:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}


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



export async function getUserIdFromEmail(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user?.id || null;
}