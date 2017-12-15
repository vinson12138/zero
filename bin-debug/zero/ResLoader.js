var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    var asset;
    (function (asset) {
        var ResLoader = (function () {
            function ResLoader() {
            }
            ResLoader.prototype.loadConfig = function (url, root, type) {
                RES.loadConfig(url, root, type);
            };
            Object.defineProperty(ResLoader.prototype, "onConfigComplete", {
                set: function (hander) {
                    this._onConfigComplete = hander;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResLoader.prototype, "onGroupComplete", {
                set: function (hander) {
                    this.onGroupComplete = hander;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResLoader.prototype, "onGroupError", {
                set: function (hander) {
                    this.onGroupError = hander;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResLoader.prototype, "onGroupProgress", {
                set: function (hander) {
                    this._onGroupProgress = hander;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResLoader.prototype, "onItemError", {
                set: function (hander) {
                    this._onItemError = hander;
                },
                enumerable: true,
                configurable: true
            });
            return ResLoader;
        }());
        asset.ResLoader = ResLoader;
        __reflect(ResLoader.prototype, "zero.asset.ResLoader");
    })(asset = zero.asset || (zero.asset = {}));
})(zero || (zero = {}));
