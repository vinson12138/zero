namespace zero {
    /**
     * 继承自<code>eui.Component</code>的图层类
     * 可以设置皮肤文件
     * 默认不可触摸
     */
    export class EUILayer extends eui.Component {
        /**
         * 构造函数
         */
        public constructor() {
            super();

            this.percentWidth = 100;
            this.percentHeight = 100;

            this.touchEnabled = false;
        }
    }
}