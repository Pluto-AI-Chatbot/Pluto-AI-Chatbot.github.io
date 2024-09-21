
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