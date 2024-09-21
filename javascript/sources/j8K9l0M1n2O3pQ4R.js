        async function sendMessage() {
            const inputBox = document.getElementById('userInput');
            const chatBox = document.getElementById('chatBox');
            const userMessage = inputBox.value.trim();

            // Display the user's message
            if (userMessage) {
                const userMessageElement = document.createElement('p');
                userMessageElement.textContent = userMessage;
                userMessageElement.className = 'chat-message user';
                chatBox.appendChild(userMessageElement);
                
                // Clear the input field
                inputBox.value = '';

                // Generate a bot response
                const botResponse = await getBotResponse(userMessage);
                const botMessageElement = document.createElement('p');
                botMessageElement.innerHTML = botResponse; // Use innerHTML for potential HTML content
                botMessageElement.className = 'chat-message bot';
                chatBox.appendChild(botMessageElement);

                // Scroll to the bottom of the chat box
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        async function getBotResponse(message) {
            const inputText = message.toLowerCase();

            // Sanitize the message input
            const sanitizedMessage = sanitizeInput(message);

            // Check if the sanitized message is a valid expression
            try {
                const result = eval(sanitizedMessage);
                if (!isNaN(result)) {
                    return `The result is ${result}.`;
                }
            } catch (error) {
                console.error('Evaluation error:', error);
            }

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
    { keyword: /why (.+)/i, response: () => `Why not?` },
    { keyword: /hello/i, response: () => `Hello! How can I assist you today?` },
    { keyword: /bye/i, response: () => `Goodbye! Take care!` },
    { keyword: /help/i, response: () => `What do you need help with?` },
    { keyword: /sorry/i, response: () => `No need to apologize. What’s on your mind?` },
    { keyword: /yes/i, response: () => `I see. Can you elaborate on that?` },
    { keyword: /no/i, response: () => `Why not?` },
    { keyword: /perhaps/i, response: () => `What makes you think so?` },
    { keyword: /default/i, response: () => `Can you rephrase that?` },
    { keyword: /thanks/i, response: () => `You got it! Anything else on your mind?` },
    { keyword: /I like (.+)/i, response: (matches) => `What do you like about ${matches[1]}?` },
    { keyword: /I love (.+)/i, response: (matches) => `Love is powerful! What do you love about ${matches[1]}?` },
    { keyword: /I hate (.+)/i, response: (matches) => `That sounds strong. Why do you hate ${matches[1]}?` },
    { keyword: /I want (.+)/i, response: (matches) => `What do you hope to achieve by wanting ${matches[1]}?` },
    { keyword: /I need (.+)/i, response: (matches) => `Why do you feel you need ${matches[1]}?` },
    { keyword: /I remember (.+)/i, response: (matches) => `Memory is fascinating! Why is ${matches[1]} significant to you?` },
    { keyword: /I dream (.+)/i, response: (matches) => `Dreams can be revealing! What was your dream about ${matches[1]}?` },
    { keyword: /I miss (.+)/i, response: (matches) => `What do you miss about ${matches[1]}?` },
    { keyword: /I fear (.+)/i, response: (matches) => `Fear can be powerful. What makes you fear ${matches[1]}?` },
    { keyword: /I think about (.+)/i, response: (matches) => `What prompts you to think about ${matches[1]}?` },
    { keyword: /I have (.+)/i, response: (matches) => `What does having ${matches[1]} mean to you?` },
    { keyword: /you are (.+)/i, response: (matches) => `What makes you say I am ${matches[1]}?` },
    { keyword: /you feel (.+)/i, response: (matches) => `Interesting! Why do you think I feel ${matches[1]}?` },
    { keyword: /your (.+)/i, response: (matches) => `What do you think about my ${matches[1]}?` },
    { keyword: /tell me about (.+)/i, response: (matches) => `What specifically would you like to know about ${matches[1]}?` },
    { keyword: /I want to (.+)/i, response: (matches) => `What’s stopping you from ${matches[1]}?` },
    { keyword: /I wish (.+)/i, response: (matches) => `Wishes can be powerful. What’s your wish about ${matches[1]}?` },
    { keyword: /I plan to (.+)/i, response: (matches) => `Plans can change. How do you feel about your plan to ${matches[1]}?` },
    { keyword: /do you (.+)/i, response: (matches) => `Why do you ask if I ${matches[1]}?` },
    { keyword: /let's (.+)/i, response: (matches) => `Sounds good! What do you have in mind for ${matches[1]}?` },
    { keyword: /what if (.+)/i, response: (matches) => `What do you think would happen if ${matches[1]}?` },
    { keyword: /tell me/i, response: () => `What would you like to know more about?` },
    { keyword: /what do you think/i, response: () => `I’d love to know your thoughts on it too!` },
    { keyword: /I doubt (.+)/i, response: (matches) => `Doubt can be tricky. What makes you doubt ${matches[1]}?` },
    { keyword: /can you (.+)/i, response: (matches) => `What do you want me to do about ${matches[1]}?` },
    { keyword: /I'm not sure/i, response: () => `Uncertainty is part of life. What’s confusing you?` },
    { keyword: /that sounds (.+)/i, response: (matches) => `Why does it sound ${matches[1]} to you?` },
    { keyword: /sometimes/i, response: () => `What do you feel sometimes?` },
    { keyword: /always/i, response: () => `What does always mean to you?` },
    { keyword: /never/i, response: () => `What makes you say never?` },
    { keyword: /maybe/i, response: () => `What makes you uncertain about that?` },
    { keyword: /I enjoy (.+)/i, response: (matches) => `What do you enjoy most about ${matches[1]}?` },
    { keyword: /I feel like (.+)/i, response: (matches) => `What leads you to feel like ${matches[1]}?` },
    { keyword: /it is (.+)/i, response: (matches) => `What makes it ${matches[1]}?` },
    { keyword: /I'm (.+)/i, response: (matches) => `What does being ${matches[1]} mean to you?` },
    { keyword: /you think (.+)/i, response: (matches) => `What do you think I should think about ${matches[1]}?` },
    { keyword: /I don't know/i, response: () => `That’s okay! What do you want to know?` },
    { keyword: /I cannot (.+)/i, response: (matches) => `Why do you feel you cannot ${matches[1]}?` },
    { keyword: /it seems (.+)/i, response: (matches) => `What makes it seem ${matches[1]} to you?` },
    { keyword: /I hope (.+)/i, response: (matches) => `Hope is powerful! What do you hope for?` },
    { keyword: /I try (.+)/i, response: (matches) => `Trying is important! What do you try to ${matches[1]}?` },
    { keyword: /I believe (.+)/i, response: (matches) => `Beliefs shape us. Why do you believe ${matches[1]}?` },
    { keyword: /I want to know (.+)/i, response: (matches) => `What do you hope to learn about ${matches[1]}?` },
    { keyword: /I wonder (.+)/i, response: (matches) => `Wondering is part of curiosity! What do you wonder about ${matches[1]}?` },
    { keyword: /I can't (.+)/i, response: (matches) => `Why do you think you can’t ${matches[1]}?` },
    { keyword: /I need help with (.+)/i, response: (matches) => `What kind of help do you need with ${matches[1]}?` },
    { keyword: /I feel good/i, response: () => `That’s great! What makes you feel good?` },
    { keyword: /I feel bad/i, response: () => `I’m sorry to hear that. What’s bothering you?` },
    { keyword: /I often (.+)/i, response: (matches) => `What do you often do when you ${matches[1]}?` },
    { keyword: /tell me more about (.+)/i, response: (matches) => `I’m all ears! What more can you share about ${matches[1]}?` },
    { keyword: /I regret (.+)/i, response: (matches) => `Regret can be heavy. What do you regret about ${matches[1]}?` },
    { keyword: /I appreciate (.+)/i, response: (matches) => `Appreciation is key! What do you appreciate about ${matches[1]}?` },
    { keyword: /I notice (.+)/i, response: (matches) => `Noticing is important! What do you notice about ${matches[1]}?` },
    { keyword: /I see (.+)/i, response: (matches) => `What do you see that makes you feel ${matches[1]}?` },
    { keyword: /I compare (.+)/i, response: (matches) => `Comparison can be tricky. What do you compare ${matches[1]} to?` },
    { keyword: /I'm excited/i, response: () => `Excitement is wonderful! What’s making you excited?` },
    { keyword: /I'm bored/i, response: () => `Boredom can be tough. What would you like to do?` },
    { keyword: /I'm tired/i, response: () => `Rest is important. What makes you feel tired?` },
    { keyword: /I feel overwhelmed/i, response: () => `That can be difficult. What’s overwhelming you?` },
    { keyword: /I'm curious/i, response: () => `Curiosity is great! What are you curious about?` },
    { keyword: /I appreciate you/i, response: () => `Thank you! What do you appreciate the most?` },
    { keyword: /I have trouble with (.+)/i, response: (matches) => `What kind of trouble do you have with ${matches[1]}?` },
    { keyword: /I experience (.+)/i, response: (matches) => `Experiences shape us. What do you experience with ${matches[1]}?` },
    { keyword: /I enjoy talking to you/i, response: () => `I enjoy talking to you too! What do you like to chat about?` },
    { keyword: /I think life is (.+)/i, response: (matches) => `What makes you think life is ${matches[1]}?` },
    { keyword: /I often wonder/i, response: () => `Wondering is a sign of curiosity! What do you often wonder about?` },
];

const additionalKeywords = [    { keyword: 'hello', response: 'Hi there! What’s up?' },
    { keyword: 'help', response: 'I’m here for you! What do you need?' },
    { keyword: 'thanks', response: 'You got it! Anything else on your mind?' },
    { keyword: 'bye', response: 'Catch you later! Take care!' },
    { keyword: 'sorry', response: 'No worries! What’s bothering you?' },
    { keyword: 'name', response: 'I’m Pluto! What about you?' },
    { keyword: 'price', response: 'Let’s talk about what you’re interested in!' },
    { keyword: 'update', response: 'Things are always changing! What do you want to know?' },
    { keyword: 'features', response: 'I’ve got lots of cool stuff to share! Want to hear?' },
    { keyword: 'thank you', response: 'Anytime! What else can I do for you?' },
    { keyword: 'hi', response: 'Hey there! What’s going on?' },
    { keyword: 'hey', response: 'Hello! What can we chat about?' },
    { keyword: 'see you', response: 'See you soon! Don’t be a stranger!' },
    { keyword: 'who', response: 'Just a friendly chatbot! How can I help?' },
    { keyword: 'what', response: 'So many things! What are you curious about?' },
    { keyword: 'support', response: 'I’m right here! What do you need support with?' },
    { keyword: 'fun', response: 'I love fun! What do you want to do?' },
    { keyword: 'games', response: 'Games are awesome! Got a favorite?' },
    { keyword: 'food', response: 'Yum! What’s your favorite dish?' },
    { keyword: 'music', response: 'Music is life! What do you listen to?' },
    { keyword: 'travel', response: 'Traveling is exciting! Where would you go?' },
    { keyword: 'dream', response: 'Dreams can be wild! What’s yours?' },
    { keyword: 'story', response: 'I love stories! Got one to share?' },
    { keyword: 'joke', response: 'I’ve got jokes! Want to hear one?' },
    { keyword: 'favorite', response: 'I like a lot of things! What’s your favorite?' },
    { keyword: 'life', response: 'Life is an adventure! What’s your favorite part?' },
    { keyword: 'movie', response: 'I love movies! What’s your all-time favorite?' },
    { keyword: 'show', response: 'What shows are you into lately?' },
    { keyword: 'read', response: 'Reading is great! What’s your latest book?' },
    { keyword: 'weather', response: 'Weather can be wild! What’s it like where you are?' },
    { keyword: 'hobby', response: 'Hobbies are fun! What do you enjoy doing?' },
    { keyword: 'work', response: 'Work can be tough! What do you do?' },
    { keyword: 'study', response: 'Studying is important! What are you learning about?' },
    { keyword: 'exercise', response: 'Exercise is key! What’s your favorite workout?' },
    { keyword: 'relax', response: 'Relaxation is essential! How do you unwind?' },
    { keyword: 'party', response: 'Parties can be a blast! Do you like to go out?' },
    { keyword: 'adventure', response: 'Adventures are the best! What’s your dream trip?' },
    { keyword: 'art', response: 'Art is beautiful! Do you create or appreciate it?' },
    { keyword: 'fashion', response: 'Fashion is fun! What’s your style?' },
    { keyword: 'science', response: 'Science is fascinating! Do you have a favorite topic?' },
    { keyword: 'history', response: 'History is so rich! What era do you find interesting?' },
    { keyword: 'technology', response: 'Tech is always evolving! What’s your favorite gadget?' },
    { keyword: 'animals', response: 'Animals are amazing! Do you have pets?' },
    { keyword: 'nature', response: 'Nature is so calming! What’s your favorite place outdoors?' },
    { keyword: 'color', response: 'Colors can be so vibrant! What’s your favorite color?' },
    { keyword: 'dreams', response: 'Dreams can be strange! Do you remember yours?' },
    { keyword: 'goal', response: 'Goals are important! What are you aiming for?' },
    { keyword: 'wish', response: 'Wishes are powerful! What’s your biggest wish?' },
    { keyword: 'memories', response: 'Memories are special! What’s your favorite one?' },
    { keyword: 'challenge', response: 'Challenges can be tough! What have you overcome?' },
    { keyword: 'motivation', response: 'What motivates you to keep going?' },
    { keyword: 'success', response: 'Success is subjective! What does it mean to you?' },
    { keyword: 'inspiration', response: 'Inspiration can come from anywhere! What inspires you?' },
    { keyword: 'happiness', response: 'Happiness is key! What makes you happy?' },
    { keyword: 'friendship', response: 'Friendship is special! Who’s your best friend?' },
    { keyword: 'family', response: 'Family is important! Tell me about yours.' },
    { keyword: 'future', response: 'The future is exciting! What are your hopes for it?' },
    { keyword: 'past', response: 'The past shapes us! What’s a lesson you’ve learned?' },
    { keyword: 'change', response: 'Change can be hard! What’s something you want to change?' },
    { keyword: 'advice', response: 'Advice can be helpful! What do you need advice on?' },
    { keyword: 'question', response: 'Questions lead to answers! What’s your question?' },
    { keyword: 'wisdom', response: 'Wisdom is valuable! What’s a piece of wisdom you cherish?' },
    { keyword: 'knowledge', response: 'Knowledge is power! What do you want to learn more about?' },
    { keyword: 'community', response: 'Community matters! How do you engage with yours?' },
    { keyword: 'hope', response: 'Hope keeps us going! What are you hopeful for?' },
    { keyword: 'love', response: 'Love is everything! What does love mean to you?' },
    { keyword: 'peace', response: 'Peace is vital! How do you find your peace?' },
    { keyword: 'gratitude', response: 'Gratitude is powerful! What are you grateful for today?' },
]

    const allKeywords = [...initialKeywords, ...additionalKeywords];

    for (const { keyword, response } of allKeywords) {
        const matches = inputText.match(keyword);
        if (matches) {
            return typeof response === 'function' ? response(matches) : response;
        }
    }
    
    // Default response when no keywords match
    return "I'm not sure how to respond to that."
        }

        // Helper functions for fetching specific responses
        async function fetchRecipe(query) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
                const data = await response.json();
                if (!data.meals) {
                    return `Sorry, I couldn't find a recipe for "${query}".`;
                }
                const meal = data.meals[0];
                const ingredientsList = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient) {
                        ingredientsList.push(`${ingredient}: ${measure}`);
                    }
                }
                return `
Here you go:

Meal Name: ${meal.strMeal}

Category: ${meal.strCategory}

Area: ${meal.strArea}

Instructions: 
   ${meal.strInstructions}

Image: 

   <img src="${meal.strMealThumb}" alt="Thumnail for "${query}" style="width: 200px; height: 200px;" />

Tags: ${meal.strTags}

<a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a>

Ingredients: 
   ${ingredientsList.join('\n ')}

<a href="${meal.strSource}" target="_blank">Source</a>
                `;
            } catch (error) {
                console.error(`Error fetching data for "${query}":`, error);
                return `Sorry, I couldn't fetch the data for "${query}".`;
            }
        }

        async function fetchQRCode(query) {
            try {
                const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const qrCodeUrl = response.url; // The URL of the generated QR code
		const output = `
Here is your QR code:

<img src="${qrCodeUrl}" alt="QR Code" />
 `;
                return output;
            } catch (error) {
                console.error(`Error fetching data for "${query}":`, error);
                return `Sorry, I couldn't fetch the data for "${query}".`;
            }
        }

        async function fetchNumberFact() {
            try {
                const response = await fetch('http://numbersapi.com/random');
                const numfact = await response.text();   
                return `${numfact}`;
            } catch (error) {
                console.error('Error fetching number fact data:', error);
                return "Sorry, I couldn't fetch the number fact data.";
            }
        }

        async function fetchAdvice() {
            try {
                const response = await fetch('https://api.adviceslip.com/advice');
                const data = await response.json();  
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
                const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
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
                     const proxyUrl = 'https://corsproxy.io/?';
                     const targetUrl = 'https://pickamovie.online/movies.json';
                     const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

                     if (!response.ok) {
                         throw new Error('Network response was not ok.');
                     }

                     const data = await response.json();

                     const headers = data[0];
                     const rows = data.slice(1);
                     let movies = rows.map(row => {
                     let movie = {};
                     headers.forEach((header, index) => {
                         movie[header] = row[index];
                     });
                     return movie;
                 });

        if (movies.length === 0) {
            return "No movies found.";
        }

        const randomIndex = Math.floor(Math.random() * movies.length);
        const movie = movies[randomIndex];
        const imdbID = movie.Const;

        const movieDataResponse = await fetch(`https://corsproxy.io/?https://pickamovie.online/getMovie.php?imdbID=${imdbID}`);

        if (!movieDataResponse.ok) {
            throw new Error('Network response was not ok.');
        }

        const movieData = await movieDataResponse.json();

        // Check for the correct field names based on the actual response
        const movieTitle = movieData.Title;
        const moviePlot = movieData.Plot;
        const movieRelease = movieData.Released;
        const movieLanguage = movieData.Language;

        const formattedMovieData = `
<img src="${movieData.Poster}" alt="QR Code" style="width: 200px; height: auto;" />

Title: ${movieTitle}

Year: ${movieData.Year}

Rated: ${movieData.Rated}

Released: ${movieRelease}

Runtime: ${movieData.Runtime}

Genre: ${movieData.Genre}

Director: ${movieData.Director}

Actors: ${movieData.Actors}

Language: ${movieLanguage}

Plot: ${moviePlot}
        `;

        return formattedMovieData;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return "Sorry, I couldn't fetch the movie data.";
    }
        }

        async function fetchRandomRecipe() {
                try {
                    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                    const data = await response.json(); // Parse the JSON data

                    // Extract the meal information from the JSON data
                    const meal = data.meals[0]; // Assuming there is at least one meal in the response

                    // Create a list of ingredients and measures dynamically
                    const ingredientsList = [];
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];
                        if (ingredient) {
                            ingredientsList.push(`${ingredient}: ${measure}`);
                        }
                    }

                    const formattedInfo = `
Here you go:

Meal Name: ${meal.strMeal}

Category: ${meal.strCategory}

Area: ${meal.strArea}

Instructions: 
   ${meal.strInstructions}

Image: 

   <img src="${meal.strMealThumb}" alt="Thumnail for "${meal.strMeal}" style="width: 200px; height: 200px;" />

Tags: ${meal.strTags}

<a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a>

Ingredients: 
   ${ingredientsList.join('\n ')}

<a href="${meal.strSource}" target="_blank">Source</a>
                `;
                    return formattedInfo;
                } catch (error) {
                    console.error('Error fetching data:', error);
                    return "Sorry, I couldn't fetch the data.";
                }
        }

        function sanitizeInput(input) {
            // Remove any characters that are not digits, operators, parentheses, or spaces
            return input.replace(/[^0-9+\-*/(). ]/g, '');
        }

        function getCurrentDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            return now.toLocaleDateString('en-US', options);
        }

        function getLastWord(sentence) {
            const words = sentence.trim().split(/\s+/); // Split by whitespace
            return words[words.length - 1]; // Return the last word
        }

        document.getElementById('userInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevents the default action (e.g., form submission)
                sendMessage();
            }
        });