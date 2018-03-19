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
var test;
(function (test) {
    var Scene = zero.Scene;
    var TestScrollView = (function (_super) {
        __extends(TestScrollView, _super);
        function TestScrollView() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.initUI();
            return _this;
        }
        TestScrollView.prototype.initData = function () {
            this._controller = new game.controller.TestScrollView();
            this._controller.scene = this;
        };
        TestScrollView.prototype.initUI = function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xffffff);
            shape.graphics.drawRect(0, 0, zero.System.width, zero.System.height);
            shape.graphics.endFill();
            this.addChild(shape);
            this.spContent = new egret.Sprite();
            this.initContent();
            this.spContent.touchEnabled = true;
            this.spContent.touchChildren = true;
            this.spContent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
            //创建ScrollView
            this.scrollview = new eui.Scroller();
            this.scrollview.addChild(this.spContent);
            this.scrollview.width = 800;
            this.scrollview.height = 400;
            this.scrollview.x = 100;
            this.scrollview.y = 100;
            this.addChild(this.scrollview);
            //背景图，用来展现ScrollView 的边界
            this.scrollviewBG = new egret.Shape();
            this.scrollviewBG.graphics.lineStyle(1, 0xff00ff);
            this.scrollviewBG.graphics.drawRect(0, 0, this.scrollview.width, this.scrollview.height);
            this.scrollviewBG.graphics.endFill();
            this.scrollviewBG.x = this.scrollview.x;
            this.scrollviewBG.y = this.scrollview.y;
            this.addChild(this.scrollviewBG);
            var euiLayer = new eui.UILayer();
            euiLayer.name = "EUILayer";
            this.addChild(euiLayer);
            var sprite = new egret.Sprite();
            sprite.name = "SpriteLayer";
            this.addChild(sprite);
        };
        TestScrollView.prototype.initContent = function () {
            for (var i = 0; i < 10; i++) {
                var color = i % 2 == 0 ? 0xF9C20B : 0x2A9FFF;
                var shape = new egret.Shape();
                shape.name = "" + i;
                shape.graphics.beginFill(color, 1);
                shape.graphics.drawRect(120 * i, 50, 100, 300);
                shape.graphics.endFill();
                shape.touchEnabled = true;
                this.spContent.addChild(shape);
            }
        };
        TestScrollView.prototype.onBtnTouch = function (e) {
            //console.log(e.target.name);
            this._controller.forward(Number(e.target.name));
        };
        return TestScrollView;
    }(Scene));
    test.TestScrollView = TestScrollView;
    __reflect(TestScrollView.prototype, "test.TestScrollView");
})(test || (test = {}));
