(function () {
    var count = 0,
        imgs = [
            'img/background.png',
            'img/calendar.png',
            'img/cloth.png',
            'img/drag-small.png',
            'img/metal.png',
            'img/pencil-small.png',
            'img/pencil.png',
            'img/plus.png',
            'img/trash-small.png',
            'img/trash.png',
        ];
    var complete = function () {
        count++;
        if (count === imgs.length) {
            $("body").removeClass("images-not-loaded");
        }
    };
    _.each(imgs, function (src) {
        var image = new Image();
        image.src = src;
        image.onload = complete;
        image.onerror = complete;
    });
})();