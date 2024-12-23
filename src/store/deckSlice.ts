import { createSlice } from '@reduxjs/toolkit';
import { Card } from '@prisma/client';


const getInitialSelectedDeck = () => {
  if (typeof window !== 'undefined') {  // Check if we're in the browser
    const saved = localStorage.getItem('selectedDeck');
    return saved ? JSON.parse(saved) : {id: 0};
  }
  return {id: 0};
};

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    selectedDeck: getInitialSelectedDeck(),
    selectedCards: [] as Card[],
    },
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
      // Save to localStorage when updating
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedDeck', JSON.stringify(action.payload));
      }
    },
    clearSelectedDeck: (state) => {
      state.selectedDeck = {id: 0};
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedDeck');
      }
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

export const { clearSelectedDeck, setSelectedDeck, toggleSelectedCards, clearSelectedCards } = deckSlice.actions;

export default deckSlice.reducer;