import cardImageTpl from '../templates/cardImage.hbs';

function updateGalleryMarkup(hits) {
  const markup = cardImageTpl(hits);
  return markup;
}

export default updateGalleryMarkup;
