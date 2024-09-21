];
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
                        const ing