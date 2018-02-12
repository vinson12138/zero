var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Neo on 2017/11/21
 */
var zero;
(function (zero) {
    var utils;
    (function (utils) {
        var Device = (function () {
            ////////////////////////////////////////////////////////////////////////////
            //public
            //请在此处书写所有的公有方法
            ////////////////////////////////////////////////////////////////////////////
            function Device() {
            }
            return Device;
        }());
        utils.Device = Device;
        __reflect(Device.prototype, "zero.utils.Device");
    })(utils = zero.utils || (zero.utils = {}));
})(zero || (zero = {}));
