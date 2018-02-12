var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** Created by Neo on 2018/2/8 */
var zero;
(function (zero) {
    var Map = zero.utils.Map;
    /**
     * NotificationCenter类
     */
    var NotificationCenter = (function () {
        /**
         * 构造函数
         */
        function NotificationCenter() {
            this._observers = new Map();
        }
        NotificationCenter.getInstance = function () {
            if (!this._instance) {
                this._instance = new NotificationCenter();
            }
            return this._instance;
        };
        /**
         * 添加观察者
         * @param {zero.Controller} observer
         */
        NotificationCenter.prototype.attach = function (observer) {
            this._observers.put(egret.getQualifiedClassName(observer), observer);
        };
        /**
         * 发出通知
         * @param {string} name 通知的名称
         * @param data 通知包含的数据
         */
        NotificationCenter.prototype.notify = function (name, data) {
            var notification = new zero.Notification(name, data);
            var observers = this._observers.values;
            for (var _i = 0, observers_1 = observers; _i < observers_1.length; _i++) {
                var observer = observers_1[_i];
                if (!observer)
                    return;
                var notificationList = observer.notificationList();
                if (!notificationList || notificationList.indexOf(name) < 0)
                    return;
                observer.handleNotification(notification);
            }
        };
        NotificationCenter.prototype.onRemove = function () {
            var observers = this._observers.values;
            for (var _i = 0, observers_2 = observers; _i < observers_2.length; _i++) {
                var observer = observers_2[_i];
                if (!observer)
                    return;
                observer.onRemove();
                observer = null;
            }
            this._observers.removeAll();
        };
        return NotificationCenter;
    }());
    zero.NotificationCenter = NotificationCenter;
    __reflect(NotificationCenter.prototype, "zero.NotificationCenter");
})(zero || (zero = {}));
