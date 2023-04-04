import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl
} from '../common.js';
import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
  //display back button if we are on page 2 or more
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove('pagination__button--hidden');
  } else {
    paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

  // update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;
};

const clickHandler = event => {
  // get clicked button
  const clickedButtonEl = event.target.closest('.pagination__button');
  
  // stop function if null
  if (!clickedButtonEl) return;

  // check if intention is next or back
  const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

  // update state
  nextPage ? state.currentPage++ : state.currentPage--;

  // render pagination button
  renderPaginationButtons();

  //render jobitems for that page
  renderJobList();
};

paginationEl.addEventListener('click', clickHandler);

