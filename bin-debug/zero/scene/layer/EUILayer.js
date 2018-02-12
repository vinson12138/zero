var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zero;
(function (zero) {
    /**
     * 继承自<code>eui.Component</code>的图层类
     * 可以设置皮肤文件
     * 默认不可触摸
     */
    var EUILayer = (function (_super) {
        __extends(EUILayer, _super);
        /**
         * 构造函数
         */
        function EUILayer() {
            var _this = _super.call(this) || this;
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            _this.touchEnabled = false;
            return _this;
        }
        return EUILayer;
    }(eui.Component));
    zero.EUILayer = EUILayer;
    __reflect(EUILayer.prototype, "zero.EUILayer");
})(zero || (zero = {}));
