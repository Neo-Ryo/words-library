import Router from '@koa/router';
import { getAllWords, storeWord } from '../controller/wordController';
export const wordsRouter = new Router({ prefix: '/words' });

wordsRouter.get('/', getAllWords);
wordsRouter.post('/store', storeWord);
