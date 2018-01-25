namespace zero {
    /**
     * 游戏场景基类
     */
    export class Scene extends eui.UILayer {
        public constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = true;

        }

        /**
         * 唤醒场景
         */
        public awake(): void {
        };

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
            // console.log("销毁类");
            // this.$children.forEach(node => {
            // 	node = null;
            // });
            // this.removeChildren();
            // console.log(this);
        }
    }
}