/** Created by Neo on 2018/3/17 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var example;
(function (example) {
    var EUILayer = zero.EUILayer;
    /**
     * GameUIView类
     */
    var GameUIView = (function (_super) {
        __extends(GameUIView, _super);
        /**
         * 构造函数
         */
        function GameUIView() {
            var _this = _super.call(this) || this;
            _this.skinName = 'GameUI';
            return _this;
        }
        GameUIView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        GameUIView.prototype.onTouch = function (e) {
            if (e.target == this._exitBtn) {
                zero.loadingMgr.setLoadingUI(new example.LoginLoadingUI());
                zero.sceneMgr.load(example.HubScene);
            }
        };
        return GameUIView;
    }(EUILayer));
    example.GameUIView = GameUIView;
    __reflect(GameUIView.prototype, "example.GameUIView");
})(example || (example = {}));
