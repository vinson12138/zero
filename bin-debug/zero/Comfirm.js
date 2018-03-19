var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var zero;
(function (zero) {
    var component;
    (function (component) {
        var Confirm = (function (_super) {
            __extends(Confirm, _super);
            function Confirm(content, btns, callbackfns, thisObj) {
                var _this = _super.call(this) || this;
                _this.content = content;
                _this.btns = btns;
                _this.callbacks = callbackfns;
                _this.thisObj = thisObj;
                return _this;
            }
            Confirm.prototype.show = function () {
                console.log(this.content);
                for (var i = 0, len = this.btns.length; i < len; i++) {
                    console.log("\t" + this.btns[i]);
                }
            };
            Confirm.prototype.clickBtn = function (index) {
                if (index >= this.callbacks.length || index < 0)
                    return;
                console.log("点击了---" + this.btns[index]);
                this.callbacks[index].call(this.thisObj);
            };
            ;
            return Confirm;
        }(egret.DisplayObjectContainer));
        component.Confirm = Confirm;
        __reflect(Confirm.prototype, "zero.component.Confirm");
    })(component = zero.component || (zero.component = {}));
})(zero || (zero = {}));
