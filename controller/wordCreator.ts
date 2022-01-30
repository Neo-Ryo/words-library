import { Next, Context } from 'koa';
import { prisma } from '../primaClient';

export async function getAllWords(ctx: Context, next: Next): Promise<void> {
    const words = await prisma.word.findMany();
    ctx.body = { words };
}
