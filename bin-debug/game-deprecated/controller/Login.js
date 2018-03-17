var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var controller;
    (function (controller) {
        /**
         * Login 登录界面的逻辑处理脚本
         */
        var Login = (function () {
            function Login() {
            }
            return Login;
        }());
        controller.Login = Login;
        __reflect(Login.prototype, "game.controller.Login");
    })(controller = game.controller || (game.controller = {}));
})(game || (game = {}));
