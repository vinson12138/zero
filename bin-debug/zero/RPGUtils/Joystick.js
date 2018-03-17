var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** Created by Neo on 2018/3/2 */
var zero;
(function (zero) {
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick() {
            var _this = _super.call(this) || this;
            _this.touchAreaW = 600;
            _this.touchAreaH = 500;
            _this.numDirection = 4;
            _this.boundR = Joystick.OUTER_R - 0.5 * Joystick.CENTRE_R;
            _this.safeDist = Joystick.OUTER_R + 2 * Joystick.CENTRE_R;
            _this.centreX = _this.safeDist;
            _this.centreY = _this.touchAreaH - _this.safeDist;
            _this.touchArea = new egret.Shape();
            _this.touchArea.width = _this.touchAreaW;
            _this.touchArea.height = _this.touchAreaH;
            _this.touchArea.graphics.beginFill(0xffff00, 0.1);
            _this.touchArea.graphics.drawRect(0, 0, _this.touchAreaW, _this.touchAreaH);
            _this.touchArea.graphics.endFill();
            _this.touchArea.touchEnabled = true;
            _this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.touchArea.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.touchArea.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.onTouchEnd, _this);
            _this.addChild(_this.touchArea);
            _this.outerCircle = new egret.Shape();
            _this.outerCircle.graphics.beginFill(0x328521, .8);
            _this.outerCircle.graphics.drawCircle(0, 0, Joystick.OUTER_R);
            _this.outerCircle.graphics.endFill();
            _this.outerCircle.x = _this.centreX;
            _this.outerCircle.y = _this.centreY;
            _this.addChild(_this.outerCircle);
            _this.centreCircle = new egret.Shape();
            _this.centreCircle.graphics.beginFill(0x951E0D);
            _this.centreCircle.graphics.drawCircle(0, 0, Joystick.CENTRE_R);
            _this.centreCircle.graphics.endFill();
            _this.centreCircle.x = _this.centreX;
            _this.centreCircle.y = _this.centreY;
            _this.addChild(_this.centreCircle);
            return _this;
        }
        Joystick.prototype.setTarget = function (t) {
            this.target = t;
        };
        /**
         * 设置 摇杆支持的方向数目 只有4方向和8方向可选
         * @param {number} num
         */
        Joystick.prototype.setNumDirection = function (num) {
            if (num <= 4) {
                this.numDirection = 4;
            }
            else {
                this.numDirection = 8;
            }
        };
        Joystick.prototype.setOnStartCallBack = function (fn, thisObj) {
            this.onStart = fn;
            this.onStart.bind(thisObj);
        };
        Joystick.prototype.onTouchBegin = function (e) {
            this.pressed = true;
            this.downX = e.localX;
            this.downY = e.localY;
            this.relocateJoystick(this.downX, this.downY);
        };
        Joystick.prototype.onTouchMove = function (e) {
            if (!this.pressed)
                return;
            //计算摇杆角度
            var distX = e.localX - this.centreX;
            var distY = e.localY - this.centreY;
            var radian = Math.atan2(distY, distX);
            var angle = radian * 180 / Math.PI;
            //将角度换算成方向，并执行onStart回调
            var dire = this.getDirection(angle);
            this.onStart(dire);
            //计算移动的偏远量，用于设置摇杆球的位置
            var offsetX = e.localX - this.downX;
            var offsetY = e.localY - this.downY;
            this.downX = e.localX;
            this.downY = e.localY;
            this.centreCircle.x += offsetX;
            this.centreCircle.y += offsetY;
            //控制摇杆球不超出边界
            distX = this.centreCircle.x - this.centreX;
            distY = this.centreCircle.y - this.centreY;
            if ((distX * distX + distY * distY) >= this.boundR * this.boundR) {
                this.downX = Math.cos(radian) * this.boundR;
                this.downY = Math.sin(radian) * this.boundR;
                this.centreCircle.x = this.centreX + this.downX;
                this.centreCircle.y = this.centreY + this.downY;
            }
        };
        Joystick.prototype.onTouchEnd = function () {
            this.pressed = false;
            this.relocateJoystick(this.centreX, this.centreY);
            var dire = { angle: null, direction: null, stopped: true };
            this.onStart(dire);
        };
        /**
         * 重新设置 摇杆的位置
         * @param {number} x
         * @param {number} y
         */
        Joystick.prototype.relocateJoystick = function (x, y) {
            if (x < this.safeDist)
                x = this.safeDist;
            if (y < this.safeDist)
                y = this.safeDist;
            if (this.touchAreaW - x < this.safeDist)
                x = this.touchAreaW - this.safeDist;
            if (this.touchAreaH - y < this.safeDist)
                y = this.touchAreaH - this.safeDist;
            this.centreX = x;
            this.centreY = y;
            this.outerCircle.x = x;
            this.outerCircle.y = y;
            this.centreCircle.x = x;
            this.centreCircle.y = y;
        };
        Joystick.prototype.getDirection = function (angle) {
            var piece = 180 / this.numDirection;
            var baseAngles;
            var directions;
            if (this.numDirection == 4) {
                baseAngles = [-90, 0, 90, 180];
                directions = ['U', 'R', 'D', 'L'];
            }
            else {
                baseAngles = [-135, -90, -45, 0, 45, 90, 135, 180];
                directions = ['LU', 'U', 'RU', 'R', 'RD', 'D', 'LD', 'L'];
            }
            var index;
            //检查当前角度在哪个方向的角度区间上
            for (var i = 0; i < baseAngles.length; i++) {
                var baseAngle = baseAngles[i];
                if (baseAngle == 180) {
                    if ((angle >= baseAngle - piece && angle <= 180) || (angle >= -180 && angle < -180 + piece)) {
                        index = i;
                        break;
                    }
                }
                else {
                    if (angle >= baseAngle - piece && angle < baseAngle + piece) {
                        index = i;
                        break;
                    }
                }
            }
            return { angle: baseAngles[index], direction: directions[index], stopped: false };
        };
        return Joystick;
    }(egret.DisplayObjectContainer));
    Joystick.OUTER_R = 100;
    Joystick.CENTRE_R = 40;
    zero.Joystick = Joystick;
    __reflect(Joystick.prototype, "zero.Joystick");
})(zero || (zero = {}));
