var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var example;
(function (example) {
    var EUILayer = zero.EUILayer;
    var System = zero.System;
    var HubMainView = (function (_super) {
        __extends(HubMainView, _super);
        function HubMainView() {
            var _this = _super.call(this) || this;
            _this.skinName = "HubMainSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            return _this;
        }
        HubMainView.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        HubMainView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._btnAsset.touchChildren = false;
            this._btnShop.touchChildren = false;
            this._btnGame.touchChildren = false;
            this._btnSetting.touchChildren = false;
        };
        HubMainView.prototype.onTouch = function (e) {
            if (e.target === this._btnShop) {
                zero.layerMgr.get(example.HubScene.POPUP).removeChildren();
                var shop = new eui.Panel();
                shop.title = "商店";
                shop.name = "shop";
                shop.width = 900;
                shop.height = 600;
                shop.anchorOffsetX = shop.width / 2;
                shop.anchorOffsetY = shop.height / 2;
                shop.x = System.width / 2;
                shop.y = System.height / 2;
                zero.layerMgr.get(example.HubScene.POPUP).addChild(shop);
                this.scaleAnimation(shop, 300, {
                    x: this._btnShop.x + this._btnShop.width / 2,
                    y: this._btnShop.y + this._btnShop.height / 2,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0
                }, {
                    x: shop.x, y: shop.y, scaleX: 1,
                    scaleY: 1,
                    alpha: 1
                });
                return;
            }
            if (e.target === this._btnAsset) {
                zero.layerMgr.get(example.HubScene.POPUP).removeChildren();
                var asset = new eui.Panel();
                asset.name = "asset";
                asset.title = "资产";
                asset.width = 600;
                asset.height = 360;
                asset.anchorOffsetX = asset.width / 2;
                asset.anchorOffsetY = asset.height / 2;
                asset.x = System.width / 2;
                asset.y = System.height / 2;
                zero.layerMgr.get(example.HubScene.POPUP).addChild(asset);
                this.scaleAnimation(asset, 300, {
                    x: this._btnAsset.x + this._btnAsset.width / 2,
                    y: this._btnAsset.y + this._btnAsset.height / 2, scaleX: 0,
                    scaleY: 0,
                    alpha: 0
                }, {
                    x: asset.x, y: asset.y, scaleX: 1,
                    scaleY: 1,
                    alpha: 1
                });
                return;
            }
            if (e.target === this._btnSetting) {
                zero.layerMgr.get(example.HubScene.POPUP).removeChildren();
                zero.sceneMgr.load(example.LoginScene);
            }
            if (e.target == this._btnGame) {
                zero.loadingMgr.setLoadingUI(new example.LoginLoadingUI());
                zero.sceneMgr.load(example.RPGScene1);
            }
        };
        /**
         * 放大,缩小的动画
         * @param {egret.DisplayObject} target 参与缓动的对象
         * @param duration 动画周期
         * @param {any} to 目标状态
         * @param {any} from 开始状态
         * @param onCompleted 动画完成的回调函数
         */
        HubMainView.prototype.scaleAnimation = function (target, duration, from, to, onCompleted) {
            var toX = to.x ? to.x : target.x;
            var toY = to.y ? to.y : target.y;
            var toScaleX = to.scaleX ? to.scaleX : target.scaleX;
            var toScaleY = to.scaleY ? to.scaleY : target.scaleY;
            var toAlpha = to.alpha ? to.alpha : target.alpha;
            target.x = from.x ? from.x : target.x;
            target.y = from.y ? from.y : target.y;
            target.scaleX = from.scaleX ? from.scaleX : target.scaleX;
            target.scaleY = from.scaleY ? from.scaleY : target.scaleY;
            target.alpha = from.alpha ? from.alpha : target.alpha;
            egret.Tween.removeTweens(target);
            egret.Tween.get(target).to({
                x: toX,
                y: toY,
                scaleX: toScaleX,
                scaleY: toScaleY,
                alpha: toAlpha
            }, duration, egret.Ease.quartOut);
        };
        /**
         * 缩小隐藏
         * @param {egret.DisplayObject} target 参与缓动的对象
         * @param {number} duration 动画周期
         * @param {any} from 开始状态
         * @param {any} to 目标状态
         */
        HubMainView.prototype.scaleOut = function (target, duration, from, to) {
        };
        return HubMainView;
    }(EUILayer));
    example.HubMainView = HubMainView;
    __reflect(HubMainView.prototype, "example.HubMainView");
})(example || (example = {}));
