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

    $insert_block.on('click', onClickAction);

    init();

    let galleryList = [];
    let photoList = [];
    Fancybox.bind("[data-fancybox]", {
    });
    function init() {
        fetchGalleryList();        // .then((galleryList) => fetchPhotosList(galleryList[0].id));
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
            // const url = getPhotoUrl(e.target);

            Fancybox.bind("[data-fancybox]", {

            });

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
    function generatePhotoEl(photos) {
        return albumTemplate.replace('{{id}}', photos.id)
            .replace('{{source}}', photos.url)
            .replace('{{title}}', photos.title)
            .replace('{{url}}', photos.url);
    }
    function renderPhotoList() {
        $photoEl.html(photoList.map(generatePhotoEl).join('\n'));
    }

    // function getPhotoUrl(el) {
    //     return el.dataset.url;
    // }
    });