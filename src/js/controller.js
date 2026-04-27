// core-js is a polyfill library.It provides Promises, Array methods etc to old browsers(Missing modern JS features)
import 'core-js/stable';
// This add regenerator-runtime globaly as window.regeneratorRuntime(async/await support)
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import {MODEL_CLOSE_SEC} from './config.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// import { set } from 'core-js/core/dict';

// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    recipeView.renderMessage();

    if (!id) return; // without id

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    // debugger;
    bookmarksView.update(model.state.bookmarks);

    // 1)Loading recipe
    await model.loadRecipe(id);

    // await new Promise(resolve => setTimeout(resolve, 5000)); // force paint

    // 2)Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error);
    console.error(error, 'xgddg');
    // recipeView.renderError(`${error} 😒😒`);
    recipeView.renderError();
    // throw error;
  }
};

// controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const controlSearchResults = async function (query) {
  try {
    resultsView.renderSpinner();

    // console.log('Spinner start')
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log('after 4sec sppiner end')

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Initial pagination button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // Render New results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Initial pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark();
  else model.deleteBookmark();

  // Update recipe view
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    window.history.back();

    // Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);

  } catch (error) {
    console.log('Upload error-->', error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  // Subscribers
  bookmarksView.addHandlerRender(controlBookmarks);
  // debugger;
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
