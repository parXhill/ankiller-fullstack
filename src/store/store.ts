import { configureStore } from '@reduxjs/toolkit';
import promptReducer from './promptSlice';
import deckReducer from './deckSlice'; 
import reviewReducer from './reviewSlice'; 

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
    deck: deckReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;