var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CacheStorge = (function () {
    function CacheStorge() {
        var _this = this;
        /**
         * key的前缀
         */
        this.keyPrefix = 'XSJBH-LIANLIANKAN';
        this.generateKey = function (key) {
            return (_this.keyPrefix + ":" + key).toUpperCase();
        };
        var href = window.location.href;
        var version = '';
        if (true) {
            version = 'local';
        }
        else {
            try {
                version = href.split('?')[0].split('#')[0].split('/').pop();
            }
            catch (e) {
                console.log(href);
            }
        }
        this.keyPrefix += "-" + version;
    }
    Object.defineProperty(CacheStorge, "instance", {
        get: function () {
            if (!this.cacheStorge) {
                this.cacheStorge = new CacheStorge();
            }
            return this.cacheStorge;
        },
        enumerable: true,
        configurable: true
    });
    CacheStorge.prototype.save = function (key, value) {
        var saveValue;
        try {
            saveValue = JSON.stringify(value);
        }
        catch (e) {
            saveValue = value;
        }
        window.localStorage.setItem(this.generateKey(key), saveValue);
    };
    CacheStorge.prototype.load = function (key, defaultValue) {
        var value = window.localStorage.getItem(this.generateKey(key));
        if (value === null) {
            return defaultValue;
        }
        try {
            value = JSON.parse(value);
        }
        catch (e) {
            value = defaultValue;
        }
        return value;
    };
    return CacheStorge;
}());
__reflect(CacheStorge.prototype, "CacheStorge");
//# sourceMappingURL=CacheStorge.js.map