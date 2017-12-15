var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (e) {
        /**将设备的宽高预存到System类中 */
        game.System.width = this.stage.stageWidth;
        game.System.height = this.stage.stageHeight;
        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("", "");
        this.createGameScene();
    };
    /**配置文件加载完成后，开始预加载资源组 */
    Main.prototype.onConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemError, this);
        RES.loadConfig("");
    };
    Main.prototype.onGroupComplete = function (e) {
        if (e.groupName === "") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemError, this);
            this.createGameScene();
        }
    };
    Main.prototype.onGroupProgress = function (e) {
        if (e.groupName === "") {
        }
    };
    Main.prototype.onGroupError = function (e) {
        console.warn("GROUP: " + e.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onGroupComplete(e);
    };
    Main.prototype.onItemError = function (e) {
        console.warn("URL: " + e.resItem.url + " has failed to load");
    };
    Main.prototype.createGameScene = function () {
        this.sceneContainer = new egret.DisplayObjectContainer();
        this.sceneContainer.name = "SceneContainer";
        this.addChild(this.sceneContainer);
        var sceneMgr = zero.SceneMgr.getInstance();
        sceneMgr.sceneContainer = this;
        sceneMgr.loadScene(test.TestScrollView);
        console.log(this);
    };
    ;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
