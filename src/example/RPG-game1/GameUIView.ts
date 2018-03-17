/** Created by Neo on 2018/3/17 */

namespace example {
    import EUILayer = zero.EUILayer;
    /**
     * GameUIView类
     */
    export class GameUIView extends EUILayer{
        public _exitBtn:eui.Button;

        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.skinName = 'GameUI';
        }


        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private onTouch(e: egret.TouchEvent):void {
            if(e.target == this._exitBtn){
                zero.loadingMgr.setLoadingUI(new example.LoginLoadingUI());
                zero.sceneMgr.load(example.HubScene);
            }
        }
    }
}