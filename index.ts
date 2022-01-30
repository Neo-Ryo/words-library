import Koa from 'koa';
import Router from '@koa/router';
import { config } from 'dotenv';
import { wordsRouter } from './routes/wordsRoutes';

config();

export const app = new Koa();

const router = new Router();

app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx: { body: { message: string }; method: string }) => {
//     ctx.body = { message: 'Welcome on words library' };
// });

app.use(wordsRouter.routes()).use(wordsRouter.allowedMethods());

app.on('error', (err) => {
    console.error('server error', err);
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server runnin on ${port}... 🚀`);
});
