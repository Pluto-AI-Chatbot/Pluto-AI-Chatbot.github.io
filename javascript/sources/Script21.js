redient = meal[`strIngredient${i}`];
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
                } catch (er