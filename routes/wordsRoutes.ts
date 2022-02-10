import Router from '@koa/router';
import {
    getAllWords,
    storeWord,
    getWordsWithFirstLetter,
    containsLettersSearch,
} from '../controller/wordController';
import { scrapping } from '../controller/scrap';
export const wordsRouter = new Router({ prefix: '/words' });

wordsRouter.get('/', getAllWords);
wordsRouter.post('/', storeWord);
wordsRouter.get('/first/:letter', getWordsWithFirstLetter);
wordsRouter.get('/scrapping', scrapping);
wordsRouter.post('/first/:letter', containsLettersSearch);
