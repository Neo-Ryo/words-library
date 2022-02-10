import { prisma } from '../primaClient';
import axios from 'axios';
import { Context } from 'koa';

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

// const wordsFetched = [];

// async function main() {
//     const data = await axios({
//         method: 'GET',
//         url: 'http://www.pallier.org/extra/liste.de.mots.francais.frgut.txt',
//     });
//     console.log(data);
// }

// main();
