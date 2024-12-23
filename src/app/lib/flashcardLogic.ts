'use server'

import { Card } from '@prisma/client'

export type ReviewCard = {
    id: number;
    exemplar: string | null;
    exemplarTranslation: string | null;
    isFlipped: boolean;
    hasBeenReviewed: boolean;
}

export async function prepareReviewSession(cards: Card[]): Promise<ReviewCard[]> {
    // Shuffle the cards using Fisher-Yates algorithm
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    
    return shuffledCards.map(card => ({
        id: card.id,
        exemplar: card.exemplar,
        exemplarTranslation: card.exemplarTranslation,
        isFlipped: false,
        hasBeenReviewed: false
    }));
}