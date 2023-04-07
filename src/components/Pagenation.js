import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  RESULTS_PER_PAGE
} from '../common.js';
import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
  //display back button if we are on page 2 or more

}

  // update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;


const clickHandler = event => {
  // get clicked button
  const clickedButtonEl = event.target.closest('.pagination__button');
  console.log(event);
  // stop function if null
  if (!clickedButtonEl) return;

  // check if intention is next or back
  const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

  // update state
  nextPage ? state.currentPage++ : state.currentPage--;

  //render jobitems for that page
  renderJobList();
};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;
