import { getCardsFromUsersDeck, getDeckFromDeckId } from "@/app/lib/actions";
import ShowCards from "@/app/ui/showCards/showCards";
import { Suspense } from "react";
import { auth } from 'auth';
import { decodeId } from "@/app/lib/scrambleParameterId";
import { get } from "http";

export default async function EditorPage({ params }: { params: { deckId: string } }) {

const { deckId } = params;

console.log('deckId in editor, should be encrypted:', deckId);


const selectedDeck = decodeId(deckId);

const session = await auth();
 
const userId = session?.user?.id ?? 'None';


const deckCards = await getCardsFromUsersDeck(selectedDeck, userId);

const deckObject = await getDeckFromDeckId(selectedDeck);

  return (
   
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <ShowCards deck={deckCards} deckTitle={deckObject.title}/>
    </Suspense>
    </>
    );
  
}