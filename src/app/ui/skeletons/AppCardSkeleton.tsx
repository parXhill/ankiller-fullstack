import { Card } from '@/app/lib/AppCard';

export default function AppCardSkeleton(){

  const dummyCards: Card[] = [
    {
      id: 1,
      deckId: 1,
      deck: { id: 1, title: "french" },
      keyword: "Keyword1",
      exemplar: "Exemplar1",
      keywordTranslation: "Translation1",
      exemplarTranslation: "Exemplar Translation1",
      targetLanguage: "English",
      lemmas: "Lemma1",
      dependencies: "Dependency1",
      aiGenerated: true,
      aiModel: "Model1",
      languageLevel: "B2",
      numberOfKeywords: 3,
      exemplarSentenceLength: 15,
      keywordSignificance: "High",
      keywordGrammarFormat: "Noun",
      partOfSpeech: "Noun",
    },
    {
      id: 2,
      deckId: 1,
      deck: { id: 1, title: "french" },
      keyword: "Keyword2",
      exemplar: "Exemplar2",
      keywordTranslation: "Translation2",
      exemplarTranslation: "Exemplar Translation2",
      targetLanguage: "Spanish",
      lemmas: "Lemma2",
      dependencies: "Dependency2",
      aiGenerated: false,
      aiModel: "Model2",
      languageLevel: "C1",
      numberOfKeywords: 5,
      exemplarSentenceLength: 20,
      keywordSignificance: "Medium",
      keywordGrammarFormat: "Verb",
      partOfSpeech: "Verb",
    },
    {
      id: 3,
      deckId: 1,
      deck: { id: 1, title: "french" },
      keyword: "Keyword3",
      exemplar: "Exemplar3",
      keywordTranslation: "Translation3",
      exemplarTranslation: "Exemplar Translation3",
      targetLanguage: "French",
      lemmas: "Lemma3",
      dependencies: "Dependency3",
      aiGenerated: true,
      aiModel: "Model3",
      languageLevel: "A1",
      numberOfKeywords: 2,
      exemplarSentenceLength: 10,
      keywordSignificance: "Low",
      keywordGrammarFormat: "Adjective",
      partOfSpeech: "Adjective",
    },
  ];

    return (

<div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Card Table</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm uppercase tracking-wide">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Deck Name</th>
              <th className="p-4 text-left">Keyword</th>
              <th className="p-4 text-left">Exemplar</th>
              <th className="p-4 text-left">Translation</th>
              <th className="p-4 text-left">AI Generated</th>
              <th className="p-4 text-left">Language Level</th>
            </tr>
          </thead>
          <tbody>
            {dummyCards.map((cardItem, index) => (
              <tr
                key={cardItem.id}
                className={`hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4">{cardItem.id}</td>
                <td className="p-4">{cardItem.deck?.title}</td>
                <td className="p-4">{cardItem.keyword}</td>
                <td className="p-4">{cardItem.exemplar}</td>
                <td className="p-4">{cardItem.keywordTranslation}</td>
                <td className="p-4">{cardItem.aiGenerated ? "Yes" : "No"}</td>
                <td className="p-4">{cardItem.languageLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>
      );
      };