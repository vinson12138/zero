var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** Created by Neo on 2018/2/28 */
var zero;
(function (zero) {
    /**
     * RoateFilter类
     */
    var RotateFilterFactory = (function () {
        /**
         * 构造函数
         */
        function RotateFilterFactory() {
        }
        /**
         * 创建一个旋转滤镜
         * @param {number} rotationAxis
         * @param uniforms
         * @returns {egret.CustomFilter}
         */
        RotateFilterFactory.create = function (rotationAxis, uniforms) {
            var fragmentSrc;
            var filter;
            if (rotationAxis === RotateFilterFactory.X) {
                fragmentSrc = this.xRotateFragmentSrc();
            }
            if (rotationAxis === RotateFilterFactory.Y) {
                fragmentSrc = this.yRotateFragmentSrc();
            }
            filter = new egret.CustomFilter(this.vertexSrc(), fragmentSrc, uniforms);
            return filter;
        };
        RotateFilterFactory.vertexSrc = function () {
            return "\n            attribute vec2 aVertexPosition;\n            attribute vec2 aTextureCoord;\n\n            uniform vec2 projectionVector;\n\n            varying vec2 vTextureCoord;\n            \n            const vec2 center = vec2(-1.0, 1.0);\n\n            void main(void) {\n                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n                vTextureCoord = aTextureCoord;\n            }\n            ";
        };
        RotateFilterFactory.xRotateFragmentSrc = function () {
            return "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            uniform sampler2D uSampler;\n\n            uniform float angle;\n            uniform bool clockwise; \n\n            void main() {\n                vec2 coord = vTextureCoord.xy;\n                float scale, radian, cosVal, tx, ty;\n                \n                scale = angle >= 90.0 ? 0.4 * (2.0 - angle / 90.0) : 0.4 * angle / 90.0;\n                radian = radians(angle);\n                cosVal = clockwise ? cos(radian) : -cos(radian);\n                \n                ty = (coord.y - 0.5) / cosVal;\n                if(coord.y <= 0.5) {\n                    ty += 0.5;\n                    if(ty < 0.0) return;\n                    \n                    tx = (0.5 - ty) * scale;\n                    coord.x = (tx + coord.x) / (1.0 + 2.0 * tx);\n                    coord.y = cosVal < 0.0 ? 1.0 - ty : ty;\n                    gl_FragColor = texture2D(uSampler, coord);\n                } \n                else {\n                    if(ty > 0.5) return; \n                    \n                    tx = ty * scale;\n                    coord.x = (coord.x - tx) / (1.0 - 2.0 * tx);\n                    coord.y = cosVal < 0.0 ? 0.5 - ty : 0.5 + ty;\n                    gl_FragColor = texture2D(uSampler, coord); \n                }\n            }\n            ";
        };
        RotateFilterFactory.yRotateFragmentSrc = function () {
            return "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            \n            uniform sampler2D uSampler;\n            uniform float angle;\n            uniform bool clockwise;\n\n            void main() {\n                vec2 coord = vTextureCoord.xy;\n                float scale, radian, cosVal, tx, ty;\n                \n                scale = angle >= 90.0 ? 0.4 * (2.0 - angle / 90.0) : 0.4 * angle / 90.0;\n                radian = radians(angle);\n                cosVal = clockwise ? cos(radian) : -cos(radian);\n                \n                tx = (coord.x - 0.5) / cosVal;\n                if(coord.x <= 0.5) {\n                    tx += 0.5;\n                    if (tx < 0.0) return ;\n                    \n                    ty = (0.5 - tx) * scale;\n                    coord.x = cosVal < 0.0 ? 1.0 - tx : tx;\n                    coord.y = (ty + coord.y) / (1.0 + 2.0 * ty);\n                    gl_FragColor = texture2D(uSampler, coord);\n                } \n                else {\n                    if(tx > 0.5) return; \n                    \n                    ty = tx * scale;\n                    coord.x = cosVal < 0.0 ? 0.5 - tx : 0.5 + tx;\n                    coord.y = (coord.y - ty) / (1.0 - 2.0 * ty);\n                    gl_FragColor = texture2D(uSampler, coord);\n                }\n            }\n            ";
        };
        /**
         * 以X轴为旋转轴，即垂直旋转
         * @type {number}
         */
        RotateFilterFactory.X = 1;
        /**
         * 以Y轴为旋转轴，即水平旋转
         * @type {number}
         */
        RotateFilterFactory.Y = 2;
        return RotateFilterFactory;
    }());
    zero.RotateFilterFactory = RotateFilterFactory;
    __reflect(RotateFilterFactory.prototype, "zero.RotateFilterFactory");
})(zero || (zero = {}));
