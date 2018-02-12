var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** Created by Neo on 2018/2/3 */
var zero;
(function (zero) {
    /**
     * LoadingMgr类
     */
    var LoadingMgr = (function () {
        /**
         * 构造函数
         */
        function LoadingMgr() {
        }
        LoadingMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new LoadingMgr();
            }
            return this._instance;
        };
        /**
         * 设置将要显示的加载界面
         * @param {zero.ILoadingUI} loadingUI
         */
        LoadingMgr.prototype.setLoadingUI = function (loadingUI) {
            this._loadingUI = loadingUI;
        };
        /**
         * 获取当前加载界面
         */
        LoadingMgr.prototype.getLoadingUI = function () {
            return this._loadingUI;
        };
        return LoadingMgr;
    }());
    zero.LoadingMgr = LoadingMgr;
    __reflect(LoadingMgr.prototype, "zero.LoadingMgr");
})(zero || (zero = {}));
