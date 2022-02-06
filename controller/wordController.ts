import { Next, Context } from 'koa';
import { prisma } from '../primaClient';

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
        console.log(words);

        ctx.body = words;
    } catch (error) {
        console.log(error);
        ctx.body = error;
    }
}

// TODO ---> make a function to find spécific words with letters in spécific indexes
