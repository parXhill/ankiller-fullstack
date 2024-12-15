'use server';

import DataCard from './DataCard';
import AppCard from './lib/AppCard';
import AppCardSkeleton from './ui/skeletons/AppCardSkeleton';
import { Suspense } from 'react';
import { getCardsFromUsersDeck } from "./lib/actions";
import { Card } from '@prisma/client';

export default async function Home() {
  const cards: any = await getCardsFromUsersDeck("alex", "french");


  return (
    <div>
      {/* <DataCard /> */}
      <Suspense fallback={<AppCardSkeleton />}>
        <AppCard cards={cards} />
      </Suspense>
    </div>
  );
}