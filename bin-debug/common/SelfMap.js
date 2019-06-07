var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SelfMap = (function () {
    function SelfMap() {
        this.datas = {};
    }
    Object.defineProperty(SelfMap.prototype, "list", {
        get: function () {
            return this.datas;
        },
        enumerable: true,
        configurable: true
    });
    SelfMap.prototype.put = function (key, data) {
        this.datas[key] = data;
    };
    SelfMap.prototype.delete = function (key) {
        var data = this.get(key);
        if (data) {
            delete this.datas[key];
        }
        return data;
    };
    SelfMap.prototype.get = function (key) {
        return this.datas[key];
    };
    return SelfMap;
}());
__reflect(SelfMap.prototype, "SelfMap");
//# sourceMappingURL=SelfMap.js.map