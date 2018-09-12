/**
 * HTML 布局
 * .player[data-num-control][data-carousel-control][data-interval]>ul.items>(li>img+div.carousel-caption>(h3+p))*3
 * 参数设置
 *  num-control : 是否有数字控制，true为需要
 *  carousel-control : 是否有左右控制，true为需要
 *  interval : 轮播间隔时间
 */
(function ($) {
    $('.h-menu').each(function (i) {
        var $this = $(this).addClass('panel-group');
        // 获取ID
        var id = $this.attr('id');
        if (!id) {
            id = "menu-" + i;
            $this.attr('id', id);
        }
        var $panels = $this.find('.panel');

        console.log($panels.length)

        console.log(id)

    });
})(jQuery);