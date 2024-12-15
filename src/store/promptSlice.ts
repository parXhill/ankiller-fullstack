import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ParsedResponse {
  keywords: Array<{
    keyword: string;
    translation: string;
    exemplar_sentence: string;
    translation_sentence: string;
  }>;
}

export interface CardToSend {
  keyword: string;
  exemplar: string;
  keywordTranslation: string;
  exemplarTranslation: string;
  targetLanguage: string;
  aiGenerated: number; // Using number for boolean (SQLite compatibility)
  aiModel: string;
  languageLevel: string;
  numberOfKeywords: number;
  exemplarSentenceLength: number;
  keywordSignificance: string;
  keywordGrammarFormat: string;
  partOfSpeech: string;
}

export interface PromptState {
  inputMessage: string;
  parsedResponse: ParsedResponse | null;
  isLoading: boolean;
  selectedGroqModel: string;
  numberOfKeywords: number;
  targetLanguage: string;
  languageLevel: string;
  keywordSignificance: string;
  exemplarSentenceLength: number;
  keywordGrammarFormat: string;
  partOfSpeech: string;
  cardToSend: CardToSend;
}

export type UpdatePayload = {
  field: keyof CardToSend; // Ensures only valid keys are allowed
  value: string | number; // Allows both string and number values
};

const initialState: PromptState = {
  inputMessage: '',
  parsedResponse: null,
  isLoading: false,
  selectedGroqModel: 'llama3-70b-8192',
  numberOfKeywords: 5, // Default value, can be adjusted
  targetLanguage: '', // Default value, can be adjusted
  languageLevel: 'A2 - Elementary', // Default value, e.g., A1
  keywordSignificance: "Significance is based on the frequency of occurrence in the target language.", // Default value
  exemplarSentenceLength: 8, // Default value, e.g., 8 words
  keywordGrammarFormat: "Words must be converted to their standard uninflected grammatical form.", // Default value
  partOfSpeech: "Extract any part of speech as words.", // Default value
  cardToSend: {
    keyword: "",
    exemplar: "",
    keywordTranslation: "",
    exemplarTranslation: "",
    targetLanguage: "",
    aiGenerated: 1, // Number for boolean compatibility
    aiModel: "",
    languageLevel: "",
    numberOfKeywords: 5,
    exemplarSentenceLength: 8,
    keywordSignificance: "",
    keywordGrammarFormat: "",
    partOfSpeech: ""
  }
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setCardToSend: (state, action: PayloadAction<UpdatePayload>) => {
      const { field, value } = action.payload;
    
      // Cast state.cardToSend to CardToSend explicitly
     // const cardToSend = state.cardToSend as CardToSend;
    
      if (field in state.cardToSend) {
        (state.cardToSend[field as keyof CardToSend] as string | number) =
          typeof state.cardToSend[field as keyof CardToSend] === 'number'
            ? Number(value)
            : (value as string);
      }
    },
    setMultipleCardFields: (state, action: PayloadAction<Partial<CardToSend>>) => {
      state.cardToSend = {
        ...state.cardToSend,
        ...action.payload,
      };
    },
    setInputMessage: (state, action: PayloadAction<string>) => {
      state.inputMessage = action.payload;
    },
    setParsedResponse: (state, action: PayloadAction<ParsedResponse | null>) => {
      state.parsedResponse = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedGroqModel: (state, action: PayloadAction<string>) => {
      state.selectedGroqModel = action.payload;
      state.cardToSend.aiModel = action.payload;
    },
    setNumberOfKeywords: (state, action: PayloadAction<number>) => {
      state.numberOfKeywords = action.payload;
      state.cardToSend.numberOfKeywords = action.payload;
    },
    setTargetLanguage: (state, action: PayloadAction<string>) => {
      state.targetLanguage = action.payload;
      state.cardToSend.targetLanguage = action.payload;
    },
    setLanguageLevel: (state, action: PayloadAction<string>) => {
      state.languageLevel = action.payload;
      state.cardToSend.languageLevel = action.payload;
    },
    setKeywordSignificance: (state, action: PayloadAction<string>) => {
      state.keywordSignificance = action.payload;
      state.cardToSend.keywordSignificance = action.payload;
    },
    setExemplarSentenceLength: (state, action: PayloadAction<number>) => {
      state.exemplarSentenceLength = action.payload;
      state.cardToSend.exemplarSentenceLength = action.payload;
    },
    setKeywordGrammarFormat: (state, action: PayloadAction<string>) => {
      state.keywordGrammarFormat = action.payload;
      state.cardToSend.keywordGrammarFormat = action.payload;
    },
    setPartOfSpeech: (state, action: PayloadAction<string>) => {
      state.partOfSpeech = action.payload;
      state.cardToSend.partOfSpeech = action.payload; 
    },
  },
});

// Export actions and reducer
export const {
  setInputMessage,
  setParsedResponse,
  setIsLoading,
  setSelectedGroqModel,
  setNumberOfKeywords,
  setTargetLanguage,
  setLanguageLevel,
  setKeywordSignificance,
  setExemplarSentenceLength,
  setKeywordGrammarFormat,
  setPartOfSpeech,
  setCardToSend,
  setMultipleCardFields
} = promptSlice.actions;

export default promptSlice.reducer;