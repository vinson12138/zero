/** Created by Neo on 2018/2/3 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var example;
(function (example) {
    var LoadingUI = zero.LoadingUI;
    /**
     * LoginLoadingUI类
     * 此加载界面 在加载登录界面的资源时显示
     */
    var LoginLoadingUI = (function (_super) {
        __extends(LoginLoadingUI, _super);
        /**
         * 构造函数
         */
        function LoginLoadingUI() {
            var _this = _super.call(this) || this;
            _this.skinName = 'LoadingUI';
            return _this;
        }
        LoginLoadingUI.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // let bg = new egret.Bitmap();
            // bg.texture = RES.getRes('newResult_bg_jpg');
            // bg.width = this.width;
            // bg.height = this.height;
            // this.addChild(bg);
            this.progress = new egret.TextField();
            this.progress.x = 100;
            this.progress.y = 100;
            this.progress.size = 40;
            this.progress.textColor = 0xffff00;
            this.addChild(this.progress);
        };
        /**
         * 设置加载进度
         * @override
         * @param {number} loaded
         * @param {number} total
         */
        LoginLoadingUI.prototype.setProgress = function (loaded, total) {
            var percent = (loaded / total * 100).toFixed(2);
            this.progress.text = percent + "%  (" + loaded + "/" + total + ")";
        };
        return LoginLoadingUI;
    }(LoadingUI));
    example.LoginLoadingUI = LoginLoadingUI;
    __reflect(LoginLoadingUI.prototype, "example.LoginLoadingUI");
})(example || (example = {}));
