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