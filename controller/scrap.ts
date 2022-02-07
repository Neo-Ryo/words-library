import axios from 'axios';

const wordsFetched = [];

async function main() {
    const data = await axios({
        method: 'GET',
        url: 'http://www.pallier.org/extra/liste.de.mots.francais.frgut.txt',
    });
    console.log(data);
}

main();
