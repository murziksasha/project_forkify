import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

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
      resultsView.renderSpinner();
      //1) get search query
      const query = searchView.getQuery();
      if (!query) return;
      //2) Load search rusults
      await model.loadSearchResults(query);
      //3) render results
      // resultsView.render(model.state.search.results);
      resultsView.render(model.getSearchResultsPage());

      //4) Initial pagination buttons
      paginationView.render(model.state.search);
    } catch (err) {
      console.log(err);
    }
  };

  const controlPagination = goToPage => {
    //3) render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(goToPage));

    //4) Initial pagination buttons
    paginationView.render(model.state.search);
  };

  const controlServings = newServings => {
    // Update the recipe servings (in state)
    model.updateServings(newServings);
    //Update the recipe view
    recipeView.render(model.state.recipe);
  };

  const init = () => {
    recipeView.addHanderRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
  };
  init();
});

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
