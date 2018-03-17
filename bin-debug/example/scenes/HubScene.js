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
    var Layer = zero.Layer;
    var EUILayer = zero.EUILayer;
    var HubScene = (function (_super) {
        __extends(HubScene, _super);
        function HubScene() {
            var _this = _super.call(this) || this;
            _this.autoReleaseResource = true;
            return _this;
        }
        HubScene.prototype.onLoadComplete = function () {
            _super.prototype.onLoadComplete.call(this);
            var hubMainView = new example.HubMainView();
            zero.layerMgr.register(this, HubScene.UI, hubMainView, "UI");
            zero.layerMgr.register(this, HubScene.POPUP, new Layer());
            zero.layerMgr.register(this, HubScene.TIP, new EUILayer(), "提示层");
            zero.notificationCenter.attach(new example.HubMainController(hubMainView));
        };
        return HubScene;
    }(Scene));
    HubScene.UI = 0;
    HubScene.POPUP = 1;
    HubScene.TIP = 2;
    example.HubScene = HubScene;
    __reflect(HubScene.prototype, "example.HubScene");
})(example || (example = {}));
