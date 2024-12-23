import { getCardsFromUsersDeck, getDeckFromDeckId } from "@/app/lib/actions";
import ReviewApp from "@/app/ui/reviews/ReviewApp";
import { Suspense } from "react";
import { auth } from 'auth';
import { decodeId } from "@/app/lib/scrambleParameterId";

export default async function EditorPage({ params }: { params: { deckId: string } }) {

const { deckId } = params;

const selectedDeck = decodeId(deckId);

const session = await auth();
 
const userId = session?.user?.id ?? 'None';

const deckCards = await getCardsFromUsersDeck(selectedDeck, userId);

const deckObject = await getDeckFromDeckId(selectedDeck);

console.log('deck', deckCards);

  return (
   
    <>
    <Suspense fallback={<div>Loading...</div>}>
        {/* <h1 className="pt-10 text-3xl font-bold text-center">{deckObject.title}</h1> */}
        <ReviewApp cards={deckCards}/>
    </Suspense>
    </>
    );
  
}