'use server';

import AppCard from './lib/AppCard';
import AppCardSkeleton from './ui/skeletons/AppCardSkeleton';
import { Suspense } from 'react';
import { getCardsFromUsersDeck, createUser, createDeck, getAllUsers } from "./lib/actions";
import { Card } from '@prisma/client';
import CreateUserCard from './ui/createCards/CreateUserCard';
import CreateDeckCard from './ui/createCards/CreateDeckCard';

export default async function Home() {

  const users = await getAllUsers();

  const cards: any = await getCardsFromUsersDeck("alex", "french");



  return (
    <div>
      <CreateUserCard createUser={createUser} />

      <Suspense fallback={<AppCardSkeleton/>}>
        <CreateDeckCard createDeck={createDeck} users={users}/>
      </Suspense>
      
      <Suspense fallback={<AppCardSkeleton/>}>
        <AppCard cards={cards} />
      </Suspense>
    </div>
  );
}

