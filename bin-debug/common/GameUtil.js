var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 工具类
 */
var GameUtil = (function () {
    function GameUtil() {
    }
    GameUtil.getTopStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取舞台高度
     */
    GameUtil.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    /*
     * 获取舞台宽度
     */
    GameUtil.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    // 是容器可点击
    GameUtil.tap = function (bitmap, callback, thisObject) {
        bitmap.touchEnabled = true;
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, thisObject);
    };
    // 创建圆角矩形
    GameUtil.drawRoundRect = function (shape, color, width, height, round, rArr) {
        shape.graphics.clear();
        shape.graphics.beginFill(color, 1);
        shape.graphics.drawRoundRect(0, 0, width, height, round, round);
        shape.graphics.endFill();
        var roundArr = [0, 1, 2, 3].filter(function (item) { return rArr.indexOf(item) === -1; });
        var rectData = [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ];
        for (var i = 0; i < roundArr.length; ++i) {
            var x = (width - round) * rectData[roundArr[i]][0];
            var y = (height - round) * rectData[roundArr[i]][1];
            shape.graphics.beginFill(color, 1);
            shape.graphics.drawRect(x, y, round, round);
            shape.graphics.endFill();
        }
    };
    GameUtil.isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map