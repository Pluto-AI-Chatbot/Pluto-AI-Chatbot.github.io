elessfacts.jsph.pl/api/v2/facts/random');
                const fact = await response.json();
                return `${fact.text}`;
            } catch (error) {
                console.error('Error fetching fact data:', error);
                return "Sorry, I couldn't fetch the fact data.";
            }
        }

        async function fetchQuote() {
            try {
                const response = await fetch('https://corsproxy.io/?https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
                const data = await response.json();
                return `${data.quoteText} — ${data.quoteAuthor}`;
            } catch (error) {
                console.error('Error fetching quote data:', error);
                return "Sorry, I couldn't fetch an inspirational quote.";
            }
        }

        async function fetchWeather() {
            try {
                const response = await fetch('https://wttr.in?format=%C+%t'); // %C for condition, %t for temperature
                const weatherData = await response.text(); // Read the response as plain text
                return `Current weather: ${weatherData}`;
            } catch (error) {
                console.error('Error fetching weather data:', error);
                return "Sorry, I couldn't fetch the weather data.";
            }
        }

        async function fetchRandomMovie() {
                try {
                     const proxyUrl = 'htt