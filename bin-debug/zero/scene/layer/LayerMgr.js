var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    var LayerMgr = (function () {
        function LayerMgr() {
            this._layers = [];
        }
        LayerMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new LayerMgr();
            }
            return this._instance;
        };
        /**
         * @param {zero.Scene} scene
         * @param {number} layerID
         * @param {zero.Layer | zero.EUILayer} layer
         * @param {string} layerName 图层的名字 可选（主要调试时会用到）
         */
        LayerMgr.prototype.register = function (scene, layerID, layer, layerName) {
            if (layer) {
                layer.name = layerName ? layerName : "";
                scene.addChild(layer);
                this._layers[layerID] = layer;
            }
        };
        /**
         * 将某个图层与当前场景解绑
         * @param {number} layerID
         */
        LayerMgr.prototype.unbind = function (layerID) {
            var layer = this.get(layerID);
            if (layer && layer.parent) {
                layer.parent.removeChild(layer);
                layer = null;
            }
        };
        /**
         * 将所有图层与当前活动的场景解绑
         */
        LayerMgr.prototype.unbindAll = function () {
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                if (!layer)
                    continue;
                if (layer && layer.parent) {
                    layer.parent.removeChild(layer);
                    layer = null;
                }
            }
            this._layers = [];
        };
        /**
         *  获取当前活动的场景上的某个图层
         * @param {number} layerID
         * @returns {zero.Layer | zero.EUILayer}
         */
        LayerMgr.prototype.get = function (layerID) {
            var layer = this._layers[layerID];
            if (!layer) {
                console.warn("ID\u4E3A[" + layerID + "]\u7684\u56FE\u5C42\u5E76\u672A\u4E0D\u5B58\u5728");
                layer = null;
            }
            return layer;
        };
        return LayerMgr;
    }());
    zero.LayerMgr = LayerMgr;
    __reflect(LayerMgr.prototype, "zero.LayerMgr");
})(zero || (zero = {}));
