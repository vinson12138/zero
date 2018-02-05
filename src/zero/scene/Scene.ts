namespace zero {
    /**
     * 游戏场景基类
     * 每个场景应该负责资源的加载和释放
     */
    export abstract class Scene extends eui.UILayer {
        public groupName:string;
        public constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = true;

        }
        public preload():void {
            if(!this.groupName) return;

            let loading:ILoadingUI = zero.loadingMgr.getLoadingUI();
            if(loading)loading.show();

            //加载资源
            zero.ResUtils.loadGroup(this.groupName, this.onLoadProgress, this.onLoadComplete, null, this);
        }

        /**
         * 场景是否正在卸载
         */
        public isUnloading(): boolean {
            return
        }

        /**
         * 场景预卸载处理
         */
        public preUnload(): void {
        }

        /**
         * 卸载场景
         */
        public unload(): void {
            console.log("销毁类");
            this.$children.forEach(node => {
            	node = null;
            });
            this.removeChildren();
        }

        protected onLoadComplete():void {
            let loading:ILoadingUI = zero.loadingMgr.getLoadingUI();
            if(loading) loading.hide();
        }

        private onLoadProgress(e:RES.ResourceEvent):void {
            let loading:ILoadingUI = zero.loadingMgr.getLoadingUI();
            if(loading) loading.setProgress(e.itemsLoaded, e.itemsTotal);
        }



    }
}