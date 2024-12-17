'use server';

import AppCard from './lib/AppCard';
import AppCardSkeleton from './ui/skeletons/AppCardSkeleton';
import { Suspense } from 'react';
import { getCardsFromUsersDeck, createDeck, getDecksFromUserId } from "./lib/actions";
import { Card, Deck } from '@prisma/client';
import CreateDeckCard from './ui/createCards/CreateDeckCard';
import ShowDecks from './ui/showCards/showDecks';
import { auth } from 'auth';



export default async function Home() {

  
  const session = await auth();

  const user = session?.user;

  const userId = user?.id ?? 'None';

  const decks: Deck[] = await getDecksFromUserId(userId);

  const cards: Card[] = await getCardsFromUsersDeck("alex", "french");



  return (
    <div>
      <Suspense fallback={<AppCardSkeleton/>}>
        <ShowDecks decks={decks}/>
        <CreateDeckCard createDeck={createDeck} userId={userId}/>
      </Suspense>
      
      {/* <Suspense fallback={<AppCardSkeleton/>}>
        <AppCard cards={cards} />
      </Suspense> */}
    </div>
  );
};

