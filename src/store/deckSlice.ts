import { createSlice } from '@reduxjs/toolkit';
import { Card } from '@prisma/client';

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    selectedDeck: {id: 0},
    selectedCards: [] as Card[],
    },
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },

    toggleSelectedCards: (state, action) => {

      const exists = state.selectedCards.some(card => card.keyword === action.payload.keyword);
  
      if (exists) {
          state.selectedCards = state.selectedCards.filter(card => card.keyword !== action.payload.keyword);
      } else {
          state.selectedCards.push(action.payload);
      }
  },
  clearSelectedCards: (state) => {
    state.selectedCards = [];
}
}});

export const { setSelectedDeck, toggleSelectedCards, clearSelectedCards } = deckSlice.actions;

export default deckSlice.reducer;