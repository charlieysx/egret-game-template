var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Api = (function () {
    function Api() {
        var baseUrl = 'http://xxx.com';
        if (true) {
            baseUrl = 'http://localhost:3000';
        }
        Http.instance.setBaseUrl(baseUrl);
    }
    Object.defineProperty(Api, "instance", {
        get: function () {
            if (!this.api) {
                this.api = new Api();
            }
            return this.api;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 统一处理结果
     */
    Api.prototype.predeal = function (http) {
        return http.then(function (response) {
            if (response.code == '0') {
                // 这个结构根据自己的数据确定
                return Promise.resolve(response.payload.data || response.payload || response);
            }
            else {
                return Promise.reject(response);
            }
        })
            .catch(function (response) {
            return Promise.reject(response.msg || '请求出错');
        });
    };
    /**
     * get
     */
    Api.prototype.get = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.predeal(Http.instance.get(url, params, headers));
    };
    /**
     * post
     */
    Api.prototype.post = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.predeal(Http.instance.post(url, params, headers));
    };
    /**
     * get例子
     */
    Api.prototype.getInfo = function () {
        return this.get('/info');
    };
    /**
     * post例子
     */
    Api.prototype.postInfo = function (params) {
        return this.post('/info', params);
    };
    return Api;
}());
__reflect(Api.prototype, "Api");
//# sourceMappingURL=Api.js.map