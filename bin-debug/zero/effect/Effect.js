var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var effect;
(function (effect) {
    var rotateObjs = new Array();
    var revolveObjs = new Array();
    var Effect = (function () {
        function Effect() {
        }
        return Effect;
    }());
    effect.Effect = Effect;
    __reflect(Effect.prototype, "effect.Effect");
    /**
     * 使显示对象绕自身某点旋转的特效
     * @param obj 旋转特效作用的显示对象
     * @param p period 旋转周期
     * @param d duration 持续时间（旋转的次数）
     * @param c center 旋转中心。默认以自身中心为旋转中心
     * @param acw anti-clockwise 是否逆时针旋转。默认顺时针
     */
    function rotate(obj, p, d, c, acw) {
        if (!obj || rotateObjs[obj.hashCode])
            return;
        else
            rotateObjs[obj.hashCode] = true;
        if (!p)
            p = 1000;
        if (!d)
            d = -1;
        if (!c)
            c = new egret.Point(0, 0);
        //以自身中心为参考点
        obj.anchorOffsetX = c.x + obj.width / 2;
        obj.anchorOffsetY = c.y + obj.height / 2;
        obj.x += c.x + obj.width / 2;
        obj.y += c.y + obj.height / 2;
        var angle = acw ? -360 : 360;
        var loop = function () {
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
            egret.Tween.get(obj).to({ rotation: angle }, p).call(loop, this);
        };
        egret.Tween.get(obj).call(loop, this);
    }
    effect.rotate = rotate;
    /**
     * 使显示对象绕某一点旋转的特效.目前不支持旋转和绕转同时作用同一物体
     * @param {egret.DisplayObject} obj 绕转特效作用的显示对象
     * @param {egret.Point} c 旋转中心。默认以自身中心为旋转中心
     * @param {number} p 旋转周期
     * @param {number} d 持续时间（旋转的次数）
     * @param {boolean} acw 是否顺时针旋转。默认逆时针
     */
    function revolve(obj, c, p, d, acw) {
        if (!obj || rotateObjs[obj.hashCode])
            return;
        else
            rotateObjs[obj.hashCode] = true;
        if (!p)
            p = 1000;
        if (!d)
            d = -1;
        if (!c)
            c = new egret.Point(obj.x + obj.width / 2, obj.y + obj.height / 2);
        var x = obj.x;
        var y = obj.y;
        //以世界坐标原点为参考点
        obj.anchorOffsetX = c.x - obj.x;
        obj.anchorOffsetY = c.y - obj.y;
        obj.x = c.x;
        obj.y = c.y;
        var angle = acw ? -360 : 360;
        var loop = function () {
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
            egret.Tween.get(obj).to({ rotation: angle }, p).call(loop, this);
        };
        egret.Tween.get(obj).call(loop, this);
    }
    effect.revolve = revolve;
    /**
     * 使显示对象绕某一点旋转的特效.目前不支持旋转和绕转同时作用同一物体
     * @param {egret.DisplayObject} obj 绕转特效作用的显示对象
     * @param {egret.Point} c 旋转中心。默认以自身中心为旋转中心
     * @param {number} p 旋转周期
     * @param {number} d 持续时间（旋转的次数）
     * @param {boolean} acw 是否顺时针旋转。默认逆时针
     * @param {number} rate y/x 的值，决定椭圆的两个轴的轴长
     */
    function revolve2(obj, c, p, d, acw, rate) {
        if (rate === void 0) { rate = 1; }
        if (!obj || revolveObjs[obj.hashCode])
            return;
        else
            revolveObjs[obj.hashCode] = true;
        var FPS = 40;
        if (!p)
            p = 1000;
        if (!d)
            d = -1;
        if (rate <= 0)
            rate = 1;
        var PI2 = 2 * Math.PI;
        var disX = (obj.x - c.x);
        var r = Math.sqrt(disX * disX + (obj.y - c.y) * (obj.y - c.y));
        var angle = Math.acos(disX / r);
        var startAnl = angle;
        /**角速度 deg/f 弧度每帧 */
        var speed = 1000 * PI2 / (p * FPS);
        var anchorOffsetX = obj.anchorOffsetX - obj.width / 2;
        var anchorOffsetY = obj.anchorOffsetY - obj.height / 2;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x += anchorOffsetX;
        obj.y += anchorOffsetY;
        /**
         * 动画完成时还原显示对象的原有属性
         */
        var complete = function () {
            obj.x -= anchorOffsetX;
            obj.y -= anchorOffsetY;
            obj.anchorOffsetX = anchorOffsetX + obj.width / 2;
            obj.anchorOffsetY = anchorOffsetY + obj.height / 2;
        };
        var time = Date.now();
        window.requestAnimationFrame =
            window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        var timer = requestAnimationFrame(function () {
            obj.x = r * Math.cos(angle) + c.x;
            obj.y = rate * r * -Math.sin(angle) + c.y;
            angle += speed;
            if (angle >= PI2 + startAnl) {
                console.log(Date.now() - time);
                angle = startAnl;
                time = Date.now();
                if (d > 0 && --d == 0) {
                    cancelAnimationFrame(timer);
                    complete();
                }
            }
        });
        // let timer = egret.setInterval(() => {
        //
        // }, this, 1000 / FPS);
    }
    effect.revolve2 = revolve2;
})(effect || (effect = {}));
