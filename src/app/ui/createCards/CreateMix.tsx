'use client'

import { useState, useEffect } from 'react';
import { Card } from '@prisma/client';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Deck } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { setSelectedDeck } from '@/store/deckSlice';
import { useRouter } from 'next/navigation';

type CardWithDeck = Card & {
    deck: {
      title: string;
    };
  };


interface MixerProps {
    cards: CardWithDeck[];
}

interface DeckSelection {
    deckId: number | null;
    percentage: number;
    title: string | null;
}




const CreateDeckMix: React.FC<MixerProps> = ({ cards }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [totalCards, setTotalCards] = useState<number>(10);
    const [deckSelections, setDeckSelections] = useState<DeckSelection[]>([
        { deckId: null, title: null, percentage: 50 },
        { deckId: null, title: null, percentage: 50 },
    ]);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const availableDecks = Array.from(new Set(cards.map(card => card.deckId)))
        .map(deckId => ({
            id: deckId,
            title: cards.find(card => card.deckId === deckId)?.deck.title || `Deck ${deckId}`,
            cardCount: cards.filter(card => card.deckId === deckId).length
        }));

    // Add new deck slot
    const addDeckSlot = () => {
        if (deckSelections.length >= 4) return;
        
        const newPercentage = Math.floor(100 / (deckSelections.length + 1));
        const remainder = 100 - (newPercentage * (deckSelections.length + 1));
        
        // Redistribute percentages evenly
        const newSelections = deckSelections.map(selection => ({
            ...selection,
            percentage: newPercentage
        }));
        
        // Add new slot
        newSelections.push({ deckId: null, title: null, percentage: newPercentage + remainder });
        setDeckSelections(newSelections);
    };

    const handleDeckSelect = (index: number, deckId: number, title: string) => {
        const newSelections = [...deckSelections];
        newSelections[index].deckId = deckId;
        newSelections[index].title = title;
        setDeckSelections(newSelections);
        setActiveDropdown(null);
    };

    const handlePercentageChange = (index: number, value: number) => {
        const newSelections = [...deckSelections];
        const oldValue = newSelections[index].percentage;
        const difference = value - oldValue;
        
        // Calculate total of other percentages
        const otherTotal = newSelections.reduce((sum, sel, i) => 
            i !== index ? sum + sel.percentage : sum, 0);
        
        // Adjust other percentages proportionally
        newSelections.forEach((selection, i) => {
            if (i !== index) {
                const proportion = selection.percentage / otherTotal;
                selection.percentage = Math.max(0, selection.percentage - (difference * proportion));
            }
        });
        
        newSelections[index].percentage = value;
        
        // Round all percentages and adjust for rounding errors
        let total = 0;
        newSelections.forEach(selection => {
            selection.percentage = Math.round(selection.percentage);
            total += selection.percentage;
        });
        
        // Adjust last non-changed percentage to make total exactly 100
        if (total !== 100) {
            const lastIndex = newSelections.findIndex((sel, i) => i !== index);
            if (lastIndex !== -1) {
                newSelections[lastIndex].percentage += (100 - total);
            }
        }
        
        setDeckSelections(newSelections);
    };

    const createMixedDeck = () => {
        setIsCreating(true);
    
        try {
            // Filter out unselected deck slots
            const activeSelections = deckSelections.filter(selection => selection.deckId !== null);
            
            // Calculate number of cards needed from each deck
            const deckCardCounts = activeSelections.map(selection => ({
                deckId: selection.deckId!,
                cardCount: Math.round((selection.percentage / 100) * totalCards)
            }));
    
            // Adjust for rounding errors to ensure total cards matches exactly
            const totalCalculatedCards = deckCardCounts.reduce((sum, deck) => sum + deck.cardCount, 0);
            if (totalCalculatedCards !== totalCards) {
                const difference = totalCards - totalCalculatedCards;
                deckCardCounts[0].cardCount += difference; // Add/subtract difference from first deck
            }
    
            // Get random cards from each deck according to proportions
            const selectedCards = deckCardCounts.flatMap(({ deckId, cardCount }) => {
                const deckCards = cards.filter(card => card.deckId === deckId);
                
                // Shuffle deck cards
                const shuffled = [...deckCards].sort(() => Math.random() - 0.5);
                
                // Take required number of cards
                return shuffled.slice(0, cardCount);
            });
    
            // Create the mixed deck object
            const mixedDeck: Card[] = selectedCards;
    
            console.log('Created mixed deck:', mixedDeck);
            console.log('Total cards:', mixedDeck.length);
            console.log('Distribution:', deckCardCounts);

            dispatch(setSelectedDeck(mixedDeck));
            router.push('/deckmix/review');
            
    
            // Here you would typically save this to your database
            // await saveMixedDeck(mixedDeck);
    
            return mixedDeck;
    
        } catch (error) {
            console.error('Error creating mixed deck:', error);
            // Handle error appropriately
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">Create Mixed Deck</h1>
                <p className="text-gray-600">Select decks and adjust their proportions</p>
            </div>

            {/* Card count selector */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    Total cards in mixed deck
                </label>
                <input
                    type="range"
                    min="5"
                    max="50"
                    value={totalCards}
                    onChange={(e) => setTotalCards(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center font-medium text-blue-600">
                    {totalCards} cards
                </div>
            </div>

            {/* Deck Selection with Percentages */}
            <div className="space-y-4">
                {deckSelections.map((selection, index) => (
                    <div key={index} className="relative">
                        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                            <div className="relative flex-1">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                    className={`
                                        w-full px-4 py-2 text-left rounded-lg border-2
                                        flex items-center justify-between
                                        ${selection.deckId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                                        hover:border-blue-300 transition-colors duration-200
                                    `}
                                >
                                    <span>
                                        {selection.deckId 
                                            ? `${selection.title}`
                                            : 'Select a deck'}
                                    </span>
                                    <ChevronDownIcon className="w-5 h-5" />
                                </button>

                                {activeDropdown === index && (
                                    <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                                        {availableDecks
                                            .filter(deck => !deckSelections.some(s => s.deckId === deck.id))
                                            .map(deck => (
                                                <button
                                                    key={deck.id}
                                                    onClick={() => handleDeckSelect(index, deck.id, deck.title)}
                                                    className="w-full px-4 py-2 text-left hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span>{deck.title}</span>
                                                        <span className="text-sm text-gray-500">
                                                            {deck.cardCount} cards
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-48 flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={selection.percentage}
                                    onChange={(e) => handlePercentageChange(index, Number(e.target.value))}
                                    disabled={!selection.deckId}
                                    className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="w-12 text-right text-sm font-medium text-gray-600">
                                    {Math.round(selection.percentage)}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Deck Button */}
                {deckSelections.length < 4 && (
                    <button
                        onClick={addDeckSlot}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl
                            text-gray-500 hover:border-blue-300 hover:text-blue-500
                            transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Another Deck
                    </button>
                )}
            </div>

            {/* Create button */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={createMixedDeck}
                    disabled={!deckSelections.some(s => s.deckId !== null) || isCreating}
                    className={`
                        px-8 py-3 rounded-lg font-medium text-white
                        transition-all duration-200
                        ${deckSelections.some(s => s.deckId !== null)
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-400 cursor-not-allowed'}
                    `}
                >
                    {isCreating ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                            <span>Creating...</span>
                        </div>
                    ) : (
                        'Create Mixed Deck'
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateDeckMix;