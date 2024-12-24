import { getCardsFromUsersDeck, getDeckFromDeckId } from "@/app/lib/actions";
import ReviewApp from "@/app/ui/reviews/ReviewApp";
import ReviewSkeleton from "@/app/ui/skeletons/reviewSkeleton";
import { Suspense } from "react";
import { auth } from 'auth';
import { decodeId } from "@/app/lib/scrambleParameterId";

export default async function EditorPage({ params }: { params: { deckId: string } }) {

const { deckId } = params;

const selectedDeck = decodeId(deckId);

const session = await auth();
 
const userId = session?.user?.id ?? 'None';

const deckCards = await getCardsFromUsersDeck(selectedDeck, userId);


console.log('deck', deckCards);

  return (
   
    <>
    <Suspense fallback={<ReviewSkeleton/>}>
        {/* <h1 className="pt-10 text-3xl font-bold text-center">{deckObject.title}</h1> */}
        { deckCards.length === 0 ? <div>No Cards in this Deck</div> :
          <ReviewApp cards={deckCards}/>}
    </Suspense>
    </>
    );
  
}