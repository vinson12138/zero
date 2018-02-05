/** Created by Neo on 2018/2/3 */
namespace zero {
    /**
     * ILoadingUI接口
     */
    export interface ILoadingUI {
        /**
         * 设置加载进度
         * @param {number} loaded 已经加载
         * @param {number} total 总共
         */
        setProgress(loaded:number, total:number):void;

        /**
         * 显示加载界面
         */
        show():void;

        /**
         * 隐藏加载界面
         */
        hide():void;
    }
}