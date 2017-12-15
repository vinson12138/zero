var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var controller;
    (function (controller) {
        var Controller = (function () {
            function Controller() {
            }
            Object.defineProperty(Controller.prototype, "scene", {
                set: function (scene) {
                    this._scene = scene;
                },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.forward = function (scene) {
                var sceneMgr = zero.SceneMgr.getInstance();
                var clazz = null;
                switch (scene) {
                    case game.Scenes.Startup:
                        clazz = game.scene.Startup;
                        break;
                    case game.Scenes.Loading:
                        clazz = game.scene.Loading;
                        break;
                    case game.Scenes.Login:
                        clazz = game.scene.Login;
                        break;
                    case game.Scenes.Hub:
                        clazz = game.scene.Hub;
                        break;
                    default: ;
                }
                sceneMgr.loadScene(clazz);
            };
            Controller.prototype.destroy = function () {
                this._scene = null;
            };
            return Controller;
        }());
        controller.Controller = Controller;
        __reflect(Controller.prototype, "game.controller.Controller");
    })(controller = game.controller || (game.controller = {}));
})(game || (game = {}));
