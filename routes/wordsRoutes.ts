import Router from '@koa/router';
import { getAllWords } from '../controller/wordCreator';
export const wordsRouter = new Router({ prefix: '/words' });

wordsRouter.get('/', getAllWords);
