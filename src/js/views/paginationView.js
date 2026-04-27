import View from './view.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const page = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    console.log(numPages);

    // Page1 and there other pages
    if (page === 1 && numPages > 1) {
      return this._generateMarkupButton(page + 1, 'next');
    }

    // Last page
    if (page === numPages && numPages > 1) {
      return this._generateMarkupButton(page - 1, 'prev');
    }

    // Other page
    if (page < numPages) {
      return (
        this._generateMarkupButton(page - 1, 'prev') +
        this._generateMarkupButton(page + 1, 'next')
      );
    }

    // Page1 and there are no other pages
    return '';
  }

  _generateMarkupButton(page, type) {
    return `
                <button data-goto="${page}" class="btn--inline pagination__btn--${type}">

                    ${
                      type === 'prev'
                        ? `<svg class="search__icon">
                        <use href="${this._icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${page}</span>`
                        : `
                        <span>Page ${page}</span>
                        <svg class="search__icon">
                        <use href="${this._icons}#icon-arrow-right"></use>
                        </svg>
                        `
                    }
                    
                </button>
            `;
  }

  // Publisher
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();

      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

}

export default new paginationView();
