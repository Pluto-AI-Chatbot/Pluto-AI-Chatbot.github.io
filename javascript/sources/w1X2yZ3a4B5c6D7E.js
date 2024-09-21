
            if (inputText.includes('time') || inputText.includes('date') || 
                inputText.includes('what time is it') || inputText.includes('what is the date')) {
                return getCurrentDateTime();
            }

            if ((inputText.includes('random') && inputText.includes('genre')) || 
                (inputText.includes('pick') && inputText.includes('genre'))) {
                try {
                    const response = await fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/');
                    const data = await response.text();  
                    return data;
                } catch (error) {
                    console.error('Error fetching genre data:', error);
                    return "Sorry, I couldn't fetch the genre data.";
                }
            } else if (inputText.includes('recipe') && inputText.includes('for')) {
                const query = getLastWord(inputText);
                return await fetchRecipe(query);
            } else if (inputText.includes('qr') && inputText.includes('for')) {
                const query = getLastWord(inputText);
                return await fetchQRCode(query);
            } else if (inputText.includes('number') && inputText.includes('fact')) {
                return await fetchNumberFact();
            } else if (inputText.includes('advice')) {
                return await fetchAdvice();
            } else if (inputText.includes('joke')) {
                return await fetchJoke();
            } else if (inputText.includes('fact')) {