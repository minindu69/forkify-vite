# 🍽️ Forkify App

A modern recipe application that allows users to search, view, bookmark,
and upload recipes. Built using **JavaScript (ES6+)**, following an
**MVC architecture**, and powered by the **Forkify API**.

---

## 🚀 Features

- 🔍 Search recipes from an external API
- 📄 View detailed recipe information
- 🔢 Adjust servings (updates ingredient quantities dynamically)
- 🔖 Bookmark favorite recipes
- ➕ Upload your own custom recipes
- 📑 Pagination for search results
- ⚡ Fast performance with Parcel bundler
- 🔄 Real-time UI updates (Virtual DOM diffing)

---

## 🛠️ Tech Stack

- HTML5
- CSS3 / Sass
- JavaScript (ES6+)
- Parcel Bundler
- Forkify API

---

## 🧠 Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

### Model

- Handles application state and API calls\
- Manages recipe data, search results, and bookmarks

### View

- Responsible for UI rendering
- Includes:
  - RecipeView
  - ResultsView
  - PaginationView
  - BookmarksView
  - AddRecipeView

### Controller

- Connects Model and View
- Handles user interactions and updates UI accordingly

---

## 📂 Project Structure

    forkify/
    │
    ├── src/
    │   ├── js/
    │   │   ├── controller.js
    │   │   ├── model.js
    │   │   ├── config.js
    │   │   ├── helpers.js
    │   │   └── views/
    │   │       ├── View.js
    │   │       ├── recipeView.js
    │   │       ├── resultsView.js
    │   │       ├── paginationView.js
    │   │       ├── bookmarksView.js
    │   │       └── addRecipeView.js
    │   │
    │   ├── img/
    │   └── sass/
    │
    ├── index.html
    ├── package.json
    └── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/forkify.git\
cd forkify

### 2. Install dependencies

npm install

### 3. Run the development server

npm start

App will run on:\
http://localhost:1234

---

## 🌐 API Usage

https://forkify-api.jonas.io/api/v2/recipes/

Example:

https://forkify-api.jonas.io/api/v2/recipes?search=pizza

---

## 🔑 API Key (Optional)

export const KEY = 'your-api-key';

---

## 🚀 Deployment

npm run build

---

## 👨‍💻 Author

Minindu Thiranjaya\
https://github.com/minindu69
