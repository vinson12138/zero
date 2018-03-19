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
var game;
(function (game) {
    var controller;
    (function (controller) {
        var Startup = (function (_super) {
            __extends(Startup, _super);
            function Startup() {
                return _super.call(this) || this;
            }
            Startup.prototype.forward = function () {
                var sceneMgr = zero.SceneMgr.getInstance();
                sceneMgr.load(test.TestScrollView);
            };
            return Startup;
        }(game.controller.Controller));
        controller.Startup = Startup;
        __reflect(Startup.prototype, "game.controller.Startup");
    })(controller = game.controller || (game.controller = {}));
})(game || (game = {}));
