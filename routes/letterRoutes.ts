import Router from '@koa/router';
import { storeLetter, getLetters } from '../controller/letterController';

export const letterRouter = new Router({ prefix: '/letters' });

letterRouter.post('/', storeLetter);
letterRouter.get('/', getLetters);
