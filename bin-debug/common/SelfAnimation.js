var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SelfAnimation = (function () {
    function SelfAnimation() {
        this.animationList = new Array();
        this.animIndex = 0;
        this._initProps = {};
    }
    SelfAnimation.prototype.play = function (target, callback) {
        var _this = this;
        var data = this.animationList[this.animIndex++];
        if (data) {
            egret.Tween
                .get(target)
                .to(data.props, data.duration, data.ease)
                .call(function () {
                if (_this.animationList.length === _this.animIndex) {
                    callback && callback();
                }
                else {
                    _this.play(target, callback);
                }
            }, this);
        }
    };
    /**
     * 设置页面初始状态
     */
    SelfAnimation.prototype.init = function (props) {
        if (props === void 0) { props = {}; }
        this._initProps = props;
        return this;
    };
    /**
     * 添加动画
     */
    SelfAnimation.prototype.add = function (props, duration, ease) {
        if (props === void 0) { props = {}; }
        if (duration === void 0) { duration = 0; }
        if (ease === void 0) { ease = null; }
        this.animationList.push({
            props: props,
            duration: duration,
            ease: ease
        });
        return this;
    };
    SelfAnimation.prototype.beforeAnim = function (target) {
        for (var key in this._initProps) {
            target[key] = this._initProps[key];
        }
    };
    SelfAnimation.prototype.execute = function (target, callback) {
        this.animIndex = 0;
        this.play(target, callback);
    };
    SelfAnimation.prototype.clear = function () {
        this.animIndex = 0;
        this.animationList = new Array();
        this._initProps = {};
    };
    return SelfAnimation;
}());
__reflect(SelfAnimation.prototype, "SelfAnimation");
//# sourceMappingURL=SelfAnimation.js.map