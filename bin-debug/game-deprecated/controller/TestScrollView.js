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
        var TestScrollView = (function (_super) {
            __extends(TestScrollView, _super);
            function TestScrollView() {
                return _super.call(this) || this;
            }
            TestScrollView.prototype.login = function () {
                console.log("登录了");
            };
            return TestScrollView;
        }(controller.Controller));
        controller.TestScrollView = TestScrollView;
        __reflect(TestScrollView.prototype, "game.controller.TestScrollView");
    })(controller = game.controller || (game.controller = {}));
})(game || (game = {}));
