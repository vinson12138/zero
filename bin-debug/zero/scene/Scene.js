var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zero;
(function (zero) {
    /**
     * 游戏场景基类
     * 每个场景应该负责资源的加载和释放
     */
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            var _this = _super.call(this) || this;
            /**
             * 卸载场景时，是否自动释放资源
             * @type {boolean}
             */
            _this.autoReleaseResource = false;
            _this.touchEnabled = false;
            _this.touchChildren = true;
            return _this;
        }
        /**
         * 预加载场景
         */
        Scene.prototype.preload = function () {
            if (!this.groupName) {
                this.onLoadComplete();
                return;
            }
            var loading = zero.loadingMgr.getLoadingUI();
            if (loading)
                loading.show();
            //加载资源
            zero.ResUtils.loadGroup(this.groupName, this.onLoadProgress, this.onLoadComplete, null, this);
        };
        /**
         * 场景是否正在卸载
         */
        Scene.prototype.isUnloading = function () {
            return;
        };
        /**
         * 场景预卸载处理
         */
        Scene.prototype.preUnload = function () {
        };
        /**
         * 卸载场景
         */
        Scene.prototype.unload = function () {
            console.log("销毁类的实例_" + egret.getQualifiedClassName(this));
            this.$children.forEach(function (node) {
                node = null;
            });
            this.removeChildren();
            if (this.autoReleaseResource) {
                RES.destroyRes(this.groupName);
            }
        };
        Scene.prototype.onLoadComplete = function () {
            var loading = zero.loadingMgr.getLoadingUI();
            if (loading)
                loading.hide();
        };
        Scene.prototype.onLoadProgress = function (e) {
            var loading = zero.loadingMgr.getLoadingUI();
            if (loading)
                loading.setProgress(e.itemsLoaded, e.itemsTotal);
        };
        return Scene;
    }(eui.UILayer));
    zero.Scene = Scene;
    __reflect(Scene.prototype, "zero.Scene");
})(zero || (zero = {}));
