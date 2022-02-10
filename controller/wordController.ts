import { Word } from '@prisma/client';
import { Next, Context } from 'koa';
import { prisma } from '../primaClient';
import axios from 'axios';

export async function getAllWords(ctx: Context): Promise<void> {
    try {
        const words = await prisma.word.findMany();
        ctx.body = words;
    } catch (error) {
        ctx.body = error;
    }
}

export async function storeWord(ctx: Context): Promise<void> {
    try {
        const word = ctx.request.body.word as string;
        console.log(word);
        const words = await prisma.word.findMany();
        if (!words.find((w) => w.name === word)) {
            const wordStored = await prisma.word.create({
                data: {
                    name: word,
                },
            });
            ctx.status = 200;
            ctx.body = { store: wordStored };
        } else {
            ctx.status = 400;
            ctx.body = { message: `Le mot ${word} est déja enregistré...` };
        }
    } catch (error) {
        console.log(error);
        ctx.body = error;
    }
}

export async function getWordsWithFirstLetter(ctx: Context): Promise<void> {
    try {
        const { letter } = ctx.params;

        const words = await prisma.word.findMany({
            where: {
                name: {
                    startsWith: letter,
                },
            },
        });
        ctx.body = words;
    } catch (error) {
        console.log(error);
        ctx.body = error;
    }
}

export async function containsLettersSearch(ctx: Context): Promise<void> {
    try {
        const { letter } = ctx.params;
        // body = { 1: "a", 4: "e", 5: "t"} ... etc
        const body = ctx.request.body;
        const wordsWithFirstLetter = await prisma.word.findMany({
            where: {
                name: {
                    startsWith: letter,
                },
            },
        });
        const inputDataLettersArray = Object.entries(body) as [
            string,
            string
        ][];

        const advancedSearch = wordsWithFirstLetter.reduce<Word[]>(
            (acc, curVal) => {
                for (const l in inputDataLettersArray) {
                    if (
                        curVal.name.includes(inputDataLettersArray[l][1]) &&
                        parseInt(l) === inputDataLettersArray.length - 1
                    ) {
                        acc.push(curVal);
                        break;
                    } else if (
                        curVal.name.includes(inputDataLettersArray[l][1]) &&
                        parseInt(l) < inputDataLettersArray.length - 1
                    ) {
                        continue;
                    } else {
                        break;
                    }
                }
                return acc;
            },
            []
        );
        ctx.body = advancedSearch;
    } catch (error) {
        console.log(error);
        ctx.body = error;
    }
}

// TODO ---> make a function to find spécific words with letters in spécific indexes
