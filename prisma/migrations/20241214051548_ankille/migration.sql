-- CreateTable
CREATE TABLE "ankillertestdata" (
    "id" SERIAL NOT NULL,
    "keyword" VARCHAR(255) NOT NULL,
    "exemplar" VARCHAR(255),
    "keywordtranslation" VARCHAR(255),
    "exemplartranslation" VARCHAR(255),
    "targetlanguage" VARCHAR(255),
    "lemmas" VARCHAR(255),
    "dependencies" VARCHAR(255),
    "aigenerated" BOOLEAN NOT NULL,
    "aimodel" VARCHAR(255),
    "languagelevel" VARCHAR(255),
    "numberofkeywords" INTEGER,
    "exemplarsentencelength" INTEGER,
    "keywordsignificance" VARCHAR(255),
    "keywordgrammarformat" VARCHAR(255),
    "partofspeech" VARCHAR(255),

    CONSTRAINT "ankillertestdata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "keyword" VARCHAR(255) NOT NULL,
    "exemplar" VARCHAR(255),
    "keywordTranslation" VARCHAR(255),
    "exemplarTranslation" VARCHAR(255),
    "targetLanguage" VARCHAR(255),
    "lemmas" VARCHAR(255),
    "dependencies" VARCHAR(255),
    "aiGenerated" BOOLEAN NOT NULL,
    "aiModel" VARCHAR(255),
    "languageLevel" VARCHAR(255),
    "numberOfKeywords" INTEGER,
    "exemplarSentenceLength" INTEGER,
    "keywordSignificance" VARCHAR(255),
    "keywordGrammarFormat" VARCHAR(255),
    "partOfSpeech" VARCHAR(255),

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
