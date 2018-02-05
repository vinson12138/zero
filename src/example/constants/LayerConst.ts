namespace example {
    /**
     * 场景图层的编号枚举
     */
    export enum BaseLayerID {
        /**
         * UI层，主界面的显示于交互，一般位于最底层
         * @type {number}
         */
        UI = 0,
        /**
         * 弹出层 主要为弹出的对话框
         * @type {number}
         */
        POPUP,
        /**
         * 消息提示层 系统发出的提示信息等
         * @type {number}
         */
        TIP
    }
}