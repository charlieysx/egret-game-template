var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(pageName) {
        if (pageName === void 0) { pageName = ''; }
        var _this = _super.call(this) || this;
        /**
         * 场景名称
         */
        _this._pageName = '';
        _this._pageName = pageName;
        // 设置场景宽高为舞台的宽高
        _this.width = GameUtil.getStageWidth();
        _this.height = GameUtil.getStageHeight();
        // 防止页面点击穿透
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(BaseScene.prototype, "pageName", {
        get: function () {
            return this._pageName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 关于场景动画部分，后面写路由时会写到
     */
    /**
     * 进入动画执行结束
     */
    BaseScene.prototype.afterEnterAnimation = function () {
        // console.log(this._pageName, 'afterEnterAnimation')
    };
    /**
     * 离开动画执行结束
     */
    BaseScene.prototype.afterLeaveAnimation = function () {
        // console.log(this._pageName, 'afterLeaveAnimation')
    };
    return BaseScene;
}(BaseView)); //https://mp.weixin.qq.com/s/Kl7yA3ZJwNWmtWym6DEXuQ
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map