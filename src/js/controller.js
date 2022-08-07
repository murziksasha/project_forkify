import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

window.addEventListener('DOMContentLoaded', () => {
  const recipeContainer = document.querySelector('.recipe');

  const controlRecipes = async () => {
    recipeView.renderSpinner();
    try {
      const id = window.location.hash.slice(1);
      console.log(id);
      if (!id) return;
      //Loading recipe
      await model.loadRecipe(id);

      //rendering recipe

      recipeView.render(model.state.recipe);
    } catch (err) {
      recipeView.renderError(
        `We could not find that recipe. Please another one!`
      );
    }
  };

  const init = () => {
    recipeView.addHanderRender(controlRecipes);
  };
  init();
});

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
