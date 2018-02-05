namespace example {
    import Scene = zero.Scene;
    import Layer = zero.Layer;
    import EUILayer = zero.EUILayer;

    export class HubScene extends Scene {
        public static readonly UI:number = 0;
        public static readonly POPUP:number = 1;
        public static readonly TIP:number = 2;

        public constructor(){
            super();
            zero.layerMgr.register(this, HubScene.UI, new HubMain(), "UI");
            zero.layerMgr.register(this, HubScene.POPUP, new Layer());
            zero.layerMgr.register(this, HubScene.TIP, new EUILayer(), "提示层");
        }
    }
}