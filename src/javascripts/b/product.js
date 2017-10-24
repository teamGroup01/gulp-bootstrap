$(function () {
    var img1 = ['product1.png', 'product2.png', 'product3.png', 'product4.png'];
    var img2 = ['product11.png', 'product12.png', 'product13.png', 'product14.png'];
    var $selector = $('.m-product > .container > .js-selector > div').children('.js-setBgColor');
    var imgs = $selector.find('img');
    for (var i = 0; i < $selector.length; i++) {
        $selector.get()[i].index = i;
        $selector.eq(i).mouseover(function() {
            for (var i = 0; i < $selector.length; i++) {
                $selector.eq(i).removeClass('active');
                imgs.eq(i).attr('src','../img/' + img2[i]);
            }
            $(this).addClass('active');
            $(this).find('img').attr('src','../img/' + img1[this.index]);
        })
    }
})