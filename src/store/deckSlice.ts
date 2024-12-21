import { createSlice } from '@reduxjs/toolkit';
import { Card } from '@prisma/client';

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    selectedDeck: {id: 0},
    importedDeck: null,
    selectedCards: [] as Card[],
    },
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },
    setImportedDeck: (state, action) => {
      state.importedDeck = action.payload;
    },
    toggleSelectedCards: (state, action) => {
      // Check if card exists

      const exists = state.selectedCards.some(card => card.keyword === action.payload.keyword);
  
      if (exists) {
          // Remove card if it already exists
          state.selectedCards = state.selectedCards.filter(card => card.keyword !== action.payload.keyword);
      } else {
          // Add the card if it does not exist
          state.selectedCards.push(action.payload);
      }
  },
  clearSelectedCards: (state) => {
    state.selectedCards = [];
}
}});

export const { setSelectedDeck, setImportedDeck, toggleSelectedCards, clearSelectedCards } = deckSlice.actions;

export default deckSlice.reducer;