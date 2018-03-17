/** Created by Neo on 2018/3/8 */
namespace example {
    /** Created by Neo on 2018/3/8 */

    // export enum Action {
    //     STAND = 'stand',
    //     MOVE = 'move'
    // }
    export const Action = {
        STAND: 'stand',
        MOVE: 'move',
    }
    //根据图片命名的顺序定的
    const DIRECTION = ['D', 'RD', 'R', 'RU', 'U', 'LU', 'L', 'LD'];

    /**
     * Role类
     */
    export class Role extends egret.DisplayObjectContainer {
        private static MaxActionFrameIndex = {
            STAND: 5,
            MOVE: 7
        };

        //角色的贴图
        private role: egret.Bitmap;
        //角色的方向序号
        private directionIndex: number;
        //角色的动作
        private action: string;
        //角色动作资源的帧序号
        private frame: number;
        //角色动作的最大帧序号
        private maxFrameIndex: number;

        private lblID: egret.TextField;

        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.role = new egret.Bitmap();
            this.addChild(this.role);

            this.lblID = new egret.TextField();
            this.lblID.text = '友人A';
            this.lblID.strokeColor = 0x303030;
            this.lblID.stroke = 1;
            this.lblID.textColor = 0xffffff;
            this.lblID.width = 200;
            this.lblID.size = 24;
            this.lblID.x = -100;
            this.lblID.y = -300;
            this.lblID.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this.lblID);

            this.frame = 0;
            this.doAction(Action.STAND, 'RD');
            this.timeScale = 1;

            this.scale = 2;

            //this.addEventListener(egret.Event.ENTER_FRAME, this.onEachFrame, this);
            egret.startTick(this.onEachFrame, this);
        }

        public destroy(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEachFrame, this);
        }

        //private time: number = 0;

        //间隔一帧的时间调用一次 默认设置的是30帧
        private onEachFrame(timeStamp: number): boolean {
            if (!this.isAllowRender()) return;
            // let pass = timeStamp - this.time;
            // this.time = timeStamp;
            // console.log(pass, this._frameCount, this._frameInterval);

            let frame = this.directionIndex * 10000 + this.frame;
            let strFrame = this.padLeft(frame, 5);

            let resName = `${this.action}_${strFrame}_png`;
            let texture = RES.getRes(resName);
            //console.log(resName);
            if (texture) {
                this.role.texture = texture;
                this.role.anchorOffsetX = this.role.width / 2;
                this.role.anchorOffsetY = this.role.height;
            }
            this.frame++;
            if (this.frame > this.maxFrameIndex) this.frame = 0;
            return false;
        }

        public setRoleID(id:string):void {
            this.lblID.text = id;
        }
        public doAction(action: string, direction: string): void {
            this.action = action ? action : this.action;

            switch (this.action) {
                case Action.STAND:
                    this.timeScale = 0.4;
                    this.maxFrameIndex = Role.MaxActionFrameIndex.STAND;
                    break;
                case Action.MOVE:
                    this.timeScale = 1;
                    this.maxFrameIndex = Role.MaxActionFrameIndex.MOVE;
                    break;
                default:
                    this.maxFrameIndex = Role.MaxActionFrameIndex.STAND;
            }

            //如果没有传进来方向，则保持原状
            if (!direction) return;
            let dirIndex = DIRECTION.indexOf(direction);
            this.role.scaleX = Math.abs(this.role.scaleX);
            if (dirIndex > 4) {
                dirIndex = 8 - dirIndex;
                this.role.scaleX = -this.role.scaleX;
            }
            this.directionIndex = dirIndex;
        }

        public move(speed: number, angle: number): void {
            let radian = angle * Math.PI / 180;
            //console.log(angle, speed, speed * Math.cos(radian) + 0.5 | 0, speed * Math.sin(radian) + 0.5 | 0);
            this.x += speed * Math.cos(radian) + 0.5 | 0;
            this.y += speed * Math.sin(radian) + 0.5 | 0;
        }


        /**
         * todo 移到工具类中
         * 将数字以按固定长度输出，默认不足补0
         * 长度如果大于固定长度，则全部输出
         * @param {number} num
         * @param {number} length 输出的字符串的长度
         * @param {string} filler 填充字符
         * @returns {string}
         */
        private padLeft(num: number, length: number, filler: string = '0'): string {
            let str: string = num.toString();
            if (str.length > length) return str;
            return (Array(length).join(filler) + num).slice(-length);
        }


        private _frameCount: number = 0;
        private _maxCount: number = 500;
        /**
         * 渲染的角色 帧的间隔，1即逐帧渲染，4则每隔4帧渲染一次
         * @type {number}
         * @private
         */
        private _frameInterval: number = 1;

        public set timeScale(value: number) {
            this._frameInterval = Number((4 / value).toFixed(1));
        }

        /**
         * 是否允许渲染
         */
        private isAllowRender(): boolean {
            this._frameCount++;
            if (this._frameCount >= this._maxCount) this._frameCount = 0;
            return this._frameCount % this._frameInterval == 0;

        }

        private _scale: number;
        public set scale(value: number) {
            this._scale = value;
            this.role.scaleX = this._scale;
            this.role.scaleY = this._scale;
        }
    }
}