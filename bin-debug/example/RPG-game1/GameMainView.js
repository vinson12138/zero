/** Created by Neo on 2018/3/17 */
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
var example;
(function (example) {
    var Joystick = zero.Joystick;
    var System = zero.System;
    /**
     * GameMainView类
     */
    var GameMainView = (function (_super) {
        __extends(GameMainView, _super);
        /**
         * 构造函数
         */
        function GameMainView() {
            var _this = _super.call(this) || this;
            _this.speed = 4;
            _this.startCreateScene();
            return _this;
        }
        /**
         * 创建场景界面
         * Create scene interface
         */
        GameMainView.prototype.startCreateScene = function () {
            var _this = this;
            var stageW = System.width;
            var stageH = System.height;
            this.stageW = stageW;
            this.stageH = stageH;
            var map = this.createMap();
            this.addChild(map);
            this.map = map;
            var role = new example.Role();
            role.x = 800;
            role.y = 580;
            role.doAction(example.Action.STAND, 'RD');
            this.addChild(role);
            this.role = role;
            var joystick = new Joystick();
            joystick.x = 0;
            joystick.y = stageH - joystick.height;
            joystick.setNumDirection(8);
            //内圆不在原始位置就可以移动
            joystick.setOnStartCallBack(function (data) {
                _this.ctrInfo = data;
            }, this);
            this.addChild(joystick);
            //console.log(stageH, joystick.height);
            egret.startTick(this.onEachFrame, this);
            console.log(stageW, stageH, this.map.width, this.map.height);
        };
        GameMainView.prototype.onEachFrame = function (timeStamp) {
            var stageW = this.stageW;
            var stageH = this.stageH;
            var speed = this.speed;
            var map = this.map;
            var role = this.role;
            var data = this.ctrInfo;
            if (!data)
                return;
            if (data.stopped) {
                role.doAction(example.Action.STAND, null);
                return;
            }
            //运动时
            role.doAction(example.Action.MOVE, data.direction);
            var radian = data.angle * Math.PI / 180;
            map.x -= speed * Math.cos(radian) + 0.5 | 0;
            map.y -= speed * Math.sin(radian) + 0.5 | 0;
            if (map.x >= 0) {
                map.x = 0;
                role.move(speed, data.angle);
            }
            if (map.y >= 0) {
                map.y = 0;
                role.move(speed, data.angle);
            }
            if (map.x <= stageW - map.width) {
                map.x = stageW - map.width;
                role.move(speed, data.angle);
            }
            if (map.y <= stageH - map.height) {
                map.y = stageH - map.height;
                role.move(speed, data.angle);
            }
            return false;
        };
        GameMainView.prototype.createMap = function () {
            this._mapPieces = [];
            var map = new egret.Sprite();
            for (var i = 0; i < 4; i++) {
                var piece = new egret.Bitmap();
                piece.texture = RES.getRes('map1_jpg');
                piece.anchorOffsetX = piece.width / 2;
                piece.x = piece.width * i;
                if (i % 2 != 0) {
                    piece.scaleX = -1;
                }
                //piece.y = piece.height * (i / 2 | 0);
                map.addChild(piece);
                this._mapPieces.push(piece);
            }
            return map;
        };
        return GameMainView;
    }(zero.Layer));
    example.GameMainView = GameMainView;
    __reflect(GameMainView.prototype, "example.GameMainView");
})(example || (example = {}));
