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
    var HubMain = (function (_super) {
        __extends(HubMain, _super);
        function HubMain() {
            var _this = _super.call(this) || this;
            _this.skinName = "HubMainSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            return _this;
        }
        HubMain.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        HubMain.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._btnAsset.touchChildren = false;
            this._btnShop.touchChildren = false;
            this._btnGame.touchChildren = false;
            this._btnSetting.touchChildren = false;
        };
        HubMain.prototype.onTouch = function (e) {
            if (e.target === this._btnShop) {
                zero.layerMgr.get(example.LayerID.POPUP).removeChildren();
                var shop = new eui.Panel();
                shop.name = "shop";
                shop.width = 800;
                shop.height = 500;
                shop.title = "商店";
                shop.horizontalCenter = 1;
                shop.verticalCenter = 1;
                zero.layerMgr.get(example.LayerID.POPUP).addChild(shop);
                return;
            }
            if (e.target === this._btnAsset) {
                zero.layerMgr.get(example.LayerID.POPUP).removeChildren();
                var asset = new eui.Panel();
                asset.name = "asset";
                asset.width = 600;
                asset.height = 360;
                asset.title = "资产";
                asset.horizontalCenter = 1;
                asset.verticalCenter = 1;
                zero.layerMgr.get(example.LayerID.POPUP).addChild(asset);
                return;
            }
            if (e.target === this._btnSetting) {
                zero.layerMgr.get(example.LayerID.POPUP).removeChildren();
                zero.sceneMgr.load(example.LoginScene);
            }
        };
        return HubMain;
    }(eui.Component));
    example.HubMain = HubMain;
    __reflect(HubMain.prototype, "example.HubMain", ["eui.UIComponent", "egret.DisplayObject"]);
})(example || (example = {}));
