import Koa, { Context } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { config } from 'dotenv';
import { wordsRouter } from './routes/wordsRoutes';
import { letterRouter } from './routes/letterRoutes';

config();

const app = new Koa();

app.use(bodyParser());

const router = new Router();

router.get('/', async (ctx: Context) => {
    ctx.body = 'Welcome on words library';
});

console.log('a' + 1);

app.use(router.routes()).use(router.allowedMethods());
app.use(wordsRouter.routes()).use(wordsRouter.allowedMethods());
app.use(letterRouter.routes()).use(letterRouter.allowedMethods);

app.on('error', (err) => {
    console.error('server error', err);
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server runnin on ${port}... 🚀`);
});
