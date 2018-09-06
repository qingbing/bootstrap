/**
 * 定义一些常用的或自动导入的类
 */
var Loader = {
    loadCss: function (path, basePath) {
        if (basePath) {
            H.loadCss(basePath + path);
        } else {
            H.loadCss(H.jsPath() + path);
        }
    },
    loadJs: function (path, callback, id) {
        H.loadJs(H.jsPath() + path, callback, id);
    },
    tab: function () {
        this.loadJs('/plugins/bootstrap.tab.js');
    },
    player: function () {
        this.loadJs('/plugins/bootstrap.player.js');
    },
    datePicker: function () {
        this.loadCss('/plugins/daterangepicker/daterangepicker.min.css');
        this.loadMoment(function () {
            Loader.loadJs('/plugins/daterangepicker/daterangepicker.min.js', function () {
                Loader.loadJs('/plugins/daterangepicker/bootstrap.picker.js');
            });
        });
    },
    loadMoment: function (callback) {
        if (this.__isLoadedMoment) {
            return H.isFunction(callback) && callback();
        }
        this.loadJs('/plugins/moment.min.js', function () {
            Loader.__isLoadedMoment = true;
            H.isFunction(callback) && callback();
        });
    },
    configs: {
        'tab': '.h-tab',
        'player': '.h-player',
        'datePicker': '.h-datePicker'
    }
};

(function ($) {
    H.each(Loader.configs, function (key, target) {
        if ($(target).length > 0 && H.isFunction(Loader[key])) {
            Loader[key]();
        }
    });
})(jQuery);