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
        /**
         * 游戏场景基类
         */
        var Scene = (function (_super) {
            __extends(Scene, _super);
            function Scene() {
                var _this = _super.call(this) || this;
                _this.touchEnabled = true;
                _this.touchChildren = true;
                _this.initUI();
                return _this;
            }
            /**由父类调用，子类无需主动调用 */
            Scene.prototype.initUI = function () {
                console.log("父元素调用");
            };
            /**
             * 唤醒场景
             */
            Scene.prototype.awake = function () { };
            /**
             * 场景是否正在卸载
             */
            Scene.prototype.isUnloading = function () { return; };
            /**
             * 场景预卸载处理
             */
            Scene.prototype.preUnload = function () { };
            /**
             * 卸载场景
             */
            Scene.prototype.unload = function () {
                // console.log("销毁类");
                // this.$children.forEach(node => {
                // 	node = null;
                // });
                // this.removeChildren();
                // console.log(this);
            };
            return Scene;
        }(egret.DisplayObjectContainer));
        scene.Scene = Scene;
        __reflect(Scene.prototype, "game.scene.Scene");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
