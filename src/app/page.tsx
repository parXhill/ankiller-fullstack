'use server';

import AppCardSkeleton from './ui/skeletons/AppCardSkeleton';
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
      <Suspense fallback={<AppCardSkeleton/>}>
        
        { userId === 'None' ? <></> :<ShowDecks decks={decks}/>}
      </Suspense>
      
 
    </div>
  );
};

