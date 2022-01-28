-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Letter" (
    "id" INTEGER NOT NULL,
    "is" TEXT NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LetterToWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Letter_id_key" ON "Letter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_LetterToWord_AB_unique" ON "_LetterToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_LetterToWord_B_index" ON "_LetterToWord"("B");

-- AddForeignKey
ALTER TABLE "_LetterToWord" ADD FOREIGN KEY ("A") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LetterToWord" ADD FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
