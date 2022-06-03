$(() => {
    const GALLERY_URL = 'https://jsonplaceholder.typicode.com/albums';
    const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
    const ALBUM_CLASS = 'album-item';
    const PHOTOS_CLASS = 'photo';

    const galleryTemmplate = $('.gallery_template').html();
    const albumTemplate = $('.album_template').html();
    const $gallleryEL = $('.gallery_list');
    const $photoEl = $('.photo_block');
    const $insert_block = $('.insert_block');

    const $galleryApi = new RequestHandler(GALLERY_URL);
    const $albumApi = new RequestHandler(PHOTOS_URL);
    const $preview = new ImagePreview();

    $insert_block.on('click', onClickAction);

    init();

    let galleryList = [];
    let photoList = [];

    function init() {
        fetchGalleryList();
    }

    function fetchGalleryList() {
        return $galleryApi.getList().then((data) => {
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

        if (e.target.classList.contains(PHOTOS_CLASS)) {
            const url = getPhotoUrl(e.target);

            $preview.show(url);

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
        $gallleryEL.html(galleryList.map(generateGalleryEl).join('\n'));
    }

    function fetchPhotosList(albumId) {
        return $albumApi.getList({ albumId }).then((data) => {
            photoList = data;
            renderPhotoList();
        });
    }

    function generate$photoEl(photos) {
        return albumTemplate.replace('{{id}}', photos.id)
            .replace('{{source}}', photos.thumbnailUrl)
            .replace('{{title}}', photos.title)
            .replace('{{url}}', photos.url);
    }

    function renderPhotoList() {
        $photoEl.html(photoList.map(generate$photoEl).join('\n'));
    }

    function getPhotoUrl(el) {
        return el.dataset.url;
    }
});