import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

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
      recipeView.renderSpinner();
      //Update results view to mark selected search result
      resultsView.update(model.getSearchResultsPage());
      bookmarksView.update(model.state.bookmarks);

      //Loading recipe
      await model.loadRecipe(id);

      //rendering recipe

      recipeView.render(model.state.recipe);
    } catch (err) {
      recipeView.renderError();
      console.error(err);
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
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
  };

  const controlAddBookmark = () => {
    //1) add or remove bookmark
    if (!model.state.recipe.bookmarked) {
      model.addBookmark(model.state.recipe);
    } else {
      model.deleteBookmark(model.state.recipe.id);
    }
    //2) update recipe view
    recipeView.update(model.state.recipe);
    //3)render bookmarks
    bookmarksView.render(model.state.bookmarks);
  };

  const controlBookmarks = () => {
    bookmarksView.render(model.state.bookmarks);
  };

  const init = () => {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHanderRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
  };
  // init();

  const clearBookmarks = () => {
    localStorage.clear('bookmarks');
  };

  // clearBookmarks();
  ///////////////////////////////////////
});
