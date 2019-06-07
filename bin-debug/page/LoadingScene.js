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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barWidth = 0;
        _this.barHeight = 0;
        _this.startTime = 0;
        _this.preload = 2; // preload资源组的数量
        _this.main = 100 - _this.preload;
        return _this;
    }
    LoadingScene.prototype.onAddToStage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.drawBg();
                        this.initProgress();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.startTime = new Date().getTime();
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json?v=" + Math.random(), "resource/")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, {
                                onProgress: function (current, total) {
                                    var progress = current / total * _this.preload;
                                    var width = _this.barWidth * progress / 100;
                                    _this.drawProgress(width, Math.floor(progress));
                                }
                            })
                            // 因为logo是图片，需要等资源加载回来才可以绘制
                        ];
                    case 3:
                        _a.sent();
                        // 因为logo是图片，需要等资源加载回来才可以绘制
                        this.drawLogo();
                        this.load();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LoadingScene.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadGroup("main", 0, {
                            onProgress: function (current, total) {
                                var progress = current / total * _this.main + _this.preload;
                                var width = _this.barWidth * progress / 100;
                                _this.drawProgress(width, Math.floor(progress));
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadingScene.prototype.initProgress = function () {
        this.barWidth = this.width * 0.6;
        this.barHeight = 20;
        this.progressBar = new egret.Shape();
        this.progressBar.width = this.barWidth;
        this.progressBar.height = this.barHeight;
        this.progressBar.x = (this.width - this.barWidth) / 2;
        this.progressBar.y = (this.height - this.barHeight) / 2;
        this.addChild(this.progressBar);
        this.progressText = new egret.TextField();
        this.progressText.textColor = 0x005660;
        this.progressText.size = 28;
        this.progressText.strokeColor = 0xFFFFFF;
        this.progressText.stroke = 3;
        this.progressText.width = this.width;
        this.progressText.textAlign = 'center';
        this.progressText.text = '0%';
        this.progressText.y = this.progressBar.y - this.progressText.height - 20;
        this.addChild(this.progressText);
    };
    LoadingScene.prototype.drawProgress = function (width, progress) {
        this.progressBar.graphics.clear();
        this.progressBar.graphics.beginFill(0xFFFFFF, 1);
        this.progressBar.graphics.drawRoundRect(0, 0, width, this.barHeight, this.barHeight, this.barHeight);
        this.progressBar.graphics.endFill();
        this.progressText.text = progress + "%";
        if (progress == 100) {
            var diff = new Date().getTime() - this.startTime;
            diff = diff < 1000 ? (1000 - diff) : 300;
            egret.setTimeout(function () {
                // 加载完成跳转到游戏页面
                Router.to({ name: 'game' });
            }, this, diff);
        }
    };
    LoadingScene.prototype.drawBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x56A1D2);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    LoadingScene.prototype.drawLogo = function () {
        var logo = ResUtil.createBitmap('egret_icon');
        logo.x = (this.width - logo.width) / 2;
        this.addChild(logo);
    };
    return LoadingScene;
}(BaseScene));
__reflect(LoadingScene.prototype, "LoadingScene");
//# sourceMappingURL=LoadingScene.js.map