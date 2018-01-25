var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var example;
(function (example) {
    var Scene = zero.Scene;
    var HubScene = (function (_super) {
        __extends(HubScene, _super);
        function HubScene() {
            var _this = _super.call(this) || this;
            zero.layerMgr.register(_this, example.LayerID.MAIN_UI, new example.HubMain(), "UI");
            zero.layerMgr.register(_this, example.LayerID.POPUP, new egret.DisplayObjectContainer());
            zero.layerMgr.register(_this, example.LayerID.TIP, null);
            return _this;
        }
        return HubScene;
    }(Scene));
    example.HubScene = HubScene;
    __reflect(HubScene.prototype, "example.HubScene");
})(example || (example = {}));
