var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** Created by Neo on 2018/2/5 */
var zero;
(function (zero) {
    /**
     * LoadingUI类
     */
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        /**
         * 构造函数
         */
        function LoadingUI() {
            return _super.call(this) || this;
        }
        /**
         * 将加载界面添加到场景容器上
         * @param {number} index 层级
         */
        LoadingUI.prototype.show = function (index) {
            if (index === void 0) { index = 99; }
            zero.sceneMgr.sceneContainer.addChildAt(this, index);
        };
        /**
         * 将加载界面从父节点移除
         */
        LoadingUI.prototype.hide = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return LoadingUI;
    }(eui.Component));
    zero.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "zero.LoadingUI");
})(zero || (zero = {}));
