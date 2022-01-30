import Koa, { Context } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { config } from 'dotenv';
import { wordsRouter } from './routes/wordsRoutes';

config();

const app = new Koa();

app.use(bodyParser());

const router = new Router();

router.get('/', async (ctx: Context) => {
    ctx.body = 'Welcome on words library';
});

app.use(router.routes()).use(router.allowedMethods());

app.use(wordsRouter.routes()).use(wordsRouter.allowedMethods());

app.on('error', (err) => {
    console.error('server error', err);
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server runnin on ${port}... 🚀`);
});
