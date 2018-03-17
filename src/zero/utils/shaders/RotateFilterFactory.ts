/** Created by Neo on 2018/2/28 */
namespace zero {
    /**
     * RoateFilter类
     */
    export class RotateFilterFactory {
        /**
         * 以X轴为旋转轴，即垂直旋转
         * @type {number}
         */
        public static readonly X = 1;
        /**
         * 以Y轴为旋转轴，即水平旋转
         * @type {number}
         */
        public static readonly Y = 2;

        /**
         * 构造函数
         */
        public constructor() {
        }

        /**
         * 创建一个旋转滤镜
         * @param {number} rotationAxis
         * @param uniforms
         * @returns {egret.CustomFilter}
         */
        public static create(rotationAxis: number, uniforms:{angle:number, clockwise:boolean}): egret.CustomFilter {
            let fragmentSrc: string;
            let filter:egret.CustomFilter;
            if (rotationAxis === RotateFilterFactory.X) {
                fragmentSrc = this.xRotateFragmentSrc();
            }
            if (rotationAxis === RotateFilterFactory.Y){
                fragmentSrc = this.yRotateFragmentSrc();
            }
            filter = new egret.CustomFilter(this.vertexSrc(),fragmentSrc, uniforms);
            return filter;
        }

        private static vertexSrc():string{
            return `
            attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;

            uniform vec2 projectionVector;

            varying vec2 vTextureCoord;
            
            const vec2 center = vec2(-1.0, 1.0);

            void main(void) {
                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
                vTextureCoord = aTextureCoord;
            }
            `;
        }

        private static xRotateFragmentSrc(): string {
            return `
            precision lowp float;
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;

            uniform float angle;
            uniform bool clockwise; 

            void main() {
                vec2 coord = vTextureCoord.xy;
                float scale, radian, cosVal, tx, ty;
                
                scale = angle >= 90.0 ? 0.4 * (2.0 - angle / 90.0) : 0.4 * angle / 90.0;
                radian = radians(angle);
                cosVal = clockwise ? cos(radian) : -cos(radian);
                
                ty = (coord.y - 0.5) / cosVal;
                if(coord.y <= 0.5) {
                    ty += 0.5;
                    if(ty < 0.0) return;
                    
                    tx = (0.5 - ty) * scale;
                    coord.x = (tx + coord.x) / (1.0 + 2.0 * tx);
                    coord.y = cosVal < 0.0 ? 1.0 - ty : ty;
                    gl_FragColor = texture2D(uSampler, coord);
                } 
                else {
                    if(ty > 0.5) return; 
                    
                    tx = ty * scale;
                    coord.x = (coord.x - tx) / (1.0 - 2.0 * tx);
                    coord.y = cosVal < 0.0 ? 0.5 - ty : 0.5 + ty;
                    gl_FragColor = texture2D(uSampler, coord); 
                }
            }
            `;
        }

        private static yRotateFragmentSrc(): string {
            return `
            precision lowp float;
            varying vec2 vTextureCoord;
            
            uniform sampler2D uSampler;
            uniform float angle;
            uniform bool clockwise;

            void main() {
                vec2 coord = vTextureCoord.xy;
                float scale, radian, cosVal, tx, ty;
                
                scale = angle >= 90.0 ? 0.4 * (2.0 - angle / 90.0) : 0.4 * angle / 90.0;
                radian = radians(angle);
                cosVal = clockwise ? cos(radian) : -cos(radian);
                
                tx = (coord.x - 0.5) / cosVal;
                if(coord.x <= 0.5) {
                    tx += 0.5;
                    if (tx < 0.0) return ;
                    
                    ty = (0.5 - tx) * scale;
                    coord.x = cosVal < 0.0 ? 1.0 - tx : tx;
                    coord.y = (ty + coord.y) / (1.0 + 2.0 * ty);
                    gl_FragColor = texture2D(uSampler, coord);
                } 
                else {
                    if(tx > 0.5) return; 
                    
                    ty = tx * scale;
                    coord.x = cosVal < 0.0 ? 0.5 - tx : 0.5 + tx;
                    coord.y = (coord.y - ty) / (1.0 - 2.0 * ty);
                    gl_FragColor = texture2D(uSampler, coord);
                }
            }
            `;
        }
    }
}