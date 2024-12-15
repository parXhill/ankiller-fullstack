import { createSlice } from '@reduxjs/toolkit';
import { dummyDecks } from '@/app/assets/deckDummyData';

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    selectedDeck: null,
    importedDeck: null,
    dummyDecks: dummyDecks,
  },
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },
    setImportedDeck: (state, action) => {
      state.importedDeck = action.payload;
    },
    updateDummyDecks: (state, action) => {
      state.dummyDecks.push(action.payload);}
  },
});

export const { setSelectedDeck, setImportedDeck, updateDummyDecks } = deckSlice.actions;

export default deckSlice.reducer;