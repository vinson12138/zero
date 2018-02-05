module example {
    import EUILayer = zero.EUILayer;
    export class HubMain extends EUILayer {
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
                shop.name = "shop";
                shop.width = 800;
                shop.height = 500;
                shop.title = "商店";
                shop.horizontalCenter = 0;
                shop.verticalCenter = 0;

                zero.layerMgr.get(HubScene.POPUP).addChild(shop);

                return;
            }
            if (e.target === this._btnAsset) {
                zero.layerMgr.get(HubScene.POPUP).removeChildren();

                let asset = new eui.Panel();
                asset.name = "asset";
                asset.width = 600;
                asset.height = 360;
                asset.title = "资产";
                asset.horizontalCenter = 0;
                asset.verticalCenter = 0;

                zero.layerMgr.get(HubScene.POPUP).addChild(asset);

                return;
            }
            if (e.target === this._btnSetting) {
                zero.layerMgr.get(HubScene.POPUP).removeChildren();

                zero.sceneMgr.load(example.LoginScene);

            }

        }
    }
}