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
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        /**
         * 记录是否弹出加载框
         */
        _this.isLoading = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /**
     * 被添加到舞台
     */
    BaseView.prototype.onAddToStage = function (event) {
    };
    /**
     * 视图销毁
     */
    BaseView.prototype.onDestory = function () {
    };
    /**
     * 消息提示
     */
    BaseView.prototype.toast = function (msg, duration, cb) {
        if (duration === void 0) { duration = 2000; }
        // 后面会写到如何封装该Toast类
        Toast.instance.show(msg, duration, cb);
    };
    /**
     * 显示加载框
     */
    BaseView.prototype.showLoading = function () {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        if (!this._loading) {
            this._loading = new egret.DisplayObjectContainer();
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x000000, 1);
            bg.graphics.drawRect(0, 0, this.width, this.height);
            bg.graphics.endFill();
            bg.alpha = 0.3;
            bg.touchEnabled = true;
            this._loading.addChild(bg);
        }
        if (!this._loadingIcon) {
            // this._loadingIcon = ResUtil.createBitmap('loading_icon') // 这是自己封装的获取bitmap的方法，后面会写到
            // this._loadingIcon.width = 50
            // this._loadingIcon.height = 50
            // this._loadingIcon.anchorOffsetX = this._loadingIcon.width / 2
            // this._loadingIcon.anchorOffsetY = this._loadingIcon.height / 2
            // this._loadingIcon.x = this.width / 2
            // this._loadingIcon.y = this.height / 2
            // this._loading.addChild(this._loadingIcon)
        }
        egret.MainContext.instance.stage.addChild(this._loading);
        this.loadingTween = egret.Tween
            .get(this._loadingIcon, { loop: true })
            .to({
            rotation: 360
        }, 500, egret.Ease.sineIn);
    };
    /**
     * 关闭加载框
     */
    BaseView.prototype.closeLoading = function () {
        if (!this.isLoading) {
            return;
        }
        if (this.loadingTween) {
            this.loadingTween.setPaused(true);
        }
        this.loadingTween = null;
        egret.MainContext.instance.stage.removeChild(this._loading);
        this.isLoading = false;
    };
    return BaseView;
}(egret.DisplayObjectContainer));
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map