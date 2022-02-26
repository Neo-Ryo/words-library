import { Word } from '@prisma/client';

export function advancedSearchFn(
    wordsWithFirstLetter: Word[],
    inputDataLettersArray: [string, string][]
): Word[] {
    return wordsWithFirstLetter.reduce<Word[]>((acc, curVal) => {
        for (const l in inputDataLettersArray) {
            if (
                curVal.name.includes(inputDataLettersArray[l][1]) &&
                parseInt(l) === inputDataLettersArray.length - 1
            ) {
                acc.push(curVal);
                break;
            } else if (
                curVal.name.includes(inputDataLettersArray[l][1]) &&
                parseInt(l) < inputDataLettersArray.length - 1
            ) {
                continue;
            } else {
                break;
            }
        }
        return acc;
    }, []);
}

export function precisSearchWithPosition(
    wordsWithFirstLetter: Word[],
    inputDataLetters: Record<string, unknown>
): string[] {
    const isToBeReturned: string[] = [];
    for (const word of wordsWithFirstLetter) {
        let isOk = true;
        const lettersArray = word.name.split('');
        for (const pos in lettersArray) {
            if (!Reflect.get(inputDataLetters, pos)) {
                continue;
            } else {
                if (lettersArray[pos] === Reflect.get(inputDataLetters, pos)) {
                    continue;
                } else {
                    isOk = false;
                    break;
                }
            }
        }
        if (isOk) {
            isToBeReturned.push(word.name);
        } else {
            isOk = true;
            continue;
        }
    }
    return isToBeReturned;
}
