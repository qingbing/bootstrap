(function ($) {
    $.fn.extend({
        /**
         * main : name, share
         * @param options
         * @returns {menu}
         */
        menu: function (options) {
            $(this).each(function () {
                var $this = $(this);
                // 扩展参数设置
                var ops = $.extend({
                    'name': '',
                    'share': false
                }, options, $this.data());
                ops.cache = !H.isEmpty(ops.name);
                if (ops.cache) {
                    ops.openDlIndex = H.getCookie(ops.name);
                    !ops.openDlIndex && !ops.share && (ops.openDlIndex = []);
                    ops.activeName = ops.name + '_act';
                    ops.selectDdIndex = H.getCookie(ops.activeName);
                } else {
                    ops.openDlIndex = undefined;
                    ops.selectDdIndex = undefined;
                }
                // 菜单初始化
                var $dls = $this.children('dl');
                var $dts = $dls.children('dt');
                var $dds = $dls.children('dd');
                $dts.prepend('<i class="glyphicon glyphicon-folder-close"></i>');
                // Init menu piece.
                $dds.removeClass('act').hide();

                if ('' !== ops.openDlIndex) {
                    var $open_dl;
                    if (ops.share) {// share{}
                        $open_dl = $dls.eq(ops.openDlIndex);
                        $open_dl.find('dt').addClass('act').find('.glyphicon')
                            .removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
                        $open_dl.children('dd').show();
                    } else {
                        if (H.isArray(ops.openDlIndex)) {
                            for (var i in ops.openDlIndex) {
                                $open_dl = $dls.eq(ops.openDlIndex[i]);
                                $open_dl.find('dt').addClass('act').find('.glyphicon')
                                    .removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
                                $open_dl.children('dd').show();
                            }
                        }
                    }
                }
                if (H.isInteger(ops.selectDdIndex)) {
                    $dds.eq(ops.selectDdIndex).addClass('act');
                }
                $dts.on('click', function () {
                    clickDtMenu($dls, $(this));
                });
                $dds.on({
                    click: function () {
                        $dds.removeClass('act');
                        var $this = $(this);
                        $this.addClass('act');
                        ops.cache && (H.setCookie(ops.activeName, $dds.index($this)));
                    }, mouseenter: function () {
                        $(this).addClass('hover');
                    }, mouseleave: function () {
                        $(this).removeClass('hover');
                    }
                });
                return true;
                // ==== 函数 start ====
                // 点击菜单函数
                function clickDtMenu($dls, $dt) {
                    var index;
                    var $arrow = $dt.children('.glyphicon'), isOpened = $arrow.hasClass('glyphicon-folder-open');
                    if (ops.share) {
                        if (isOpened) {
                            $dt.removeClass('act').children('.glyphicon')
                                .removeClass('glyphicon-folder-open').addClass('glyphicon-folder-close');
                            $dt.siblings('dd').slideUp();
                            if (ops.cache) {
                                H.setCookie(ops.name, "");
                            }
                        } else {
                            // Close all.
                            $dls.removeClass('act').find('dt .glyphicon')
                                .removeClass('glyphicon-folder-open').addClass('glyphicon-folder-close');
                            $dls.children('dd').slideUp();
                            // Open active
                            $dt.addClass('act').children('.glyphicon')
                                .removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
                            $dt.siblings('dd').slideDown();
                            if (ops.cache) {
                                H.setCookie(ops.name, $dls.index($dt.parent()));
                            }
                        }
                    } else {
                        if (isOpened) {
                            $dt.removeClass('act').children('.glyphicon')
                                .removeClass('glyphicon-folder-open').addClass('glyphicon-folder-close');
                            $dt.siblings('dd').slideUp();
                            if (ops.cache) {
                                index = $dls.index($dt.parent());
                                var r = [];
                                for (var i in ops.openDlIndex){
                                    (index !== ops.openDlIndex[i]) && (r.push(ops.openDlIndex[i]));
                                }
                                ops.openDlIndex = r;
                                H.setCookie(ops.name, ops.openDlIndex);
                            }
                        } else {
                            $dt.addClass('act').children('.glyphicon')
                                .removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
                            $dt.siblings('dd').slideDown();
                            if (ops.cache) {
                                index = $dls.index($dt.parent());
                                ops.openDlIndex.push(index);
                                H.setCookie(ops.name, ops.openDlIndex);
                            }
                        }
                    }
                }

                // ==== 函数 end ====
            });
            return this;
        }
    });
})(jQuery);