var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Scene = zero.Scene;
        var Login = (function (_super) {
            __extends(Login, _super);
            function Login() {
                var _this = _super.call(this) || this;
                console.log("Login 创建了..");
                return _this;
            }
            Login.prototype.initUI = function () {
                console.trace();
                console.log("调用子类的initUI");
            };
            return Login;
        }(Scene));
        scene.Login = Login;
        __reflect(Login.prototype, "game.scene.Login");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
