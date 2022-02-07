import Router from '@koa/router';
import {
    getAllWords,
    storeWord,
    getWordsWithFirstLetter,
    scrapping,
} from '../controller/wordController';
export const wordsRouter = new Router({ prefix: '/words' });

wordsRouter.get('/', getAllWords);
wordsRouter.post('/', storeWord);
wordsRouter.get('/first/:letter', getWordsWithFirstLetter);
wordsRouter.get('/scrapping', scrapping);
