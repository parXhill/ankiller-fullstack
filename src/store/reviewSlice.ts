import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Score = 'good' | 'hard' | 'bad';

interface ReviewState {
    scores: {
        [key: number]: Score;
    };
    completedCards: number;
    totalCards: number;
}

const initialState: ReviewState = {
    scores: {},
    completedCards: 0,
    totalCards: 0
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<{ id: number; score: Score }>) => {
            state.scores[action.payload.id] = action.payload.score;
            state.completedCards += 1;
        },
        setTotalCards: (state, action: PayloadAction<number>) => {
            state.totalCards = action.payload;
        },
        resetReview: (state) => {
            state.scores = {};
            state.completedCards = 0;
            state.totalCards = 0;
        }
    }
});

export const { setScore, setTotalCards, resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;