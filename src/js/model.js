import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  console.log(recipe);

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key}),
  };

}

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // const {
    //   id,
    //   title,
    //   publisher,
    //   source_url: sourceUrl,
    //   image_url: imageUrl,
    //   servings,
    //   cooking_time: cookingTime,
    //   ingredients,
    // } = data.data;

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (error) {
    console.error(`${error} 😒😒`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    // Instantiation of url
    const url = new URL(API_URL);
    console.log(url);

    url.searchParams.set('search', query);
    // url.searchParams.set('key', KEY);

    // const data = await getJSON(
    //   `${API_URL}?search=${query}&key=${KEY}`,
    // );
    const data = await AJAX(url);
    console.log(data);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
        ...(recipe.key && {key: recipe.key}),
      };
    });
    console.log(state.search);

    state.search.page = 1;
  } catch (error) {
    console.error(`${error} 😢😢`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity *= newServings / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe = state.recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as a bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function () {
  // Delete Bookmark
  const index = state.bookmarks.findIndex(el => el.id === state.recipe.id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as a NOT bookmarked
  state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // console.log(JSON.parse(storage));
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

console.log(state.bookmarks);

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(([key, value]) => key.startsWith('ingredient') && value !== '')
      .map(([_, value]) => {
        const ingArr = value.split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format ;)',
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log(recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);

    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);

  } catch (error) {
    throw error;
  }
};
