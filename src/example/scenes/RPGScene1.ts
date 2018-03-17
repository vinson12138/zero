namespace example {
    import Scene = zero.Scene;
    import Layer = zero.Layer;
    import EUILayer = zero.EUILayer;

    export class RPGScene1 extends Scene {
        public static readonly MAP:number = 0;
        public static readonly UI:number = 1;
        public static readonly POPUP:number = 2;
        public static readonly TIP:number = 3;

        public constructor(){
            super();

            this.groupName = 'rpg_game';
            this.autoReleaseResource = true;
        }

        protected onLoadComplete():void {
            super.onLoadComplete();
            zero.layerMgr.register(this, RPGScene1.MAP, new GameMainView(), "Map层");

            zero.layerMgr.register(this, RPGScene1.UI, new GameUIView(), "UI");
            // zero.layerMgr.register(this, RPGScene1.POPUP, new Layer());
            // zero.layerMgr.register(this, RPGScene1.TIP, new EUILayer(), "提示层");
            //
            // zero.notificationCenter.attach(new HubMainController(hubMainView))
        }
    }

}