const $gifForm = $('#GIFSearchForm');
const $gifUL = $('#GIFList');
const APIKey = 'S29WKpbBZB1Wg4UqI6kWLJmsUZ09219c';

async function getGif(query){
    const resParams = {
        params : {
            api_key: APIKey,
            q: query,
            offset: 0,
            limit: 25,
            rating: 'pg-13',
            lang: 'en'
        }
    }
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', resParams)
    const randomIndex = Math.floor(Math.random() * 25);

    return res.data.data[randomIndex].images.original.url;
}

async function insertGif(query){
    const $newGif = $('<img>');
    const queryGifResult = await getGif(query);

    $newGif.attr('src', queryGifResult);
    $gifUL.append($newGif);
}

$gifForm.submit((e) => {
    e.preventDefault();
    insertGif(e.currentTarget[0].value);
});

$('#clearGifs').on('click', () => {
    $gifUL.empty();
});

