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

export async function specificSearch(ctx: Context): Promise<void> {
    try {
        const { letter } = ctx.params;
        // body = { 1: "a", 4: "e", 5: "t"} ... etc
        const body = ctx.request.body;
        const words = await prisma.word.findMany({
            where: {
                name: {
                    startsWith: letter,
                },
            },
        });

        const advancedSearch = words.reduce<Word[]>((acc, curVal, i) => {
            if (Reflect.get(body, `${i}`)) {
                acc.push(curVal);
            }
            return acc;
        }, []);

        console.log(advancedSearch);
        ctx.body = advancedSearch;
    } catch (error) {
        console.log(error);
        ctx.body = error;
    }
}

export async function scrapping(ctx: Context) {
    try {
        const data = await axios({
            method: 'GET',
            url: 'http://www.pallier.org/extra/liste.de.mots.francais.frgut.txt',
        });
        const fatString = JSON.stringify(data.data);

        if (fatString) {
            const fatArray = fatString
                .split('\\r\\n')
                .filter((el) => el !== 'r')
                .reduce<{ name: string }[]>((acc, curVal, i) => {
                    if (curVal !== '\\') {
                        acc.push({ name: curVal });
                    }
                    return acc;
                }, []);
            await prisma.word.createMany({
                data: fatArray,
                skipDuplicates: true,
            });
            ctx.body = { message: 'Fat Array stored!!! 🎉🎉🎉' };
        } else {
            ctx.body = {
                message: 'Fat array did not succeed 😥',
            };
        }
    } catch (error) {
        ctx.body = error;
    }
}

// TODO ---> make a function to find spécific words with letters in spécific indexes
