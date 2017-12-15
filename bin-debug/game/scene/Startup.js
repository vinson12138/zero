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
        //import Scene = zero.Scene;
        var Startup = (function (_super) {
            __extends(Startup, _super);
            function Startup() {
                var _this = _super.call(this) || this;
                console.log("Startup 创建了..");
                _this.initData();
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
                return _this;
            }
            Startup.prototype.initData = function () {
                this._controller = new game.controller.Startup();
                this._controller.scene = this;
            };
            Startup.prototype.initUI = function () {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0x000000, 1);
                shp.graphics.drawRect(0, 0, game.System.width, game.System.height);
                shp.graphics.endFill();
                this.addChild(shp);
                var sun = new egret.Shape();
                sun.graphics.beginFill(0xe6d832, 1);
                sun.graphics.drawCircle(60, 60, 60);
                sun.graphics.endFill();
                this.addChild(sun);
                var sprite0 = new egret.Sprite();
                sprite0.addChild(sun);
                sprite0.x = (game.System.width - sun.width) / 2;
                sprite0.y = (game.System.height - sun.height) / 2;
                sprite0.touchEnabled = true;
                this.addChild(sprite0);
                var circle = new egret.Shape();
                circle.graphics.beginFill(0x3b68ce, 1);
                //circle.graphics.drawCircle(50, 50, 50);
                circle.graphics.drawRect(0, 0, 100, 100);
                circle.graphics.endFill();
                var sprite = new egret.Sprite();
                sprite.addChild(circle);
                sprite.x = 50;
                sprite.y = 50;
                sprite.touchEnabled = true;
                sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
                this.addChild(sprite);
                this._circle = sprite;
                var circle2 = new egret.Shape();
                circle2.graphics.beginFill(0xb18610, 1);
                circle2.graphics.drawCircle(20, 20, 20);
                //circle2.graphics.drawRect(0, 0, 150, 150);
                circle2.graphics.endFill();
                var sprite2 = new egret.Sprite();
                sprite2.addChild(circle2);
                //sprite2.x = game.System.width -450;
                //sprite2.y = 270;
                sprite2.x = 225;
                sprite2.y = 245;
                sprite2.touchEnabled = true;
                sprite2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
                this.addChildAt(sprite2, 2);
                this._circle2 = sprite2;
            };
            Startup.prototype.unload = function () {
                this.$children.forEach(function (node) { node = null; });
                this._controller.destroy();
                this._controller = null;
            };
            Startup.prototype.onBtnTouch = function (e) {
            };
            Startup.prototype.onTouch = function (e) {
                var _this = this;
                effect.rotate(this._circle, 500, null, null, true);
                effect.revolve2(this._circle, new egret.Point(game.System.width / 2, game.System.height / 2), 4000, -1, false, .5);
                //effect.revolve2(this._circle2, new egret.Point(this._circle.x, this._circle.y), 3000)
                //effect.rotate(this._circle, null, 2000);
                //effect.revolve(this._circle, new egret.Point(System.width/2, System.height/2), false, 4000);
                //effect.rotate(this._circle2,false, 1000, -1, null, true);
                //effect.rotate(this._circle2, 2000);
                //effect.revolve2(this._circle2, new egret.Point(System.width/2, System.height/2), 2000);
                //effect.rotate(this, 2000, -1);
                var a = function () {
                    console.log("\t执行：", _this);
                };
                var b = function () {
                    console.log("\t执行：取消发顺丰");
                };
                var confirm = new zero.component.Confirm("测试确认框", ["确认", "取消", "忽略"], [a, b], this);
                confirm.show();
                confirm.clickBtn(0);
                confirm.clickBtn(1);
                confirm.clickBtn(2);
            };
            return Startup;
        }(scene.Scene));
        scene.Startup = Startup;
        __reflect(Startup.prototype, "game.scene.Startup");
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
