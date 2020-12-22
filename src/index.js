import './styles.css';

import refs from './js/refs';
import onClickCard from './js/modalImg';
import getPhoto from './js/getPhoto';

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.galleryList.addEventListener('click', onClickCard);

function setStatusRadioButton(nameCheked) {
  for (let el of refs.rButton) {
    if (nameCheked === el.value) {
      el.checked = true;
      return;
    }
  }
}

function getStatusRadioButton() {
  for (let el of refs.rButton) {
    if (el.checked) {
      return el.value;
    }
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  const queryString = event.target.elements.query.value;
  if (queryString === '') {
    return;
  }

  const orientation = getStatusRadioButton();
  getPhoto(queryString, orientation, true);

  localStorage.setItem(
    'lastQuery',
    JSON.stringify({ queryString, orientation }),
  );
}

const lastQuery = localStorage.getItem('lastQuery');
if (lastQuery) {
  const { queryString, orientation } = JSON.parse(lastQuery);
  setStatusRadioButton(orientation);
  refs.searchForm.elements.query.value = queryString;
  getPhoto(queryString, orientation);
}
