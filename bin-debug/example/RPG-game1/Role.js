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
/** Created by Neo on 2018/3/8 */
var example;
(function (example) {
    /** Created by Neo on 2018/3/8 */
    // export enum Action {
    //     STAND = 'stand',
    //     MOVE = 'move'
    // }
    example.Action = {
        STAND: 'stand',
        MOVE: 'move',
    };
    //根据图片命名的顺序定的
    var DIRECTION = ['D', 'RD', 'R', 'RU', 'U', 'LU', 'L', 'LD'];
    /**
     * Role类
     */
    var Role = (function (_super) {
        __extends(Role, _super);
        /**
         * 构造函数
         */
        function Role() {
            var _this = _super.call(this) || this;
            _this._frameCount = 0;
            _this._maxCount = 500;
            /**
             * 渲染的角色 帧的间隔，1即逐帧渲染，4则每隔4帧渲染一次
             * @type {number}
             * @private
             */
            _this._frameInterval = 1;
            _this.role = new egret.Bitmap();
            _this.addChild(_this.role);
            _this.lblID = new egret.TextField();
            _this.lblID.text = '友人A';
            _this.lblID.strokeColor = 0x303030;
            _this.lblID.stroke = 1;
            _this.lblID.textColor = 0xffffff;
            _this.lblID.width = 200;
            _this.lblID.size = 24;
            _this.lblID.x = -100;
            _this.lblID.y = -300;
            _this.lblID.textAlign = egret.HorizontalAlign.CENTER;
            _this.addChild(_this.lblID);
            _this.frame = 0;
            _this.doAction(example.Action.STAND, 'RD');
            _this.timeScale = 1;
            _this.scale = 2;
            //this.addEventListener(egret.Event.ENTER_FRAME, this.onEachFrame, this);
            egret.startTick(_this.onEachFrame, _this);
            return _this;
        }
        Role.prototype.destroy = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEachFrame, this);
        };
        //private time: number = 0;
        //间隔一帧的时间调用一次 默认设置的是30帧
        Role.prototype.onEachFrame = function (timeStamp) {
            if (!this.isAllowRender())
                return;
            // let pass = timeStamp - this.time;
            // this.time = timeStamp;
            // console.log(pass, this._frameCount, this._frameInterval);
            var frame = this.directionIndex * 10000 + this.frame;
            var strFrame = this.padLeft(frame, 5);
            var resName = this.action + "_" + strFrame + "_png";
            var texture = RES.getRes(resName);
            //console.log(resName);
            if (texture) {
                this.role.texture = texture;
                this.role.anchorOffsetX = this.role.width / 2;
                this.role.anchorOffsetY = this.role.height;
            }
            this.frame++;
            if (this.frame > this.maxFrameIndex)
                this.frame = 0;
            return false;
        };
        Role.prototype.setRoleID = function (id) {
            this.lblID.text = id;
        };
        Role.prototype.doAction = function (action, direction) {
            this.action = action ? action : this.action;
            switch (this.action) {
                case example.Action.STAND:
                    this.timeScale = 0.4;
                    this.maxFrameIndex = Role.MaxActionFrameIndex.STAND;
                    break;
                case example.Action.MOVE:
                    this.timeScale = 1;
                    this.maxFrameIndex = Role.MaxActionFrameIndex.MOVE;
                    break;
                default:
                    this.maxFrameIndex = Role.MaxActionFrameIndex.STAND;
            }
            //如果没有传进来方向，则保持原状
            if (!direction)
                return;
            var dirIndex = DIRECTION.indexOf(direction);
            this.role.scaleX = Math.abs(this.role.scaleX);
            if (dirIndex > 4) {
                dirIndex = 8 - dirIndex;
                this.role.scaleX = -this.role.scaleX;
            }
            this.directionIndex = dirIndex;
        };
        Role.prototype.move = function (speed, angle) {
            var radian = angle * Math.PI / 180;
            //console.log(angle, speed, speed * Math.cos(radian) + 0.5 | 0, speed * Math.sin(radian) + 0.5 | 0);
            this.x += speed * Math.cos(radian) + 0.5 | 0;
            this.y += speed * Math.sin(radian) + 0.5 | 0;
        };
        /**
         * todo 移到工具类中
         * 将数字以按固定长度输出，默认不足补0
         * 长度如果大于固定长度，则全部输出
         * @param {number} num
         * @param {number} length 输出的字符串的长度
         * @param {string} filler 填充字符
         * @returns {string}
         */
        Role.prototype.padLeft = function (num, length, filler) {
            if (filler === void 0) { filler = '0'; }
            var str = num.toString();
            if (str.length > length)
                return str;
            return (Array(length).join(filler) + num).slice(-length);
        };
        Object.defineProperty(Role.prototype, "timeScale", {
            set: function (value) {
                this._frameInterval = Number((4 / value).toFixed(1));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否允许渲染
         */
        Role.prototype.isAllowRender = function () {
            this._frameCount++;
            if (this._frameCount >= this._maxCount)
                this._frameCount = 0;
            return this._frameCount % this._frameInterval == 0;
        };
        Object.defineProperty(Role.prototype, "scale", {
            set: function (value) {
                this._scale = value;
                this.role.scaleX = this._scale;
                this.role.scaleY = this._scale;
            },
            enumerable: true,
            configurable: true
        });
        Role.MaxActionFrameIndex = {
            STAND: 5,
            MOVE: 7
        };
        return Role;
    }(egret.DisplayObjectContainer));
    example.Role = Role;
    __reflect(Role.prototype, "example.Role");
})(example || (example = {}));
