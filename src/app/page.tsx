'use server';

import { Suspense } from 'react';
import { getDecksFromUserId } from "./lib/actions";
import { Deck } from '@prisma/client';
import ShowDecks from './ui/showCards/showDecks';
import { auth } from 'auth';



export default async function Home() {

  const session = await auth();

  const user = session?.user;

  const userId = user?.id ?? 'None';

  const decks: Deck[] = await getDecksFromUserId(userId);
    
  console.log('decks', decks)

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        { userId === 'None' ? <></> :<ShowDecks decks={decks}/>}
      </Suspense>
      
 
    </div>
  );
};

