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
     * 继承自<code>egret.DisplayObjectContainer</code>的图层类
     * 可以作为显示容器，也可作为显示对象
     * 默认为不可触摸
     */
    var Layer = (function (_super) {
        __extends(Layer, _super);
        /**
         * 构造函数
         */
        function Layer() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            return _this;
        }
        return Layer;
    }(egret.DisplayObjectContainer));
    zero.Layer = Layer;
    __reflect(Layer.prototype, "zero.Layer");
})(zero || (zero = {}));
