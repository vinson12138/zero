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
var example;
(function (example) {
    var Scene = zero.Scene;
    var EUILayer = zero.EUILayer;
    var LoginScene = (function (_super) {
        __extends(LoginScene, _super);
        function LoginScene() {
            var _this = _super.call(this) || this;
            _this.groupName = 'preload';
            return _this;
        }
        LoginScene.prototype.onLoadComplete = function () {
            _super.prototype.onLoadComplete.call(this);
            zero.layerMgr.register(this, LoginScene.UI, new example.LoginMainView(), "UI层");
            zero.layerMgr.register(this, LoginScene.POPUP, new EUILayer());
            zero.layerMgr.register(this, LoginScene.TIP, new EUILayer());
        };
        LoginScene.UI = 0;
        LoginScene.POPUP = 1;
        LoginScene.TIP = 2;
        return LoginScene;
    }(Scene));
    example.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "example.LoginScene");
})(example || (example = {}));
