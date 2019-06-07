var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ToastMsg = (function () {
    function ToastMsg(msg, duration, cb) {
        this.duration = 2000;
        this.msg = msg;
        this.duration = duration;
        this.cb = cb;
    }
    return ToastMsg;
}());
__reflect(ToastMsg.prototype, "ToastMsg");
/**
 * 这是模仿Android中的Toast
 * 实现弹出消息提示，并自动关闭
 */
var Toast = (function () {
    function Toast() {
        /**
         * 消息列表
         */
        this._msgList = new Array();
        this._toasting = false;
        // toast到舞台上，保证消息显示在最上层
        this._stage = egret.MainContext.instance.stage;
        this._toastContainer = new egret.DisplayObjectContainer();
    }
    Object.defineProperty(Toast, "instance", {
        get: function () {
            if (!this.toast) {
                this.toast = new Toast();
            }
            return this.toast;
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.show = function (msg, duration, cb) {
        if (duration === void 0) { duration = 2000; }
        // 将消息存进列表
        this._msgList.push(new ToastMsg(msg, duration, cb));
        // 如果当前在显示消息，那么不掉用显示方法，里面轮询会调用到的
        if (!this._toasting) {
            this._toasting = true;
            this._show();
        }
    };
    Toast.prototype._show = function () {
        var _this = this;
        if (this._msgList.length > 0) {
            var msg_1 = this._msgList.shift();
            this._toastContainer.alpha = 0;
            // 创建文本
            var textField_1 = new egret.TextField();
            textField_1.text = msg_1.msg;
            textField_1.textAlign = 'center';
            textField_1.textColor = 0xffffff;
            textField_1.size = 24;
            // 文本与黑色背景边缘的宽度
            var space = 40;
            // 如果文字宽度超过屏幕宽度的0.8倍，就设置一下（相当于设置外容器的最大宽度，暂时只想到这个办法）
            if (textField_1.textWidth >= GameUtil.getStageWidth() * 0.8) {
                textField_1.width = GameUtil.getStageWidth() * 0.8 - space;
            }
            // 设置装文本的容器的宽高和锚点，文本的锚点
            this._toastContainer.width = textField_1.width + space;
            this._toastContainer.height = textField_1.height + space;
            this._toastContainer.anchorOffsetX = this._toastContainer.width / 2;
            this._toastContainer.anchorOffsetY = this._toastContainer.height;
            textField_1.anchorOffsetX = textField_1.width / 2;
            textField_1.anchorOffsetY = textField_1.height / 2;
            textField_1.x = this._toastContainer.width / 2;
            textField_1.y = this._toastContainer.height / 2;
            // 容器的位置，在底部横向居中
            this._toastContainer.x = GameUtil.getStageWidth() / 2;
            this._toastContainer.y = GameUtil.getStageHeight() * 0.8;
            var shapeBg_1 = new egret.Shape();
            shapeBg_1.graphics.beginFill(0x000000, 1);
            shapeBg_1.graphics.drawRoundRect(0, 0, this._toastContainer.width, this._toastContainer.height, 20, 20);
            shapeBg_1.graphics.endFill();
            this._toastContainer.addChild(shapeBg_1);
            this._toastContainer.addChild(textField_1);
            this._stage.addChild(this._toastContainer);
            // 弹出和消失动画
            egret.Tween
                .get(this._toastContainer)
                .to({
                alpha: 1
            }, 200, egret.Ease.sineIn)
                .wait(msg_1.duration) // 等待xxx毫秒后再消失
                .to({
                alpha: 0
            }, 200, egret.Ease.sineIn)
                .wait(100)
                .call(function () {
                _this._toastContainer.removeChild(shapeBg_1);
                _this._toastContainer.removeChild(textField_1);
                _this._stage.removeChild(_this._toastContainer);
                msg_1.cb && msg_1.cb();
                _this._show(); // 继续显示下一条消息
            }, this);
        }
        else {
            this._toasting = false;
        }
    };
    return Toast;
}());
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map