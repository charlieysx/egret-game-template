var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Router = (function () {
    function Router() {
        /**
         * 当前路由信息
         */
        this._route = { name: '', meta: null, scene: null, params: null };
        this._params = { meta: null, params: null };
        /**
         * 路由映射表
         */
        this._routeMap = new SelfMap();
        /**
         *
         */
        this._beforeEach = function (to, from, next) { next(); };
        this._currentLeavePage = null;
    }
    Object.defineProperty(Router, "instance", {
        get: function () {
            if (!this.router) {
                this.router = new Router();
            }
            return this.router;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "params", {
        get: function () {
            return this.instance._params.params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "meta", {
        get: function () {
            return this.instance._params.meta;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化，设置放置页面的容器
     */
    Router.init = function (main) {
        if (this.instance._stage) {
            console.log('已经创建过场景容器');
            return;
        }
        if (!main) {
            console.log('主场景不能为空');
            return;
        }
        // 创建一个新容器放在main上，专门用来存放页面，这样能保证toast一直在所有页面上
        this.instance._stage = new egret.DisplayObjectContainer();
        main.addChild(this.instance._stage);
        return this;
    };
    /**
     * 注册页面
     */
    Router.register = function (key, className, meta) {
        if (meta === void 0) { meta = null; }
        this.instance._routeMap.put(key, { className: className, name: key, meta: meta });
        return this;
    };
    /**
     * 跳转路由之前做的事
     */
    Router.beforeEach = function (beforeEach) {
        this.instance._beforeEach = beforeEach;
        return this;
    };
    /**
     * 设置页面离开动画
     */
    Router.setLeaveAnimation = function (animation) {
        this.instance._leaveAnimation = animation;
        return this;
    };
    /**
     * 设置页面进入动画
     */
    Router.setEnterAnimation = function (animation) {
        this.instance._enterAnimation = animation;
        return this;
    };
    /**
     * 退出页面，有动画就执行动画
     */
    Router.prototype.leavePage = function (page, callback, leaveAnimation) {
        if (!page) {
            callback && callback();
            return;
        }
        var animation = leaveAnimation || this._leaveAnimation;
        page.onDestory();
        if (animation) {
            animation.execute(page, function () {
                callback && callback();
            });
        }
        else {
            callback && callback();
        }
    };
    /**
     * 加载页面，有动画就执行动画
     */
    Router.prototype.enterPage = function (page, callback, enterAnimation) {
        var animation = enterAnimation || this._enterAnimation;
        if (animation) {
            animation.beforeAnim(page);
        }
        this._stage.addChild(page);
        if (animation) {
            animation.execute(page, function () {
                callback && callback();
            });
        }
        else {
            callback && callback();
        }
    };
    Router.to = function (config) {
        var _this = this;
        var page = this.instance._routeMap.get(config.name);
        if (page == undefined) {
            console.error("scene " + config.name + " is not register");
            return;
        }
        var currentRoute = this.instance._route;
        this.instance._beforeEach(page, currentRoute, function (to) {
            if (to === void 0) { to = config.name; }
            if (to != config.name) {
                config.name = to;
                page = _this.instance._routeMap.get(config.name);
                if (page == undefined) {
                    console.error("scene " + config.name + " is not register");
                    return;
                }
            }
            var currentLeavePage = _this.instance._currentLeavePage;
            // 如果当前离开的页面跟正要离开的页面一样，不执行
            if (currentLeavePage && currentRoute.scene && currentLeavePage.pageName === currentRoute.scene.pageName) {
                return;
            }
            // 如果要进入的页面跟当前页面一样，不执行
            if (config.name === currentRoute.name) {
                return;
            }
            _this.instance._currentLeavePage = currentRoute.scene;
            currentLeavePage = currentRoute.scene;
            _this.instance.leavePage(currentRoute.scene, function () {
                currentLeavePage && currentLeavePage.afterLeaveAnimation();
                var newPage = new page.className(config.name);
                _this.instance._params.meta = page.meta;
                _this.instance._params.params = config.params;
                _this.instance.enterPage(newPage, function () {
                    currentLeavePage && _this.instance._stage.removeChild(currentLeavePage);
                    currentLeavePage = _this.instance._currentLeavePage = null;
                    currentRoute.name = config.name;
                    currentRoute.meta = page.meta;
                    currentRoute.scene = newPage;
                    currentRoute.params = config.params;
                    newPage.afterEnterAnimation();
                }, config.enterAnimation);
            }, config.leaveAnimation);
        });
    };
    return Router;
}());
__reflect(Router.prototype, "Router");
//# sourceMappingURL=Router.js.map