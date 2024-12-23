'use client'

import { Deck } from '@prisma/client';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSelectedDeck  } from '@/store/deckSlice';
import { encodeId } from "@/app/lib/scrambleParameterId";


export default function ShowDecks({ decks }: { decks: Deck[]}) {

    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mt-10">Decks</h1>
        <div className="flex max-w-screen flex-wrap p-5 justify-center items-center gap-6">
            {decks.map((deck) => (
                
                    <div key={deck.id} className=
                    "group flex items-center justify-center border-2 min-w-60 min-h-80 border-gray-400 bg-white p-6 transition-all duration-300 ease-in-out hover:bg-slate-500 hover:text-white hover:text-2xl hover:border-slate-700">
                        <p className="font-bold text-center group-hover:hidden">{deck.title}</p>
                        <div className="flex-col gap-2 hidden group-hover:flex">
                            <Link
                            href={`/${encodeId(deck.id)}/editor/`}
                            onClick={() => dispatch(setSelectedDeck(deck))}>
                                <p className="cursor-pointer text-center text-black text-bold bg-blue-300 px-10 py-3 w-fill h-fill rounded-md">Edit</p>
                            </Link>
                            <Link
                            href={`/${encodeId(deck.id)}/review/`}
                            onClick={() => dispatch(setSelectedDeck(deck))}>
                            <p className="text-center text-black text-bold bg-blue-300 px-10 py-3 w-fill h-fill rounded-md">Review</p>  
                            </Link>
                        </div>
        
                    </div>
               
            ))}
        </div>
        <Link href='/createdeck/'><button className="bg-gray-700 text-white p-5 rounded-lg font-bold mt-4 hover:bg-gray-500 transition-all duration-300 ease-in-out focus:bg-slate-300 active:scale-95">Create Deck</button></Link>
        </div>
    );
}