import CreateDeckCard from '@/app/ui/createCards/CreateDeckCard';
import { auth } from "auth";

import { createDeck } from '@/app/lib/actions';
export default async function CreateDeckPage() {

   const session = await auth()

   if (!session || !session.user) {
    return <p>You must be logged in to create a deck.</p>;
  }

   const userId: any = session.user.id

    return (
        <>
        <CreateDeckCard createDeck={createDeck} userId={userId}/>
        </>
    );
}   