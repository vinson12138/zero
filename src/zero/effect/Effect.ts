module effect {
    const rotateObjs = new Array<boolean> ();
    const revolveObjs = new Array<boolean> ();

    export class Effect {
        public constructor() {
        }
    }

    /**
     * 使显示对象绕自身某点旋转的特效
     * @param obj 旋转特效作用的显示对象
     * @param p period 旋转周期
     * @param d duration 持续时间（旋转的次数）
     * @param c center 旋转中心。默认以自身中心为旋转中心
     * @param acw anti-clockwise 是否逆时针旋转。默认顺时针
     */
    export function rotate(obj: egret.DisplayObject, p?: number, d?: number, c?: egret.Point, acw?: boolean,): void {
        if (!obj || rotateObjs[obj.hashCode]) return;
        else rotateObjs[obj.hashCode] = true;

        if (!p) p = 1000;
        if (!d) d = -1;
        if (!c) c = new egret.Point (0, 0);

        //以自身中心为参考点
        obj.anchorOffsetX = c.x + obj.width / 2;
        obj.anchorOffsetY = c.y + obj.height / 2;
        obj.x += c.x + obj.width / 2;
        obj.y += c.y + obj.height / 2;

        let angle = acw ? -360 : 360;
        var loop: Function = function () {
            //旋转结束
            if (d >= 0 && d-- === 0) {
                obj.anchorOffsetX = 0;
                obj.anchorOffsetY = 0;
                obj.x -= c.x + obj.width / 2;
                obj.y -= c.y + obj.height / 2;
                rotateObjs[obj.hashCode] = null;
                return;
            }

            obj.rotation = 0;
            egret.Tween.get (obj).to ({rotation: angle}, p).call (loop, this);
        };
        egret.Tween.get (obj).call (loop, this);
    }

    /**
     * 使显示对象绕某一点旋转的特效.目前不支持旋转和绕转同时作用同一物体
     * @param {egret.DisplayObject} obj 绕转特效作用的显示对象
     * @param {egret.Point} c 旋转中心。默认以自身中心为旋转中心
     * @param {number} p 旋转周期
     * @param {number} d 持续时间（旋转的次数）
     * @param {boolean} acw 是否顺时针旋转。默认逆时针
     */
    export function revolve(obj: egret.DisplayObject, c: egret.Point, p?: number, d?: number, acw?: boolean): void {
        if (!obj || rotateObjs[obj.hashCode]) return;
        else rotateObjs[obj.hashCode] = true;

        if (!p) p = 1000;
        if (!d) d = -1;
        if (!c) c = new egret.Point (obj.x + obj.width / 2, obj.y + obj.height / 2);

        let x = obj.x;
        let y = obj.y;
        //以世界坐标原点为参考点
        obj.anchorOffsetX = c.x - obj.x;
        obj.anchorOffsetY = c.y - obj.y;
        obj.x = c.x;
        obj.y = c.y;

        let angle = acw ? -360 : 360;
        var loop: Function = function () {
            //效果结束，原因对象属性
            if (d >= 0 && d-- === 0) {
                obj.anchorOffsetX = 0;
                obj.anchorOffsetY = 0;
                obj.x = x;
                obj.y = y;
                rotateObjs[obj.hashCode] = null;
                return;
            }

            obj.rotation = 0;
            egret.Tween.get (obj).to ({rotation: angle}, p).call (loop, this);
        };
        egret.Tween.get (obj).call (loop, this);
    }

    /**
     * 使显示对象绕某一点旋转的特效.目前不支持旋转和绕转同时作用同一物体
     * @param {egret.DisplayObject} obj 绕转特效作用的显示对象
     * @param {egret.Point} c 旋转中心。默认以自身中心为旋转中心
     * @param {number} p 旋转周期
     * @param {number} d 持续时间（旋转的次数）
     * @param {boolean} acw 是否顺时针旋转。默认逆时针
     * @param {number} rate y/x 的值，决定椭圆的两个轴的轴长
     */
    export function revolve2(obj: egret.DisplayObject, c: egret.Point, p?: number, d?: number, acw?: boolean, rate: number = 1): void {
        if (!obj || revolveObjs[obj.hashCode]) return;
        else revolveObjs[obj.hashCode] = true;
        const FPS: number = 40;

        if (!p) p = 1000;
        if (!d) d = -1;
        if (rate <= 0) rate = 1;
        let PI2: number = 2 * Math.PI;
        let disX: number = (obj.x - c.x);
        let r: number = Math.sqrt (disX * disX + (obj.y - c.y) * (obj.y - c.y));
        let angle = Math.acos (disX / r);
        let startAnl = angle;
        /**角速度 deg/f 弧度每帧 */
        let speed: number = 1000 * PI2 / (p * FPS);

        let anchorOffsetX = obj.anchorOffsetX - obj.width / 2;
        let anchorOffsetY = obj.anchorOffsetY - obj.height / 2;

        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x += anchorOffsetX;
        obj.y += anchorOffsetY;

        /**
         * 动画完成时还原显示对象的原有属性
         */
        let complete: Function = () => {
            obj.x -= anchorOffsetX;
            obj.y -= anchorOffsetY;

            obj.anchorOffsetX = anchorOffsetX + obj.width / 2;
            obj.anchorOffsetY = anchorOffsetY + obj.height / 2;
        };
        let time = Date.now ();
        window.requestAnimationFrame =
            window.requestAnimationFrame || window.webkitRequestAnimationFrame;


        let timer = requestAnimationFrame (() => {
            obj.x = r * Math.cos (angle) + c.x;
            obj.y = rate * r * -Math.sin (angle) + c.y;
            angle += speed;

            if (angle >= PI2 + startAnl) {
                console.log (Date.now () - time);
                angle = startAnl;
                time = Date.now ();
                if (d > 0 && --d == 0) {
                    cancelAnimationFrame (timer);
                    complete ();
                }
            }
        });
        // let timer = egret.setInterval(() => {
        //
        // }, this, 1000 / FPS);

    }
}