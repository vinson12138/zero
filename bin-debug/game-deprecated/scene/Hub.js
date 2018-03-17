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
        var Hub = (function (_super) {
            __extends(Hub, _super);
            function Hub() {
                var _this = _super.call(this) || this;
                console.log("Hub 创建了..");
                return _this;
            }
            return Hub;
        }(Scene));
        scene.Hub = Hub;
        __reflect(Hub.prototype, "game.scene.Hub");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
