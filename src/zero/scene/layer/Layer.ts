namespace zero {
    /**
     * 继承自<code>egret.DisplayObjectContainer</code>的图层类
     * 可以作为显示容器，也可作为显示对象
     * 默认为不可触摸
     */
    export class Layer extends egret.DisplayObjectContainer {
        /**
         * 构造函数
         */
        public constructor() {
            super();

            this.touchEnabled = false;
        }
    }
}