/** Created by Neo on 2018/3/2 */
namespace zero {
    /**
     * Joystick类
     */
    export type CtrInfo = { direction: string, angle: number, stopped: boolean };

    export class Joystick extends egret.DisplayObjectContainer {
        private static OUTER_R: number = 100;
        private static CENTRE_R: number = 40;
        //摇杆球的边界半径
        private readonly boundR: number;
        //摇杆的安全距离
        private readonly safeDist: number;

        private touchAreaW: number = 600;
        private touchAreaH: number = 500;

        private centreX: number;
        private centreY: number;

        private touchArea: egret.Shape;
        private outerCircle: egret.Shape;
        private centreCircle: egret.Shape;

        public constructor() {
            super();
            this.boundR = Joystick.OUTER_R - 0.5 * Joystick.CENTRE_R;
            this.safeDist = Joystick.OUTER_R + 2 * Joystick.CENTRE_R;

            this.centreX = this.safeDist;
            this.centreY = this.touchAreaH - this.safeDist;

            this.touchArea = new egret.Shape();
            this.touchArea.width = this.touchAreaW;
            this.touchArea.height = this.touchAreaH;
            this.touchArea.graphics.beginFill(0xffff00, 0.1);
            this.touchArea.graphics.drawRect(0, 0, this.touchAreaW, this.touchAreaH);
            this.touchArea.graphics.endFill();
            this.touchArea.touchEnabled = true;
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.addChild(this.touchArea);

            this.outerCircle = new egret.Shape();
            this.outerCircle.graphics.beginFill(0x328521, .8);
            this.outerCircle.graphics.drawCircle(0, 0, Joystick.OUTER_R);
            this.outerCircle.graphics.endFill();
            this.outerCircle.x = this.centreX;
            this.outerCircle.y = this.centreY;
            this.addChild(this.outerCircle);

            this.centreCircle = new egret.Shape();
            this.centreCircle.graphics.beginFill(0x951E0D);
            this.centreCircle.graphics.drawCircle(0, 0, Joystick.CENTRE_R);
            this.centreCircle.graphics.endFill();
            this.centreCircle.x = this.centreX;
            this.centreCircle.y = this.centreY;
            this.addChild(this.centreCircle);
        }

        private target: egret.DisplayObjectContainer;

        public setTarget(t: egret.DisplayObjectContainer): void {
            this.target = t;
        }

        private numDirection: number = 4;

        /**
         * 设置 摇杆支持的方向数目 只有4方向和8方向可选
         * @param {number} num
         */
        public setNumDirection(num: number): void {
            if (num <= 4) {
                this.numDirection = 4;
            }
            else {
                this.numDirection = 8;
            }
        }

        private onStart: Function;

        public setOnStartCallBack(fn: (data: CtrInfo) => void, thisObj: any) {
            this.onStart = fn;
            this.onStart.bind(thisObj);
        }

        private downX: number;
        private downY: number;
        private pressed: boolean;

        private onTouchBegin(e: egret.TouchEvent): void {
            this.pressed = true;
            this.downX = e.localX;
            this.downY = e.localY;
            this.relocateJoystick(this.downX, this.downY);
        }

        private onTouchMove(e: egret.TouchEvent): void {
            if (!this.pressed) return;
            //计算摇杆角度
            let distX = e.localX - this.centreX;
            let distY = e.localY - this.centreY;
            let radian = Math.atan2(distY, distX);
            let angle = radian * 180 / Math.PI;

            //将角度换算成方向，并执行onStart回调
            let dire = this.getDirection(angle);
            this.onStart(dire);

            //计算移动的偏远量，用于设置摇杆球的位置
            let offsetX = e.localX - this.downX;
            let offsetY = e.localY - this.downY;
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
        }

        private onTouchEnd(): void {
            this.pressed = false;
            this.relocateJoystick(this.centreX, this.centreY);
            let dire = {angle: null, direction: null, stopped: true};
            this.onStart(dire);
        }

        /**
         * 重新设置 摇杆的位置
         * @param {number} x
         * @param {number} y
         */
        private relocateJoystick(x: number, y: number): void {
            if (x < this.safeDist) x = this.safeDist;
            if (y < this.safeDist) y = this.safeDist;
            if (this.touchAreaW - x < this.safeDist) x = this.touchAreaW - this.safeDist;
            if (this.touchAreaH - y < this.safeDist) y = this.touchAreaH - this.safeDist;

            this.centreX = x;
            this.centreY = y;

            this.outerCircle.x = x;
            this.outerCircle.y = y;

            this.centreCircle.x = x;
            this.centreCircle.y = y;
        }

        private getDirection(angle: number): CtrInfo {
            let piece: number = 180 / this.numDirection;
            let baseAngles: number[];
            let directions: string[];
            if (this.numDirection == 4) {
                baseAngles = [-90, 0, 90, 180];
                directions = ['U', 'R', 'D', 'L'];
            }
            else {
                baseAngles = [-135, -90, -45, 0, 45, 90, 135, 180];
                directions = ['LU', 'U', 'RU', 'R', 'RD', 'D', 'LD', 'L'];
            }
            let index: number;

            //检查当前角度在哪个方向的角度区间上
            for (let i = 0; i < baseAngles.length; i++) {
                let baseAngle = baseAngles[i];

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

            return {angle: baseAngles[index], direction: directions[index], stopped: false};
        }
    }

}