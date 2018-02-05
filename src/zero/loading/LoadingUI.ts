/** Created by Neo on 2018/2/5 */
namespace zero {
    /**
     * LoadingUI类
     */
    export abstract class LoadingUI extends eui.Component{
        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        public abstract setProgress(loaded: number, total:number):void;

        /**
         * 将加载界面添加到场景容器上
         * @param {number} index 层级
         */
        public show(index:number = 99):void {
            zero.sceneMgr.sceneContainer.addChildAt(this, index);
        }

        /**
         * 将加载界面从父节点移除
         */
        public hide():void {
            if(this.parent){
                this.parent.removeChild(this);
            }
        }
    }
}