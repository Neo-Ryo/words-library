import { prisma } from '../primaClient';
import { Context, Next } from 'koa';

export async function getLetters(ctx: Context): Promise<void> {
    try {
        const letters = await prisma.letter.findMany();
        ctx.status = 200;
        ctx.body = letters;
    } catch (error) {
        ctx.body = error;
    }
}

export async function storeLetter(ctx: Context): Promise<void> {
    try {
        const letter = ctx.request.body.letter as string;
        const code = letter.charCodeAt(0);
        const letterExist = await prisma.letter.findFirst({
            where: {
                charCode: code,
            },
        });
        if (letterExist) {
            ctx.body = { message: `letter ${letter} aleady stored.` };
        } else {
            const storedLetter = await prisma.letter.create({
                data: {
                    charCode: code,
                },
            });
            ctx.status = 204;
            ctx.body = {
                message: 'Created',
                code: storedLetter.charCode,
                letter: letter,
            };
        }
    } catch (error) {
        ctx.body = error;
    }
}
