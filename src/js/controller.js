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
      alert(err);
    }
  };

  ['hashchange', 'load'].forEach(ev =>
    window.addEventListener(ev, controlRecipes)
  );
  // window.addEventListener('hashchange', showRecipe);
  // window.addEventListener('load', showRecipe);
});

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
