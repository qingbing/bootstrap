/**
 * HTML 布局
 * .w-player[data-num-control][data-carousel-control][data-interval]>ul.items>(li>img+div.carousel-caption>(h3+p))*3
 * 参数设置
 *  num-control : 是否有数字控制，true为需要
 *  carousel-control : 是否有左右控制，true为需要
 *  interval : 轮播间隔时间
 */
(function ($) {
    $.fn.extend({
        /**
         * main : timeout
         * @param options
         * @returns {player}
         */
        player: function (options) {
            $(this).each(function () {
                var $this = $(this);
                // 扩展参数设置
                var ops = $.extend({
                    'timeout': 3 // second
                }, options, $this.data());
                var $children = ops.$children = $this.children();
                var many = ops.many = $children.length;
                if (0 === many) {
                    return true;
                }
                ops.timeout *= 1000;
                $children.each(function (i) {
                    var $_children = $(this).children();
                    $_children.each(function (j) {
                        if (0 === j) {
                            $(this).addClass('w-player-content');
                        } else if (1 === j) {
                            $(this).addClass('w-player-summary');
                        } else {
                            $(this).hide();
                        }
                    });
                });

                if (many > 1) {
                    var tip = '<ul class="w-player-tips list-unstyled">';
                    for (var _j = 1; _j <= many; _j++) {
                        tip += '<li><a href="javascript:void(0)">' + _j + '</a></li>';
                    }
                    tip += "</ul>";
                    $this.append(tip);
                    ops.$tips = $this.find('ul.w-player-tips li');
                } else {
                    ops.$tips = [];
                }
                runPiece(0, true);
                if (ops.$tips.length > 0) {
                    ops.$tips.on('click', function (e) {
                        e.stopPropagation();
                        if (ops.timer) window.clearTimeout(ops.timer);
                        runPiece(ops.$tips.index($(this)));
                    });
                    $children.on('mouseover', function (e) {
                        if (ops.timer) window.clearTimeout(ops.timer);
                    }).on('mouseout', function (e) {
                        runPiece(ops.$children.index($(this)), true);
                    });
                }
                return true;

                // ==== 函数 start ====
                function runPiece(piece, justShow) {
                    var _showTime = justShow ? 0 : 1000;
                    if (ops.many <= 1) {
                        return;
                    }
                    if (piece === ops.many) {
                        // 当循环到最后一个piece时返回第一个
                        piece = 0;
                    }
                    ops.$tips.removeClass('cur').eq(piece).addClass('cur');
                    ops.$children.hide().eq(piece).show(_showTime);
                    ops.timer = window.setTimeout(function () {
                        runPiece(piece + 1);
                    }, ops.timeout);
                }

                // ==== 函数 end ====
            });
            return this;
        }
    });
})(jQuery);