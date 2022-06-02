const GALLERY_URL = 'https://jsonplaceholder.typicode.com/albums';
const ALBUM_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const GALLERY_LIST_CLASS = 'list_elements';
const ALBUM_CLASS = 'album_link';

const galleryTemmplate = document.querySelector('.gallery_template').innerHTML;
const albumTemplate = document.querySelector('.album_template').innerHTML;
const gallleryEL = document.querySelector('.gallery_list');
const photoEl = document.querySelector('.photo_block');

const galleryApi = new RequestHandler(GALLERY_URL);
const albumApi = new RequestHandler(ALBUM_URL);

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
            // fetch(ALBUM_URL + id)
            // .then((res) => res.json())
            // .then((data) => {
            //     photoList = data;
            //     renderPhotoList();        
            // })
        fetchPhotoList(id);
        e.preventDefault();
    }
}

function getGalleryId(el) {
    return +el.closest('.' + GALLERY_LIST_CLASS).dataset.id;
}

function generateGalleryEl(list) {
    return galleryTemmplate.replace('{{id}}', list.id)
                            .replace('{{title}}', list.title);
}

function renderList() {
    gallleryEL.innerHTML = galleryList.map(generateGalleryEl).join('\n');
}

function fetchPhotoList(albumId) {
    return albumApi.getList({albumId}).then((data) => {
        photoList = data;
        renderPhotoList();
    })
}

function generatePhotoEl(photo) {
    return albumTemplate.replace('{{id}}', photo.id)
                            .replace('{{source}}', photo.thumbnailUrl)
                            .replace('{{title}}', photo.title);
}

function renderPhotoList() {
    photoEl.innerHTML = photoList.map(generatePhotoEl).join('\n');
}