var example;
(function (example) {
    /**
     * 场景图层的编号枚举
     */
    var LayerID;
    (function (LayerID) {
        /**
         * 地图层
         */
        LayerID[LayerID["MAP"] = 0] = "MAP";
        /**
         * UI层，主界面的显示于交互，一般位于最底层
         * @type {number}
         */
        LayerID[LayerID["MAIN_UI"] = 8] = "MAIN_UI";
        /**
         * 弹出层 主要为弹出的对话框
         * @type {number}
         */
        LayerID[LayerID["POPUP"] = 9] = "POPUP";
        /**
         * 消息提示层 系统发出的提示信息等
         * @type {number}
         */
        LayerID[LayerID["TIP"] = 10] = "TIP";
    })(LayerID = example.LayerID || (example.LayerID = {}));
})(example || (example = {}));
