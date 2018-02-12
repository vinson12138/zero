var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** Created by Neo on 2018/2/8 */
var zero;
(function (zero) {
    /**
     * Controller类
     */
    var Controller = (function () {
        /**
         * 构造函数
         */
        function Controller(view) {
            this._view = view;
        }
        Controller.prototype.onRemove = function () {
            this._view = null;
        };
        /**
         * 感兴趣的消息通知列表
         * @returns {string[]}
         */
        Controller.prototype.notificationList = function () {
            return Array();
        };
        Controller.prototype.getView = function () {
            return this._view;
        };
        return Controller;
    }());
    zero.Controller = Controller;
    __reflect(Controller.prototype, "zero.Controller");
})(zero || (zero = {}));
