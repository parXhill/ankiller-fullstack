import { getAllCardsFromUser } from "@/app/lib/actions";
import { auth } from 'auth';
import { Suspense } from "react";
import CreateDeckMix from "@/app/ui/createCards/CreateMix";

export default async function MixPage() {

    const session = await auth()

    const userId = session?.user?.id ?? 'None';

    const cards = await getAllCardsFromUser(userId);

    console.log(cards)

    return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
        <CreateDeckMix cards={cards} />
    </Suspense>
    </>
    );
}