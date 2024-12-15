'use client'

import { useSelector, useDispatch } from 'react-redux';
import { Deck } from '../../assets/deckDummyData';
import { setSelectedDeck } from '../../../store/deckSlice';
import Link from 'next/link';


export default function DeckCard({deckData} : {deckData: Deck}) {

    const selectedDeck = useSelector((state: any) => state.deck.selectedDeck);
 
    const dispatch = useDispatch();


    return (
        <div onClick={()=> dispatch(setSelectedDeck(deckData) )} className="flex bg-blue-300 p-10 m-4 rounded-2xl hover:bg-slate-100 cursor-pointer text-center items-center justify-center">
            
            {
            selectedDeck && selectedDeck.id === deckData.id ?    (<div className="flex gap-x-2">
                <p>Review</p>
                <Link href='./uxtest/editor'><p>Browse</p></Link> 
                <p>Add</p>
                </div>)
                : 
                (<p>{deckData.title}</p>)
            
            } 
        </div>
    );
}