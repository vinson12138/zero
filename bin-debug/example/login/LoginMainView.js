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
    var LoginMainView = (function (_super) {
        __extends(LoginMainView, _super);
        function LoginMainView() {
            var _this = _super.call(this) || this;
            _this.skinName = "LoginMainSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            return _this;
        }
        LoginMainView.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        LoginMainView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._btnLogin.touchChildren = false;
            this._btnSetting.touchChildren = false;
        };
        LoginMainView.prototype.onTouch = function (e) {
            if (e.target === this._btnLogin) {
                zero.sceneMgr.load(example.HubScene);
            }
        };
        return LoginMainView;
    }(zero.EUILayer));
    example.LoginMainView = LoginMainView;
    __reflect(LoginMainView.prototype, "example.LoginMainView");
})(example || (example = {}));
