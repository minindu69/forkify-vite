class searchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // Publisher
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();

// https://www.google.com/search?q=sampath+vishwa&oq=sampath&gs_lcrp=EgZjaHJvbWUqBBEAAYjwIyBggAEEUYOTIHEQABiPAjIGCAIQRRhB0gNDQ5OWowajGoAgCwAgE&sourceid=chrome&ie=UTF-8&sei=H2yZade1INjg4-EPuv2ceA

// JQMIGRATE: Migrate is installed, version 3.4.1




