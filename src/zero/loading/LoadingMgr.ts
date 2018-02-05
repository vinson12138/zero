/** Created by Neo on 2018/2/3 */
namespace zero {
    /**
     * LoadingMgr类
     */
    export class LoadingMgr {
        private static _instance: LoadingMgr;
        private _loadingUI: LoadingUI;

        /**
         * 构造函数
         */
        public constructor() {
        }

        public static getInstance(): LoadingMgr {
            if (!this._instance) {
                this._instance = new LoadingMgr();
            }
            return this._instance;
        }

        /**
         * 设置将要显示的加载界面
         * @param {zero.ILoadingUI} loadingUI
         */
        public setLoadingUI(loadingUI: LoadingUI): void {
            this._loadingUI = loadingUI;
        }

        /**
         * 获取当前加载界面
         */
        public getLoadingUI(): LoadingUI {
            return this._loadingUI;
        }
    }
}