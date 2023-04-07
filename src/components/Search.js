import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  jobListSearchEl,
  numberEl,
  getData,
  state
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagenation.js';

const submitHandler = async event => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (regular expression example)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError('Your search may not contain numbers.');
    return;
  }

  // blur input when search is not active
  searchInputEl.blur();

  // remove previous job items
  jobListSearchEl.innerHTML = '';

  // reset sorting buttons
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

  // render spinner when search is in progress
  renderSpinner('search');

  try {
      // fetch search result
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

      // extract job items only from data using destructuring
    const { jobItems } = data;
    
      // update state;
    state.searchJobItems = jobItems;
    state.currentPage = 1;
    
      // remove spinner
      renderSpinner('search');
    
      // render number of results
    numberEl.textContent = jobItems.length;
    
    // reset pagination buttons
    renderPaginationButtons();
    
      // render job items in search job list
      renderJobList();
  
  } catch (error) {
    renderSpinner('search');
    renderError(error.message); //a network problem or other errors(e.g. trying to parse non JSON data as JSON)
  }


};

searchFormEl.addEventListener('submit', submitHandler);