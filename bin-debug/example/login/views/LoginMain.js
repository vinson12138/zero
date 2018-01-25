var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var example;
(function (example) {
    var LoginMain = (function (_super) {
        __extends(LoginMain, _super);
        function LoginMain() {
            var _this = _super.call(this) || this;
            _this.skinName = "LoginMainSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            return _this;
        }
        LoginMain.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        LoginMain.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._btnLogin.touchChildren = false;
            this._btnSetting.touchChildren = false;
        };
        LoginMain.prototype.onTouch = function (e) {
            if (e.target === this._btnLogin) {
                zero.sceneMgr.load(example.HubScene);
            }
        };
        return LoginMain;
    }(eui.Component));
    example.LoginMain = LoginMain;
    __reflect(LoginMain.prototype, "example.LoginMain", ["eui.UIComponent", "egret.DisplayObject"]);
})(example || (example = {}));
