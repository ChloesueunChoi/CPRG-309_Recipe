fetch('recipes.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const querySearch = window.location.search;
                const urlParams = new URLSearchParams(querySearch);
                const recipeNumber = urlParams.get('recipe');
                console.log(recipeNumber);

                const recipe = data[0];
                recipeName.innerHTML = recipe.name;
            })

document.addEventListener("DOMContentLoaded", () => {
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => displayRecipeList(data));
});

function displayRecipeList(recipes) {
    const recipeListSection = document.getElementById("recipe-list");
    recipes.forEach(recipe => {
        const recipeButton = document.createElement("button");
        recipeButton.textContent = recipe.name;
        recipeButton.addEventListener("click", () => displayRecipeDetails(recipe));
        recipeListSection.appendChild(recipeButton);
    });
}

function displayRecipeDetails(recipe) {
    const recipeDetailsSection = document.getElementById("recipe-details");
    recipeDetailsSection.innerHTML = `
        <h2>${recipe.name}</h2>
        <br>
        <img src="${recipe.image}" alt="${recipe.name}" />

            <section id="recipe_information">
            <p id="recipe_description">${recipe.description}</p>
            <p id="recipe_diff"><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p id="prep"><strong>Prep Time:</strong> ${recipe.prepTime}min</p>
            <p id="cook"><strong>Cook Time:</strong> ${recipe.cookTime}min</p>
            <p id="serving"><strong>Serving:</strong> ${recipe.servings}people</p>
            </section>
        
            <section id="recipe_ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(ingredient => 
                        `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.item}</li>`
                    ).join('')}
                </ul>
            </section>
            
        <h3>Instructions:</h3>
        <ol>
            ${recipe.instructions.map(step => 
                `<li>${step.text}</li>`
            ).join('')}
        </ol>
        <h3>Nutritional Information:</h3>
        <p>Calories: ${recipe.nutritionalInfo.calories} kcal, Protein: ${recipe.nutritionalInfo.protein}g, Carbohydrates: ${recipe.nutritionalInfo.carbohydrates}g, Fat: ${recipe.nutritionalInfo.fat}g</p>
    `;
}


