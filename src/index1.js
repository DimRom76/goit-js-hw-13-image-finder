import './styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

// import cardImageTpl from './templates/cardImage.hbs';

// var Masonry = require('masonry-layout');
// var InfiniteScroll = require('infinite-scroll');
// var imagesLoaded = require('imagesloaded');
// // make imagesLoaded available for InfiniteScroll
// InfiniteScroll.imagesLoaded = imagesLoaded;

import refs from './js/refs';
import fetchPhoto from './js/apiService';
import updateGalleryMarkup from './js/update-galler-markup';

let pageNumber = 1;
let pageNumber = 1;

console.log(refs.searchForm);
console.log(refs.galleryList);

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.galleryList.addEventListener('click', onClickCard);

function getPhoto(queryString, pageNumber) {
  console.log('qqq');
  fetchPhoto(queryString, pageNumber, getStatusRadioButton())
    .then(hits => {
      console.log(hits);
      updateGalleryMarkup(hits);
    })
    .catch(err => console.log(err));
}

function onClickCard(event) {
  if (event.target.nodeName === 'IMG') {
    console.log('qqqq');
    const bigImg = event.target.dataset.big_img;
    console.log(bigImg);
    const instance = basicLightbox.create(`
      <img src="${bigImg}" />
    `);
    console.log(instance);
    instance.show();
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  const queryString = event.target.elements[0].value;
  if (queryString === '') {
    return;
  }

  pageNumber = 1;

  localStorage.setItem(
    'lastQuery',
    JSON.stringify({ queryString, orientation: getStatusRadioButton() }),
  );

  refs.galleryList.innerHTML = '';
  getPhoto(queryString, pageNumber);
}

function getStatusRadioButton() {
  for (let el of refs.rButton) {
    if (el.checked) {
      return el.value;
    }
  }
}

function setStatusRadioButton(nameCheked) {
  for (let el of refs.rButton) {
    if (nameCheked === el.value) {
      el.checked = true;
      return;
    }
  }
}

const lastQuery = localStorage.getItem('lastQuery');
if (lastQuery) {
  const { queryString, orientation } = JSON.parse(lastQuery);
  setStatusRadioButton(orientation);
  refs.searchForm.elements[0].value = queryString;
  getPhoto(queryString, pageNumber);
}

// var unsplashID =
//   '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

// var infScroll = new InfiniteScroll('.container', {
//   path: function () {
//     return (
//       'https://api.unsplash.com/photos?client_id=' +
//       unsplashID +
//       '&page=' +
//       this.pageIndex
//     );
//   },
//   // load response as flat text
//   responseType: 'text',
//   status: '.scroll-status',
//   history: false,
// });

// // use element to turn HTML string into elements
// var proxyElem = document.createElement('div');

// infScroll.on('load', function (response) {
//   // parse response into JSON data
//   var data = JSON.parse(response);
//   // compile data into HTML
//   var itemsHTML = data.map(getItemHTML).join('');
//   // convert HTML string into elements
//   proxyElem.innerHTML = itemsHTML;
//   // append item elements
//   var items = proxyElem.querySelectorAll('.photo-item');
//   infScroll.appendItems(items);
// });

// console.dir(infScroll);
// // load initial page
// infScroll.loadNextPage();

// var itemTemplateSrc = document.querySelector('#photo-item-template').innerHTML;

// function getItemHTML(photo) {
//   return microTemplate(itemTemplateSrc, photo);
// }

// // micro templating, sort-of
// function microTemplate(src, data) {
//   // replace {{tags}} in source
//   return src.replace(/\{\{([\w\-_\.]+)\}\}/gi, function (match, key) {
//     // walk through objects to get value
//     var value = data;
//     key.split('.').forEach(function (part) {
//       value = value[part];
//     });
//     return value;
//   });
// }

// var msnry = new Masonry('.grid', {
//   itemSelector: '.photo-item',
//   columnWidth: '.grid__col-sizer',
//   gutter: '.grid__gutter-sizer',
//   percentPosition: true,
//   stagger: 30,
//   // nicer reveal transition
//   visibleStyle: { transform: 'translateY(0)', opacity: 1 },
//   hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
// });

// // Get an API key for your demos at https://unsplash.com/developers
// const key = '19471965-37c13a0c7cc27691c95ac1581';
// const NumberOfPhotos = 12;
// const strQuery = 'beach';
// const orientation = 'all';
// const url = `https://pixabay.com/api?key=${key}&q=${strQuery}&image_type=photo&per_page=${NumberOfPhotos}&orientation=${orientation}`;

// const infScroll = new InfiniteScroll('.grid', {
//   path: function () {
//     // console.log(url + '&page=' + this.pageIndex);
//     // return url + '&page=' + this.pageIndex;

//     var unsplashID =
//       '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';
//     return (
//       'https://api.unsplash.com/photos?client_id=' +
//       unsplashID +
//       '&page=' +
//       this.pageIndex
//     );
//   },
//   // load response as flat text
//   responseType: 'text',
//   outlayer: msnry,
//   status: '.page-load-status',
//   history: false,
// });

// // use element to turn HTML string into elements
// const proxyElem = document.createElement('div');

// infScroll.on('load', function (response) {
//   // parse response into JSON data
//   var data = JSON.parse(response);
//   // compile data into HTML
//   var itemsHTML = data.map(getItemHTML).join('');
//   // convert HTML string into elements
//   proxyElem.innerHTML = itemsHTML;
//   // append item elements
//   var items = proxyElem.querySelectorAll('.photo-item');
//   imagesLoaded(items, function () {
//     infScroll.appendItems(items);
//     msnry.appended(items);
//   });
// });

// // load initial page
// infScroll.loadNextPage();

// //------------------//

// var itemTemplateSrc = document.querySelector('#photo-item-template').innerHTML;

// function getItemHTML(photo) {
//   cardImageTpl(photo);
//   //return microTemplate(itemTemplateSrc, photo);
// }

// // micro templating, sort-of
// function microTemplate(src, data) {
//   // replace {{tags}} in source
//   return src.replace(/\{\{([\w\-_\.]+)\}\}/gi, function (match, key) {
//     // walk through objects to get value
//     var value = data;
//     key.split('.').forEach(function (part) {
//       value = value[part];
//     });
//     return value;
//   });
// }
