var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Http = (function () {
    function Http() {
        this.baseUrl = '';
    }
    Object.defineProperty(Http, "instance", {
        get: function () {
            if (!this.http) {
                this.http = new Http();
            }
            return this.http;
        },
        enumerable: true,
        configurable: true
    });
    Http.prototype.request = function (_a) {
        var _this = this;
        var _b = _a.method, method = _b === void 0 ? egret.HttpMethod.GET : _b, url = _a.url, _c = _a.params, params = _c === void 0 ? {} : _c, _d = _a.headers, headers = _d === void 0 ? {} : _d;
        if (!(/http(|s):\/\//.test(url))) {
            url = this.baseUrl + url;
        }
        var _params = '';
        var _headers = {};
        _headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // 如果有传入，则覆盖掉
        for (var key in headers) {
            _headers[key] = headers[key];
        }
        if (_headers['Content-Type'] === 'application/json') {
            _params = JSON.stringify(params);
            _params = _params.replace(/\+/g, "%2B").replace(/\&/g, "%26");
            // console.log(_params)
        }
        else {
            for (var key in params) {
                _params += key + "=" + ('' + params[key]).replace(/\&/g, "%26") + "&";
            }
            _params = _params.replace(/\+/g, "%2B");
            // console.log(_params)
            if (_params.length > 0) {
                _params = _params.substring(0, _params.length - 1);
            }
            if (method === egret.HttpMethod.GET) {
                url += "?" + _params;
            }
        }
        return new Promise(function (resolve, reject) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, method);
            for (var key in _headers) {
                request.setRequestHeader(key, _headers[key]);
            }
            if (method === egret.HttpMethod.GET) {
                request.send();
            }
            else {
                request.send(_params);
            }
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                dealResult(event);
            }, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                dealResult(event, false);
            }, _this);
            function dealResult(event, success) {
                if (success === void 0) { success = true; }
                var response;
                try {
                    response = JSON.parse(request.response);
                }
                catch (e) {
                    response = request.response;
                }
                if (success) {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }
        });
    };
    Http.prototype.setBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
    };
    Http.prototype.get = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.request({
            url: url,
            params: params,
            headers: headers
        });
    };
    Http.prototype.post = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.request({
            method: egret.HttpMethod.POST,
            url: url,
            params: params,
            headers: headers
        });
    };
    return Http;
}());
__reflect(Http.prototype, "Http");
//# sourceMappingURL=Http.js.map