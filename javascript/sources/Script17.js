                const advice = data.slip.advice;  
                return `${advice}`;
            } catch (error) {
                console.error('Error fetching advice data:', error);
                return "Sorry, I couldn't fetch the advice data.";
            }
        }

        async function fetchJoke() {
            try {
                const response = await fetch('https://official-joke-api.appspot.com/random_joke');
                const joke = await response.json();
		const output = `
${joke.setup}

${joke.punchline}
 `;
                return output;
            } catch (error) {
                console.error('Error fetching joke data:', error);
                return "Sorry, I couldn't fetch the joke data.";
            }
        }

        async function fetchRandomFact() {
            try {
                const response = await fetch('https://us