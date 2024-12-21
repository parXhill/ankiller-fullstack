'use client'

import { Deck } from '@prisma/client';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSelectedDeck  } from '@/store/deckSlice';
import { encodeId } from "@/app/lib/scrambleParameterId";


export default function ShowDecks({ decks }: { decks: Deck[]}) {

    const dispatch = useDispatch();

    return (
        <div className="bg-red-300 flex p-5 justify-center items-center gap-6">
            {decks.map((deck) => (
                <Link
                    key={deck.id}
                    href={`/${encodeId(deck.id)}/editor/`}
                    onClick={() => dispatch(setSelectedDeck(deck))} // Dispatch Redux action
                >
                    <div className="bg-red-500 p-6 cursor-pointer hover:bg-violet-400">
                        <p className="font-bold">{deck.title}</p>
                    </div>
                </Link>
            ))}
            <Link href='/createdeck/'><button>Create a new deck</button></Link>
        </div>
    );
}