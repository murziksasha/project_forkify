import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

window.addEventListener('DOMContentLoaded', () => {
  const controlRecipes = async () => {
    recipeView.renderSpinner();
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;
      //Loading recipe
      await model.loadRecipe(id);

      //rendering recipe

      recipeView.render(model.state.recipe);
    } catch (err) {
      recipeView.renderError();
    }
  };

  const controlSearchResults = async () => {
    try {
      //1) get search query
      const query = searchView.getQuery();
      if (!query) return;
      //2) Load search rusults
      await model.loadSearchResults(query);
      //3) render results
      console.log(model.state.search.results);
    } catch (err) {
      console.log(err);
    }
  };

  const init = () => {
    recipeView.addHanderRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
  };
  init();
});

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
