import { Next, Context } from 'koa';
import { prisma } from '../primaClient';

export async function getAllWords(ctx: Context, next: Next): Promise<void> {
    const words = await prisma.word.findMany();
    ctx.body = { words };
}

export async function storeWord(ctx: Context, next: Next): Promise<void> {
    try {
        const word = ctx.request.body.word as string;
        console.log(word);
        const lettersArray = word
            .split('')
            .map((element: string, i: number) => {
                return { position: i, name: element };
            });
        const wordStored = await prisma.word.create({
            data: {
                name: word,
                letters: {
                    create: lettersArray,
                },
            },
        });
        console.log('Hppenin?', wordStored);
        ctx.body = { store: wordStored };
    } catch (error) {
        console.log(error);

        ctx.body = error;
    }
}
