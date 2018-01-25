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
         * 将某个图层添加到场景中
         * @param {zero.Scene} scene 场景
         * @param {number} layerID 图层编号
         * @param {egret.DisplayObject} layer 图层
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
                this._layers[layerID] = null;
            }
        };
        /**
         * 获取当前活动的场景上的某个图层
         * @param {number} layerID
         * @returns {egret.DisplayObject}
         */
        LayerMgr.prototype.get = function (layerID) {
            var layer = this._layers[layerID];
            if (!layer) {
                console.warn("ID\u4E3A[" + layerID + "]\u7684\u56FE\u5C42\u5E76\u672A\u88AB\u6DFB\u52A0\u5230\u4EFB\u4F55\u573A\u666F\u4E0A");
                layer = null;
            }
            return layer;
        };
        return LayerMgr;
    }());
    zero.LayerMgr = LayerMgr;
    __reflect(LayerMgr.prototype, "zero.LayerMgr");
})(zero || (zero = {}));
