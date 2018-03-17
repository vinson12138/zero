var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** Created by Neo on 2018/3/2 */
var example;
(function (example) {
    var Controller = zero.Controller;
    var HubMainController = (function (_super) {
        __extends(HubMainController, _super);
        /**
         * 构造函数
         */
        function HubMainController(view) {
            var _this = _super.call(this, view) || this;
            _this.NAME = 'HubMainController';
            _this.hubMain = view;
            _this.addEventListener();
            return _this;
        }
        HubMainController.prototype.addEventListener = function () {
            //this.hubMain.addEventListener()
        };
        HubMainController.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
        };
        HubMainController.prototype.notificationList = function () {
            return [];
        };
        HubMainController.prototype.handleNotification = function (notification) {
        };
        return HubMainController;
    }(Controller));
    example.HubMainController = HubMainController;
    __reflect(HubMainController.prototype, "example.HubMainController");
})(example || (example = {}));
