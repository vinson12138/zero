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
        var System = zero.System;
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading() {
                var _this = _super.call(this) || this;
                console.log("Loading 创建了..");
                _this._controller = new game.controller.Startup();
                _this._controller.scene = _this;
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
                return _this;
            }
            Loading.prototype.initUI = function () {
                this.nodes = new Array();
                var rect;
                for (var i = 0; i < 500; i++) {
                    rect = new egret.Shape();
                    rect.graphics.beginFill(0xff0000, 0.1);
                    rect.graphics.drawRect(0, 0, System.width, System.height);
                    rect.graphics.endFill();
                    this.addChild(rect);
                    this.nodes.push(rect);
                }
                console.log("创建的");
                console.log(this.$children);
            };
            Loading.prototype.onTouch = function (e) {
                this._controller.forward();
            };
            return Loading;
        }(Scene));
        scene.Loading = Loading;
        __reflect(Loading.prototype, "game.scene.Loading");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
