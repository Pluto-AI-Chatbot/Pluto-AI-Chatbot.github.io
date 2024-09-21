                return await fetchRandomFact();
            } else if (inputText.includes('quote')) {
                return await fetchQuote();
            } else if (inputText.includes('weather')) {
                return await fetchWeather();
            } else if (inputText.includes('random') && inputText.includes('movie')) {
                return await fetchRandomMovie();
            } else if (inputText.includes('random') && inputText.includes('recipe')) {
                return await fetchRandomRecipe();
            }

const initialKeywords = [
    { keyword: /I am (.+)/i, response: (matches) => `Why do you say you are ${matches[1]}?` },
    { keyword: /I feel (.+)/i, response: (matches) => `What makes you feel ${matches[1]}?` },
    { keyword: /I think (.+)/i, response: (matches) => `Why do you think ${matches[1]}?` },
    { keyword: /my (.+)/i, response: (matches) => `Your ${matches[1]}? Tell me more about it.` },
    { keyword: /you (.+)/i, response: (matches) => `Why do you think about me ${matches[1]}?` },