const text_to_speech_api_key = 'API_KEY';
const audioElement = document.getElementById('audioElement');
const jokeBtn = document.getElementById('newJokeBtn');
const jokeText = document.getElementById('jokeText');
const joke_api_url = `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

jokeBtn.addEventListener('click', getJokeFromApi);
audioElement.addEventListener('ended', () => {
    jokeBtn.disabled = false;
})

function textToSpeech(text) {
    try {
        VoiceRSS.speech({
            key: text_to_speech_api_key,
            src: text,
            hl: 'en-us',
            v: 'Amy',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
    } catch (error) {
        console.log('Text tot speech error: ', error)
    }
}

async function getJokeFromApi() {
    let joke = '';
    try {
        showLoader();

        // laod a new joke from api and organize data
        const response = await fetch(joke_api_url);
        const data = await response.json()
        let joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;

        // show joke as text on the page
        jokeText.innerText = joke;

        // send joke text to text-to-speech API
        textToSpeech(joke);
    } catch (error) {
        console.log('Text tot speech error: ', error)
    }
}

function showLoader() {
    jokeBtn.disabled = true;
    jokeText.innerHTML = document.getElementById('loader').innerHTML;
}
