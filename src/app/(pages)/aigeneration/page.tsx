'use client';

import Groq from 'groq-sdk';
import { sampleTexts } from '@/app/assets/sampleTexts';


import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from  '@/store/store';
import { ParsedResponse } from '@/store/promptSlice';
import { createCard, getUserIdFromEmail } from '@/app/lib/actions';

import { Card } from '@prisma/client'
import { CardToSend } from '@/store/promptSlice';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';



import { setInputMessage,
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
   } from '@/store/promptSlice';




export default function Home() {


const dispatch = useDispatch<AppDispatch>();
const session = useSession();
console.log('Session', session);

const [userId, setUserId] = useState('none');



useEffect(() => {
  const email = session.data?.user?.email ?? 'None';

  // Handle the async function safely
  getUserIdFromEmail(email)
      .then((result) => setUserId(result || 'none'))
      .catch(() => setUserId('none'));
}, [session.data?.user?.email]);


const selectedDeck = useSelector((state: RootState) => state.deck.selectedDeck);
console.log('selected deck', selectedDeck)





  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });



const inputMessage = useSelector((state: RootState) => state.prompt.inputMessage);
const parsedResponse = useSelector((state: RootState) => state.prompt.parsedResponse);
const isLoading = useSelector((state: RootState) => state.prompt.isLoading);
const selectedGroqModel = useSelector((state: RootState) => state.prompt.selectedGroqModel);  
const targetLanguage = useSelector((state: RootState) => state.prompt.targetLanguage);
const languageLevel = useSelector((state: RootState) => state.prompt.languageLevel);
const keywordSignificance = useSelector((state: RootState) => state.prompt.keywordSignificance);
const exemplarSentenceLength = useSelector((state: RootState) => state.prompt.exemplarSentenceLength);
const keywordGrammarFormat = useSelector((state: RootState) => state.prompt.keywordGrammarFormat);
const partOfSpeech = useSelector((state: RootState) => state.prompt.partOfSpeech);
const numberOfKeywords = useSelector((state: RootState) => state.prompt.numberOfKeywords);
const cardToSend = useSelector((state: RootState) => state.prompt.cardToSend);

console.log('parsed response', parsedResponse)






const significanceSettings = {
  "Relevance to text": "Significance is based on the relevance to the main theme or topic of the given text.",
  "Frequency of occurrence": "Significance is based on the frequency of occurrence in the target language.",
  "Usefulness of learning": `Significance is based on the usefulness of the word for a ${languageLevel} student of the target language.`
};

const grammarFormats = {
  "Inflected forms": "Words must be in the grammatical form they appear in the given text.",
  "Dictionary forms": "Words must be converted to their standard uninflected grammatical form. E.g. singular, nominative, infinitive, etc.",
};

const partOfSpeechOptions = {
  "Any": "Extract any part of speech.",
  "Noun": "Only extract nouns.",
  "Verb": "Only extract verbs .",
  "Adjective": "Only extract adjectives.",
  "Adverb": "Only extract adverbs.",
  "Preposition": "Only extract prepositions.",
  "Idiom": "Only extract idioms as the words.",
  "Phrasal verbs": "Only extract phrasal verb combinations as the words.",
};

const cefrLevelArray = [
  { label: 'A1 - Beginner', value: 'A1 - Beginner'},
  { label: 'A2 - Elementary', value: 'A2 - Elementary'},
  { label: 'B1 - Intermediate', value: 'B1 - Intermediate' },
  { label: 'B2 - Upper Intermediate', value: 'B2 - Upper Intermediate' },
  { label: 'C1 - Advanced', value: 'C1 - Advanced'},
  { label: 'C2 - Proficient', value: 'C2 - Proficient'},
];




const groqModels = [
    "distil-whisper-large-v3-en",
    "gemma2-9b-it",
    "gemma-7b-it",
    "llama3-groq-70b-8192-tool-use-preview",
    "llama3-groq-8b-8192-tool-use-preview",
    "llama-3.1-70b-versatile",
    "llama-3.1-70b-specdec",
    "llama-3.1-8b-instant",
    "llama-3.2-1b-preview",
    "llama-3.2-3b-preview",
    "llama-3.2-11b-vision-preview",
    "llama-3.2-90b-vision-preview",
    "llama-guard-3-8b",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "mixtral-8x7b-32768",
    "whisper-large-v3",
    "whisper-large-v3-turbo"
  ];



  const fullMessage = `
  
STRICTLY RESPOND ONLY IN JSON, with no other text.
### Task Overview:
Your task is to extract key words from a given text, to formulate exemplar sentences for those words, translate them, and and format it into a JSON object. Follow the steps below carefully to ensure accurate output.

### Step-by-Step Instructions:
1. **Extract key words**:
   - Identify the ${numberOfKeywords} most significant words at a ${languageLevel} level from the given ${targetLanguage} text.
   - ${keywordSignificance}
   - ${partOfSpeech}
   - The words must not be proper nouns.
   - ${keywordGrammarFormat}

2. **Provide Translations**:
   - For each word, provide the most common single-word translation.
   - If no single-word translation exists, use the closest common equivalent.
3. **Generate Exemplar Sentences**:
   - For each keyword, create a simple exemplar sentence of ${exemplarSentenceLength} words or less that showcases that word's most standard use in the target language.
   - Exemplar sentences should be created in isolation to showcase the standard word use- they should not relate to the given text.
   - Exemplar sentences should present the word in its most typical semantic and syntactic usage.
   - Exemplar sentences should make the word meaning clear.
   - Exemplar sentences should make the word the most prominent word.
   - Exemplar sentences must be grammatically correct and use standard semantics.


4. **Translate Sentences**:
   - Provide an English translation for each exemplar sentence.


5. **Format the Output in JSON**:
   - Return the information in the following schema:
   {
  "keywords": [
    {
      "keyword": "{Insert the extracted word here}",
      "keywordTranslation": "{Provide the most common translation here}",
      "exemplar": "{Generate a simple exemplar sentence of ${exemplarSentenceLength} words or less using the word that showcases the most standard use of the word in the target language}",
      "exemplarTranslation": "{Translate the exemplar sentence into English here}"
    },
    ...
  ]
}

Given text: ${inputMessage}`;




  async function getGroqChatCompletion(): Promise<void> {
    dispatch(setIsLoading(true));
    
    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: 'system', content: fullMessage }], 
        model: selectedGroqModel,
      });

      const jsonString = response.choices[0]?.message?.content ?? '';
      if (!jsonString) {
        throw new Error('Response content is empty or null.');
      }

      const jsonObject: ParsedResponse = JSON.parse(jsonString);
      console.log('Parsed Response:', jsonObject);

      let generatedCardsArray: CardToSend[] = [];

      for (const keyword of jsonObject.keywords) {
        const cardTemplate: CardToSend = {
            userId: userId,
            deckId: selectedDeck.id ?? 0,
            keyword: keyword.keyword,
            exemplar: keyword.exemplar,
            keywordTranslation: keyword.keywordTranslation,
            exemplarTranslation: keyword.exemplarTranslation,
            targetLanguage: targetLanguage,
            lemmas: 'none',
            dependencies: 'none',
            aiGenerated: true,
            aiModel: selectedGroqModel,
            languageLevel: languageLevel,
            numberOfKeywords: numberOfKeywords,
            exemplarSentenceLength: exemplarSentenceLength,
            keywordSignificance: keywordSignificance,
            keywordGrammarFormat: keywordGrammarFormat,
            partOfSpeech: partOfSpeech
        };
        generatedCardsArray.push(cardTemplate)
      }

      const parsedResponse: ParsedResponse = {
        keywords: generatedCardsArray,
    };
      dispatch(setParsedResponse(parsedResponse));
    
      // createCard(cardTemplate);

    } catch (error) {
      console.error('Error fetching Groq chat completion:', error);
      dispatch(setParsedResponse(null));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Response Checker</h1>

        {/* Model Selector */}
        <p>Select a model</p>
        <select
          value={selectedGroqModel}
          onChange={(e) => dispatch(setSelectedGroqModel(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a model
          </option>
          {groqModels.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>

        {/* Input Message */}
        <p>Source text</p>
        <div className="w-full flex flex-col space-y-2">
          {/* Text Area Input */}
          <textarea
            value={inputMessage}
            onChange={(e) => dispatch(setInputMessage(e.target.value))}
            placeholder="Input source text here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5} // Adjust the number of rows as needed
          />

        {/* Dropdown for Sample Texts */}
        <select
          onChange={(e) => {
            const selectedKey = e.target.selectedOptions[0].getAttribute("data-key");
            dispatch(setInputMessage(e.target.value));
            if (selectedKey) {
              dispatch(setTargetLanguage(selectedKey));
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue=""
        >
          <option value="" disabled>
            Optional: Select sample text of a specific language. {targetLanguage}
          </option>
          {Object.entries(sampleTexts).map(([key, value]) => (
            <option key={key} value={value} data-key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
        </div>

        {/* Target Language */}
        <p>Target Language</p>
        <input
          type="text"
          value={targetLanguage}
          onChange={(e) => dispatch(setTargetLanguage(e.target.value))}
          placeholder="Optional: Enter target language..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       

        {/* Language Level */}
          <p>Language Level</p>
          <select
            value={languageLevel}
            onChange={(e) => dispatch(setLanguageLevel(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>
              Select a language level
            </option>
            {cefrLevelArray.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

        {/* Keyword Significance */}
          <p>Keyword Significance</p>
          <select
            value={keywordSignificance}
            onChange={(e) => dispatch(setKeywordSignificance(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select keyword significance
            </option>
            {Object.entries(significanceSettings).map(([key, description]) => (
              <option key={key} value={description}>
                {key}
              </option>
            ))}
          </select>

        {/* Number of Keywords */}
          <p>Number of Keywords</p>
          <select
            value={numberOfKeywords}
            onChange={(e) => dispatch(setNumberOfKeywords(Number(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>
              Select number of keywords
            </option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

        {/* Exemplar Sentence Length */}
          <p>Exemplar Sentence Length in Words</p>
          <select
            value={exemplarSentenceLength}
            onChange={(e) => dispatch(setExemplarSentenceLength(Number(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select sentence length
            </option>
            {[...Array(13)].map((_, index) => {
              const length = index + 8; // Start at 8 and go to 20
              return (
                <option key={length} value={length}>
                  {length}
                </option>
              );
            })}
          </select>

       {/* Keyword Grammar Format */}
        <p>Keyword Grammar Format</p>
        <select
          value={keywordGrammarFormat}
          onChange={(e) => dispatch(setKeywordGrammarFormat(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>
            Select a grammar format
          </option>
          {Object.entries(grammarFormats).map(([key, description]) => (
            <option key={key} value={description}>
              {key}
            </option>
          ))}
        </select>

       {/* Part of Speech */}
        <p>Part of Speech</p>
        <select
          value={partOfSpeech}
          onChange={(e) => dispatch(setPartOfSpeech(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>
            Select a part of speech
          </option>
          {Object.entries(partOfSpeechOptions).map(([key, description]) => (
            <option key={key} value={description}>
              {key}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          onClick={
            () => {getGroqChatCompletion();
            console.log('Full Message at Groq send', fullMessage);
          }
        } // Replace with your fetch logic
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? 'Loading...' : 'Get Results'}
        </button>

        {/* Display Parsed Response */}
        {parsedResponse && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4 w-full">
            <h3 className="text-lg font-semibold text-gray-700">AI Response:</h3>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-lg">Keyword</th>
                  <th className="border border-gray-300 px-4 py-2 text-lg">Translation</th>
                  <th className="border border-gray-300 px-4 py-2 text-lg">Exemplar Sentence</th>
                  <th className="border border-gray-300 px-4 py-2 text-lg">Translation Sentence</th>
                  <th className="border border-gray-300 px-4 py-2 text-lg">Add to Deck</th>
                </tr>
              </thead>
              <tbody>
                {parsedResponse.keywords.map((keyword, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{keyword.keyword}</td>
                    <td className="border border-gray-300 px-4 py-2">{keyword.keywordTranslation}</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{keyword.exemplar}</td>
                    <td className="border border-gray-300 px-4 py-2">{keyword.exemplarTranslation}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
    </div>
  );}