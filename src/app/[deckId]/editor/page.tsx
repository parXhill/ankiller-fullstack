import { getCardsFromUsersDeck } from "@/app/lib/actions";
import ShowCards from "@/app/ui/showCards/showCards";
import { Suspense } from "react";
import { auth } from 'auth';

export default async function EditorPage({ params }: { params: { deckId: string } }) {

const { deckId } = params;

console.log('deckIdfromParams:', deckId);

const selectedDeck = parseInt(deckId);

const session = await auth();
 
const userId = session?.user?.id ?? 'None';

console.log('sessionIneditor:', session);

const deck = await getCardsFromUsersDeck(selectedDeck, userId);

  return (
   
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <ShowCards deck={deck}/>
    </Suspense>
    </>
    );
  
}