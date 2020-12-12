import getGalleryMarkup from './update-galler-markup';
import refs from './refs';

const Masonry = require('masonry-layout');
const InfiniteScroll = require('infinite-scroll');
const imagesLoaded = require('imagesloaded');
// make imagesLoaded available for InfiniteScroll
InfiniteScroll.imagesLoaded = imagesLoaded;

const optionsMasonry = {
  itemSelector: '.photo-item',
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  // nicer reveal transition
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
};

let msnry = null;
let infScroll = null;

function clear() {
  msnry.destroy();
  infScroll.destroy();
  refs.galleryList.innerHTML = `
        <div class="grid__col-sizer"></div>
        <div class="grid__gutter-sizer"></div>`;
  refs.galleryList.style = '';
  refs.pageLoadStatus.style = 'display: none';
  refs.infiniteScrollLast.style = 'display: none';
}

function getPhoto(strQuery, orientation, update = false) {
  if (update & msnry & infScroll) {
    clear();
  }

  msnry = new Masonry('.grid', optionsMasonry);

  const key = '19471965-37c13a0c7cc27691c95ac1581';
  const NumberOfPhotos = 12;
  const url = `https://obscure-citadel-20244.herokuapp.com/https://pixabay.com/api/?key=${key}&q=${strQuery}&image_type=photo&per_page=${NumberOfPhotos}&orientation=${orientation}`;

  const optionsInfScroll = {
    path: function () {
      return url + '&page=' + this.pageIndex;
    },
    // load response as flat text
    responseType: 'text',
    outlayer: msnry,
    status: '.page-load-status',
    history: false,
  };
  infScroll = new InfiniteScroll('.grid', optionsInfScroll);

  const proxyElem = document.createElement('div');

  infScroll.on('load', function (response) {
    const data = JSON.parse(response);

    proxyElem.innerHTML = getGalleryMarkup(data.hits);
    // append item elements
    const items = proxyElem.querySelectorAll('.photo-item');

    if (items.length === 0) {
      infScroll.destroy();
      refs.pageLoadStatus.style = 'display: block';
      refs.infiniteScrollLast.style = 'display: block';
    }

    // append item elements
    imagesLoaded(items, function () {
      infScroll.appendItems(items);
      msnry.appended(items);
    });
  });
  infScroll.loadNextPage();
}

export default getPhoto;
