export interface Card {
    id: number;
    keyword: string;
    translation?: string; // Optional property
    keywordTranslation?: string; // Optional property
    exemplar: string;
    exemplarTranslation: string;
  }
  // Define the Deck interface
export interface Deck {
    id: number;
    title: string;
    cards: Card[];
  }

  
  // Assign the object to the interface
export const frenchDummyDeck: Deck = {
    id: 1,
    title: 'French',
    cards: [
      {
        id: 1,
        keyword: 'Regarder',
        translation: 'To look',
        exemplar: 'Je regarde la télévision',
        exemplarTranslation: 'I am watching television',
      },
      {
        id: 2,
        keyword: 'Écouter',
        translation: 'To listen',
        exemplar: 'J\'écoute de la musique',
        exemplarTranslation: 'I am listening to music',
      },
      {
        id: 3,
        keyword: 'Parler',
        translation: 'To speak',
        exemplar: 'Je parle français',
        exemplarTranslation: 'I speak French',
      },
      {
        id: 4,
        keyword: 'Manger',
        translation: 'To eat',
        exemplar: 'Je mange du pain',
        exemplarTranslation: 'I am eating bread',
      },
      {
        id: 5,
        keyword: 'Boire',
        translation: 'To drink',
        exemplar: 'Je bois du café',
        exemplarTranslation: 'I am drinking coffee',
      },
      {
        id: 6,
        keyword: 'Dormir',
        translation: 'To sleep',
        exemplar: 'Je dors',
        exemplarTranslation: 'I am sleeping',
      },
      {
        id: 7,
        keyword: 'Voir',
        translation: 'To see',
        exemplar: 'Je vois un film',
        exemplarTranslation: 'I am watching a movie',
      },
      {
        id: 8,
        keyword: 'Lire',
        translation: 'To read',
        exemplar: 'Je lis un livre',
        exemplarTranslation: 'I am reading a book',
      },
      {
        id: 9,
        keyword: 'Écrire',
        translation: 'To write',
        exemplar: 'J\'écris une lettre',
        exemplarTranslation: 'I am writing a letter',
      },
    ],
  };

export const germanDummyDeck: Deck = {
    id: 2,
    title: 'German',
    cards: [
      {
        id: 1,
        keyword: 'Sehen',
        translation: 'To see',
        exemplar: 'Ich sehe einen Film',
        exemplarTranslation: 'I am watching a movie',
      },
      {
        id: 2,
        keyword: 'Hören',
        translation: 'To hear',
        exemplar: 'Ich höre Musik',
        exemplarTranslation: 'Ich höre Musik'
            },
            {
              id: 3,
              keyword: 'Sprechen',
              translation: 'To speak',
              exemplar: 'Ich spreche Deutsch',
              exemplarTranslation: 'I speak German',
            },
            {
              id: 4,
              keyword: 'Essen',
              translation: 'To eat',
              exemplar: 'Ich esse Brot',
              exemplarTranslation: 'I am eating bread',
            },
            {
              id: 5,
              keyword: 'Trinken',
              translation: 'To drink',
              exemplar: 'Ich trinke Kaffee',
              exemplarTranslation: 'I am drinking coffee',
            },
            {
              id: 6,
              keyword: 'Schlafen',
              translation: 'To sleep',
              exemplar: 'Ich schlafe',
              exemplarTranslation: 'I am sleeping',
            },
            {
              id: 7,
              keyword: 'Sehen',
              translation: 'To see',
              exemplar: 'Ich sehe einen Film',
              exemplarTranslation: 'I am watching a movie',
            },
            {
              id: 8,
              keyword: 'Lesen',
              translation: 'To read',
              exemplar: 'Ich lese ein Buch',
              exemplarTranslation: 'I am reading a book',
            },
            {
              id: 9,
              keyword: 'Schreiben',
              translation: 'To write',
              exemplar: 'Ich schreibe einen Brief',
              exemplarTranslation: 'I am writing a letter',
            },
            ],
          };

        export const spanishDummyDeck: Deck = {
            id: 3,
            title: 'Spanish',
            cards: [
            {
              id: 1,
              keyword: 'Mirar',
              translation: 'To look',
              exemplar: 'Yo miro la televisión',
              exemplarTranslation: 'I am watching television',
            },
            {
              id: 2,
              keyword: 'Escuchar',
              translation: 'To listen',
              exemplar: 'Yo escucho música',
              exemplarTranslation: 'I am listening to music',
            },
            {
              id: 3,
              keyword: 'Hablar',
              translation: 'To speak',
              exemplar: 'Yo hablo español',
              exemplarTranslation: 'I speak Spanish',
            },
            {
              id: 4,
              keyword: 'Comer',
              translation: 'To eat',
              exemplar: 'Yo como pan',
              exemplarTranslation: 'I am eating bread',
            },
            {
              id: 5,
              keyword: 'Beber',
              translation: 'To drink',
              exemplar: 'Yo bebo café',
              exemplarTranslation: 'I am drinking coffee',
            },
            {
              id: 6,
              keyword: 'Dormir',
              translation: 'To sleep',
              exemplar: 'Yo duermo',
              exemplarTranslation: 'I am sleeping',
            },
            {
              id: 7,
              keyword: 'Ver',
              translation: 'To see',
              exemplar: 'Yo veo una película',
              exemplarTranslation: 'I am watching a movie',
            },
            {
              id: 8,
              keyword: 'Leer',
              translation: 'To read',
              exemplar: 'Yo leo un libro',
              exemplarTranslation: 'I am reading a book',
            },
            {
              id: 9,
              keyword: 'Escribir',
              translation: 'To write',
              exemplar: 'Yo escribo una carta',
              exemplarTranslation: 'I am writing a letter',
            },
            ],
          };

export const dummyDecks: Deck[] = [frenchDummyDeck, germanDummyDeck, spanishDummyDeck]; 