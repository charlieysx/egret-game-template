var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResUtil = (function () {
    function ResUtil() {
        this.bitmapList = {};
        this.movieClipList = {};
    }
    Object.defineProperty(ResUtil, "instance", {
        get: function () {
            if (!this.resUtil) {
                this.resUtil = new ResUtil();
            }
            return this.resUtil;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载网络图片
     * item: {
     *  url: 'xxxx' // 图片地址
     *  xxxx // 自己附带其他参数
     * }
     */
    ResUtil.loadImageByUrl = function (item, callback) {
        try {
            RES.getResByUrl(item.url, function (event) {
                callback && callback({
                    status: 1,
                    event: event,
                    item: item
                });
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
        catch (e) {
            console.error(e);
            callback && callback({
                status: 0
            });
        }
    };
    /**
     * 创建图片
     * @param name
     * @param suffix
     */
    ResUtil.createBitmap = function (name, suffix) {
        if (suffix === void 0) { suffix = 'png'; }
        var key = name + "_" + suffix;
        var result = new egret.Bitmap();
        if (!this.instance.bitmapList[key]) {
            this.instance.bitmapList[key] = RES.getRes(key);
        }
        result.texture = this.instance.bitmapList[key];
        return result;
    };
    /**
     * 创建动图
     * @param name
     * @param suffix
     */
    ResUtil.createMovieClip = function (name) {
        var result = new egret.MovieClip();
        if (!this.instance.movieClipList[name]) {
            var data_stay = RES.getRes(name + '_json');
            var texture_stay = RES.getRes(name + '_png');
            var mcFactory_stay = new egret.MovieClipDataFactory(data_stay, texture_stay);
            this.instance.movieClipList[name] = new egret.MovieClip(mcFactory_stay.generateMovieClipData(name));
        }
        result.movieClipData = this.instance.movieClipList[name].movieClipData;
        return result;
    };
    /**
     * 获取动图的最大宽高
     * @param name
     * @param suffix
     */
    ResUtil.getMoviceClipWH = function (name) {
        var mw = 0;
        var mh = 0;
        var movie = ResUtil.createMovieClip(name);
        var tData = movie.movieClipData.textureData;
        for (var key in tData) {
            mw = Math.max(tData[key].w, mw);
            mh = Math.max(tData[key].h, mh);
        }
        return {
            w: mw,
            h: mh
        };
    };
    return ResUtil;
}());
__reflect(ResUtil.prototype, "ResUtil");
//# sourceMappingURL=ResUtil.js.map