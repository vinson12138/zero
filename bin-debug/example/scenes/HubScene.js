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
    var Controller = zero.Controller;
    var HubScene = (function (_super) {
        __extends(HubScene, _super);
        function HubScene() {
            var _this = _super.call(this) || this;
            var hubMainView = new example.HubMainView();
            zero.layerMgr.register(_this, HubScene.UI, hubMainView, "UI");
            zero.layerMgr.register(_this, HubScene.POPUP, new Layer());
            zero.layerMgr.register(_this, HubScene.TIP, new EUILayer(), "提示层");
            _this.autoReleaseResource = true;
            zero.notificationCenter.attach(new HubMainController(hubMainView));
            return _this;
        }
        return HubScene;
    }(Scene));
    HubScene.UI = 0;
    HubScene.POPUP = 1;
    HubScene.TIP = 2;
    example.HubScene = HubScene;
    __reflect(HubScene.prototype, "example.HubScene");
    var HubMainController = (function (_super) {
        __extends(HubMainController, _super);
        function HubMainController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HubMainController.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
        };
        HubMainController.prototype.notificationList = function () {
            return [];
        };
        HubMainController.prototype.handleNotification = function (notification) {
        };
        return HubMainController;
    }(Controller));
    example.HubMainController = HubMainController;
    __reflect(HubMainController.prototype, "example.HubMainController");
})(example || (example = {}));
