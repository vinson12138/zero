namespace example {
    import Scene = zero.Scene;
    export class HubScene extends Scene {
        public constructor(){
            super();
            zero.layerMgr.register(this, LayerID.MAIN_UI, new HubMain(), "UI");
            zero.layerMgr.register(this, LayerID.POPUP, new egret.DisplayObjectContainer());
            zero.layerMgr.register(this, LayerID.TIP, null);
        }
    }
}