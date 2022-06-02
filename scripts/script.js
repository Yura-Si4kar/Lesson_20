const GALLERY_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const GALLERY_LIST_CLASS = 'list_elements';
const ALBUM_CLASS = 'album-item';

const galleryTemmplate = document.querySelector('.gallery_template').innerHTML;
const albumTemplate = document.querySelector('.album_template').innerHTML;
const gallleryEL = document.querySelector('.gallery_list');
const photoEl = document.querySelector('.photo_block');

const galleryApi = new RequestHandler(GALLERY_URL);
const albumApi = new RequestHandler(PHOTOS_URL);

document.addEventListener('click', onClickAction);

init();

let galleryList = [];
let photoList = [];

function init() {
    fetchGalleryList();
}

function fetchGalleryList() {
    return galleryApi.getList().then((data) => {
        galleryList = data;
        renderList();
    })
}

function onClickAction(e) {
    let id = getGalleryId(e.target);

    if (e.target.classList.contains(ALBUM_CLASS)) {
        fetchPhotosList(id);
        e.preventDefault();
    }
}

function getGalleryId(el) {
    return el.dataset.id;
}

function generateGalleryEl(list) {
    return galleryTemmplate.replace('{{id}}', list.id)
                            .replace('{{title}}', list.title);
}

function renderList() {
    gallleryEL.innerHTML = galleryList.map(generateGalleryEl).join('\n');
}

function fetchPhotosList(albumId) {
    return albumApi.getList({ albumId }).then((data) => {
        photoList = data;
        renderPhotoList();
    });
}

function generatePhotoEl(photos) {
    return albumTemplate.replace('{{id}}', photos.id)
                            .replace('{{source}}', photos.thumbnailUrl)
                            .replace('{{title}}', photos.title);
}

function renderPhotoList() {
    photoEl.innerHTML = photoList.map(generatePhotoEl).join('\n');
}