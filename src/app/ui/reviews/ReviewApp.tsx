'use client'

import { RootState } from '@/store/store';
import { useState, useEffect } from 'react';
import { Card } from '@prisma/client';
import { useDispatch, useSelector } from 'react-redux';
import { setScore, setTotalCards, resetReview } from '@/store/reviewSlice';
import { ReviewCard, prepareReviewSession } from '@/app/lib/flashcardLogic';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import StatisticsGraph from './StatisticsGraph';
import { set } from 'zod';

interface ReviewAppProps {
    cards: Card[];
}

const ReviewApp: React.FC<ReviewAppProps> = ({ cards }) => {
    const dispatch = useDispatch();
    const [reviewCards, setReviewCards] = useState<ReviewCard[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const completedCards = useSelector((state: RootState) => state.review.completedCards);
    const totalCards = useSelector((state: RootState) => state.review.totalCards);
    const fullReviewState = useSelector((state: RootState) => state.review);

    const router = useRouter();

    console.log('fullReviewState', fullReviewState);

    useEffect(() => {
        const initializeReview = async () => {
            const prepared = await prepareReviewSession(cards);
            setReviewCards(prepared);
            dispatch(setTotalCards(cards.length));
        };
        initializeReview();
    }, [cards, dispatch]);

    const handleCardClick = () => {

        if (isFlipped) {
            handleScore('good');}

        else{
            setIsFlipped(true);
        }
    };

    const handleScore = (score: 'good' | 'hard' | 'bad') => {
        dispatch(setScore({ id: reviewCards[currentCardIndex].id, score }));
        setIsFlipped(false);
        setCurrentCardIndex(prev => prev + 1);
    };

    const handleReturnToDeck = async () => {

        setLoading(true);
        dispatch(resetReview());
        router.push('/');
        
    }

    if (currentCardIndex >= reviewCards.length) {
        return (<>
        {/* <div className="flex flex-col items-center justify-center min-w-[60vw]"> */}
        <StatisticsGraph />
        <div className="flex flex-col items-center justify-center min-w-[60vw]">
            { loading ?  
            
            <div className="w-24 h-24 border-8 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            : 

            <button onClick={handleReturnToDeck} className="text-center px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">Return to Decks</button>
            
            }
        </div>
        </>)
        
        
    }
    const currentCard = reviewCards[currentCardIndex];

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedCards / totalCards) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    {completedCards} of {totalCards} cards reviewed
                </p>
            </div>

            {/* Card */}
            <motion.div
                className="w-full aspect-[3/2] cursor-pointer"
                onClick={handleCardClick}
            >
                <div className={`
                    w-full h-full rounded-xl shadow-lg p-8
                    flex items-center justify-center text-center
                    bg-white border-2 border-gray-200
                    transition-all duration-300
                    ${isFlipped ? 'bg-gray-50' : ''}
                `}>
                    <div className="text-xl">
                        {isFlipped ? currentCard.exemplarTranslation : currentCard.exemplar}
                    </div>
                </div>
            </motion.div>

            {/* Score Buttons */}
            <AnimatePresence>
                {isFlipped && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex justify-center gap-4 mt-6"
                    >
                        <button
                            onClick={() => handleScore('bad')}
                            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                            Again
                        </button>
                        <button
                            onClick={() => handleScore('hard')}
                            className="px-6 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                        >
                            Hard
                        </button>
                        <button
                            onClick={() => handleScore('good')}
                            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                            Good
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReviewApp;
