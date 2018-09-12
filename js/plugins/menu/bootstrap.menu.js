(function ($) {
    $.fn.extend({
        /**
         *
         * @param options
         * @returns {template}
         */
        menu: function (options) {
            $(this).each(function (i) {
                var $trigger = $(this);
                var id = $trigger.attr('id');
                if (!id) {
                    id = "MENU_" + i;
                    $trigger.attr('id', id);
                }
                $trigger.find('.panel').each(function (ei) {
                    var $panel = $(this);
                    var $heading = $panel.find('.panel-heading').attr({
                        "data-toggle": "collapse",
                        "data-parent": ("#" + id)
                    });
                    var $menu = $panel.children('.menu-list').addClass('list-group panel-collapse collapse');
                    if($menu.hasClass('active')){
                        $menu.addClass('in');
                    }
                    var mid = $menu.attr('id');
                    if (!mid) {
                        mid = id + "_" + ei;
                        $menu.attr('id', mid);
                    }
                    $heading.attr('data-target', '#' + mid);
                    $menu.find('a').addClass('list-group-item');
                });
                return true;
            }).collapse();
            return this;
        }
    });
})(jQuery);