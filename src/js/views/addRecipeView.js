import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // this.addHandlerUpload();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', e => this.toggleWindow());
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', e => this.toggleWindow());
    this._overlay.addEventListener('click', e => this.toggleWindow());
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('click', e => {

      e.preventDefault();
      if (!e.target.matches('button')) return;

      console.log(this)
      const dataArr = [...new FormData(this._parentElement)];
      const dataObj = Object.fromEntries(dataArr);
      console.log(dataObj);
      console.log(typeof handler);
      // debugger;
      handler(dataObj);
    })
  }

  _generateMarkup() {}
}

export default new AddRecipeView();

