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
        <img src="${recipe.image}" alt="${recipe.name}" />
        <p>${recipe.description}</p>
        <p><strong>난이도:</strong> ${recipe.difficulty}</p>
        <p><strong>준비 시간:</strong> ${recipe.prepTime}분</p>
        <p><strong>요리 시간:</strong> ${recipe.cookTime}분</p>
        <p><strong>서빙 인원:</strong> ${recipe.servings}명</p>
        <h3>재료:</h3>
        <ul>
            ${recipe.ingredients.map(ingredient => 
                `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.item}</li>`
            ).join('')}
        </ul>
        <h3>조리법:</h3>
        <ol>
            ${recipe.instructions.map(step => 
                `<li>${step.text}</li>`
            ).join('')}
        </ol>
        <h3>영양 정보:</h3>
        <p>칼로리: ${recipe.nutritionalInfo.calories} kcal, 단백질: ${recipe.nutritionalInfo.protein}g, 탄수화물: ${recipe.nutritionalInfo.carbohydrates}g, 지방: ${recipe.nutritionalInfo.fat}g</p>
    `;
}
