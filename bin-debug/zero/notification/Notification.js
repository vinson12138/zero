var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** Created by Neo on 2018/2/8 */
var zero;
(function (zero) {
    /**
     * Notification类
     * 通知的数据结构
     */
    var Notification = (function () {
        /**
         * 构造函数
         */
        function Notification(name, data) {
            this._name = name;
            this._data = data;
        }
        /**
         * 返回通知的名称
         * @returns {string}
         */
        Notification.prototype.getName = function () {
            return this._name;
        };
        /**
         * 返回通知携带的数据
         * @returns {any}
         */
        Notification.prototype.getData = function () {
        };
        return Notification;
    }());
    zero.Notification = Notification;
    __reflect(Notification.prototype, "zero.Notification");
})(zero || (zero = {}));
