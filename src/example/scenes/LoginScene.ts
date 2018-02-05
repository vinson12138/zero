namespace example {
    import Scene = zero.Scene;
    import EUILayer = zero.EUILayer;
    export class LoginScene extends Scene {
        public static readonly UI:number = 0;
        public static readonly POPUP:number = 1;
        public static readonly TIP:number = 2;

        public constructor(){
            super();

            zero.layerMgr.register(this, LoginScene.UI, new LoginMain(), "UI层");
            zero.layerMgr.register(this, LoginScene.POPUP, new EUILayer());
            zero.layerMgr.register(this, LoginScene.TIP, new EUILayer());

            this.groupName = 'preload';
        }

    }
}