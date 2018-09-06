/**
 * HTML 布局
 * .player[data-num-control][data-carousel-control][data-interval]>ul.items>(li>img+div.carousel-caption>(h3+p))*3
 * 参数设置
 *  num-control : 是否有数字控制，true为需要
 *  carousel-control : 是否有左右控制，true为需要
 *  interval : 轮播间隔时间
 */
(function ($) {
    $('.h-tab').each(function (i) {
        var $tab = $(this);
        var $tabHead = $tab.children('.h-tab-head').addClass('nav nav-tabs').attr('role', 'tablist');
        var $tabHeadLis = $tabHead.children('li').attr('role', 'presentation');
        $tabHeadLis.children().attr({
            'role': 'tab',
            'data-toggle': 'tab'
        }).each(function (k) {
            if (!$(this).attr('href')) {
                $(this).attr('href', '#TAB_' + i + '_' + k);
            }
        });
        var activeIndex = $tabHeadLis.index($tabHead.find('li.active'));
        // 选择项目
        (-1 === activeIndex) && (activeIndex = 0);
        var $tabBody = $tab.children('.h-tab-body').addClass('tab-content list-unstyled');
        $tabBody.children('li').addClass('tab-pane fade').attr('role', 'tabpanel').each(function (k) {
            if (!$(this).attr('id')) {
                $(this).attr('id', 'TAB_' + i + '_' + k);
            }
        }).eq(activeIndex).addClass('active in');
        $tab.tab();
    });
})(jQuery);