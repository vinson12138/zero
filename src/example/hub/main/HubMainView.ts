module example {
    import EUILayer = zero.EUILayer;
    import System = zero.System;

    export class HubMainView extends EUILayer {
        public _btnGame: eui.Button;
        public _btnShop: eui.Button;
        public _btnAsset: eui.Button;
        public _btnSetting: eui.Button;

        public constructor() {
            super();
            this.skinName = "HubMainSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }


        protected childrenCreated(): void {
            super.childrenCreated();

            this._btnAsset.touchChildren = false;
            this._btnShop.touchChildren = false;
            this._btnGame.touchChildren = false;
            this._btnSetting.touchChildren = false;
        }

        private onTouch(e: egret.TouchEvent): void {
            if (e.target === this._btnShop) {
                zero.layerMgr.get(HubScene.POPUP).removeChildren();

                let shop = new eui.Panel();
                shop.title = "商店";
                shop.name = "shop";
                shop.width = 900;
                shop.height = 600;
                shop.anchorOffsetX = shop.width / 2;
                shop.anchorOffsetY = shop.height / 2;
                shop.x = System.width / 2;
                shop.y = System.height / 2;

                zero.layerMgr.get(HubScene.POPUP).addChild(shop);
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
                zero.layerMgr.get(HubScene.POPUP).removeChildren();

                let asset = new eui.Panel();
                asset.name = "asset";
                asset.title = "资产";
                asset.width = 600;
                asset.height = 360;
                asset.anchorOffsetX = asset.width / 2;
                asset.anchorOffsetY = asset.height / 2;
                asset.x = System.width / 2;
                asset.y = System.height / 2;

                zero.layerMgr.get(HubScene.POPUP).addChild(asset);
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
                zero.layerMgr.get(HubScene.POPUP).removeChildren();

                zero.sceneMgr.load(example.LoginScene);
            }

            if (e.target == this._btnGame) {
                zero.loadingMgr.setLoadingUI(new example.LoginLoadingUI());
                zero.sceneMgr.load(example.RPGScene1);
            }
        }

        /**
         * 放大,缩小的动画
         * @param {egret.DisplayObject} target 参与缓动的对象
         * @param duration 动画周期
         * @param {any} to 目标状态
         * @param {any} from 开始状态
         * @param onCompleted 动画完成的回调函数
         */
        private scaleAnimation(target: egret.DisplayObject, duration: number, from: any, to: any, onCompleted?: () => void): void {
            let toX: number = to.x ? to.x : target.x;
            let toY: number = to.y ? to.y : target.y;
            let toScaleX: number = to.scaleX ? to.scaleX : target.scaleX;
            let toScaleY: number = to.scaleY ? to.scaleY : target.scaleY;
            let toAlpha: number = to.alpha ? to.alpha : target.alpha;

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
        }

        /**
         * 缩小隐藏
         * @param {egret.DisplayObject} target 参与缓动的对象
         * @param {number} duration 动画周期
         * @param {any} from 开始状态
         * @param {any} to 目标状态
         */
        private scaleOut(target: egret.DisplayObject, duration: number, from: any, to: any): void {

        }
    }
}