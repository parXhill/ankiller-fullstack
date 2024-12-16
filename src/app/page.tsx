'use server';

import AppCard from './lib/AppCard';
import AppCardSkeleton from './ui/skeletons/AppCardSkeleton';
import { Suspense } from 'react';
import { getCardsFromUsersDeck, createUser, createDeck, getAllUsers } from "./lib/actions";
import { Card } from '@prisma/client';
import CreateDeckCard from './ui/createCards/CreateDeckCard';
import { auth } from 'auth';

export default async function Home() {

  const session = await auth();

  const user = session?.user;

  const userId = user?.id ?? 'None';


  const cards: any = await getCardsFromUsersDeck("alex", "french");



  return (
    <div>
      <Suspense fallback={<AppCardSkeleton/>}>
        <CreateDeckCard createDeck={createDeck} userId={userId}/>
      </Suspense>
      
      <Suspense fallback={<AppCardSkeleton/>}>
        <AppCard cards={cards} />
      </Suspense>
    </div>
  );
}

