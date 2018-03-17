var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var example;
(function (example) {
    var Scene = zero.Scene;
    var RPGScene1 = (function (_super) {
        __extends(RPGScene1, _super);
        function RPGScene1() {
            var _this = _super.call(this) || this;
            _this.groupName = 'rpg_game';
            _this.autoReleaseResource = true;
            return _this;
        }
        RPGScene1.prototype.onLoadComplete = function () {
            _super.prototype.onLoadComplete.call(this);
            zero.layerMgr.register(this, RPGScene1.MAP, new example.GameMainView(), "Map层");
            zero.layerMgr.register(this, RPGScene1.UI, new example.GameUIView(), "UI");
            // zero.layerMgr.register(this, RPGScene1.POPUP, new Layer());
            // zero.layerMgr.register(this, RPGScene1.TIP, new EUILayer(), "提示层");
            //
            // zero.notificationCenter.attach(new HubMainController(hubMainView))
        };
        return RPGScene1;
    }(Scene));
    RPGScene1.MAP = 0;
    RPGScene1.UI = 1;
    RPGScene1.POPUP = 2;
    RPGScene1.TIP = 3;
    example.RPGScene1 = RPGScene1;
    __reflect(RPGScene1.prototype, "example.RPGScene1");
})(example || (example = {}));
