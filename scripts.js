let objSelectedRecipe = {};
let numMetric = 2;
fetch('recipes.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const querySearch = window.location.search;
                const urlParams = new URLSearchParams(querySearch);
                const recipeNumber = urlParams.get('recipe');
                

                const recipe = data[0];
            })

document.addEventListener("DOMContentLoaded", () => {
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            
            displayRecipeList(data)
        });
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
    objSelectedRecipe = recipe;
    let changePrep = recipe.prepTime > 60 ? ` ${Math.floor(recipe.prepTime/60)} hr ${recipe.prepTime % 60} mins`: ` ${recipe.prepTime} mins` ;
    let changeCook = recipe.cookTime > 60 ? ` ${Math.floor(recipe.cookTime/60)} hr ${recipe.cookTime % 60} mins`: ` ${recipe.cookTime} mins` ;

    recipeDetailsSection.innerHTML = `
        <h2 >${recipe.name}</h2>
        <p id="tags">${recipe.tags}</p>

        <br>
        <img src="${recipe.image}" alt="${recipe.name}" width="500px" hight="auto" />

            <section id="recipe_information">
            <p id="recipe_description">${recipe.description}</p>
            <p id="recipe_diff"><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p id="prep"><strong>Prep Time:</strong>${changePrep}</p>
            <p id="cook"><strong>Cook Time:</strong>${changeCook}</p>
            <span id="serving"><strong>Basic Serving:</strong> 
                <span id="serving-size">${recipe.servings} people</span>
                <select id="select-serving">Serving
                    <option value='1'>Regular</option>
                    <option value='2'>Double potion</option>
                    <option value='4'>Quadruple potion</option>
                </select>
            </span>
            </section>
        
            <section id="recipe_ingredients">
                <h3>Ingredients:</h3>
                <button class="button" id="imperial-button" value="0">Change to Imperial</button>
                <button class="button" id="metric-button" value="1">Change to Metric</button>
                <ul id="ingredients_list">
                    ${recipe.ingredients.map(ingredient => 
                        `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.item}</li>`
                    ).join('')}
                </ul>
            </section>

            <section id="recipe_instructions">
                <h3>Instructions:</h3>
                <ol>
                    ${recipe.instructions.map(step => 
                        `<li>${step.text}</li>`
                    ).join('')}
                </ol>
            </section>

            <section id="nutritional_information">
                <h3>Nutritional Information:</h3>
                <p>Calories: ${recipe.nutritionalInfo.calories} kcal, Protein: ${recipe.nutritionalInfo.protein}g, Carbohydrates: ${recipe.nutritionalInfo.carbohydrates}g, Fat: ${recipe.nutritionalInfo.fat}g</p>
            </section>
    `;
    addEvent();
}

function addEvent() {

    // Event for changing unit
    let elUnit = document.querySelectorAll("button#imperial-button, button#metric-button");
    elUnit.forEach(el => {
        el.addEventListener('click', (elButton)=>{
            numMetric = elButton.target.value;
            updateIngredients();
        })
    }); 

    document.getElementById("select-serving").addEventListener('change', (el)=> {
        document.getElementById('serving-size').innerText = `${objSelectedRecipe.servings * el.target.value} people`;
        updateIngredients();
    })
}

function updateIngredients() {
     // Remove all li elements
    document.querySelectorAll("#ingredients_list > li").forEach(elIng => elIng.remove());
        let elFormatted = '';
        for (const ing of objSelectedRecipe.ingredients) {
        let elTemp = `<li>${changeUnit(ing, numMetric)} ${ing.item}</li>` 
        elFormatted += elTemp;
    }
    document.getElementById("ingredients_list").insertAdjacentHTML('afterbegin',elFormatted);
}

function changeUnit (ingredient, toConvertUnit) {
    let amount = ingredient.amount;
    let unit = ingredient.unit;
    
    // if unit to convert is to metric
    if (toConvertUnit == 1) {
        if (ingredient.unit == 'tablespoon' || ingredient.unit == 'tablespoons') {
            amount = ingredient.amount * 14.7868;
            unit = 'ml';
        } else if (ingredient.unit == 'teaspoon' || ingredient.unit == 'teaspoons') {
            amount = ingredient.amount * 4.92892;
            unit = 'ml';
        }else if (ingredient.unit == 'cup' || ingredient.unit == 'cups') {
            amount = ingredient.amount * 236.588;
            unit = 'ml';
        }
    } else if(toConvertUnit == 0) { // if unit to convert is to imperial
        if (ingredient.unit == 'gram' || ingredient.unit == 'grams'){
            amount = ingredient.amount * 0.00220462;
            unit = 'pounds';
        }
    }
    let formatAmount = parseFloat(Math.round(amount*100)/100);
    let numMultiply = parseInt(document.getElementById('select-serving').value)
    return `${formatAmount * numMultiply} ${unit}`;
}