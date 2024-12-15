import { configureStore } from '@reduxjs/toolkit';
import promptReducer from './promptSlice'; // Import the counter slice
import deckReducer from './deckSlice'; // Import the counter slice

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
    deck: deckReducer // Add the counter reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;