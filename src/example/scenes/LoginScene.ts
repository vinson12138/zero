namespace example {
    import Scene = zero.Scene;
    export class LoginScene extends Scene {
        public constructor(){
            super();

            zero.layerMgr.register(this, LayerID.MAIN_UI, new LoginMain(), "UI层");
            zero.layerMgr.register(this, LayerID.POPUP, new egret.DisplayObjectContainer());
            zero.layerMgr.register(this, LayerID.TIP, null);
        }
    }
}