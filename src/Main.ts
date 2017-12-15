
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(e: egret.Event): void {
        /**将设备的宽高预存到System类中 */
        game.System.width = this.stage.stageWidth;
        game.System.height = this.stage.stageHeight;

        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("", "");
        this.createGameScene();
    }
    /**配置文件加载完成后，开始预加载资源组 */
    private onConfigComplete(e: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemError, this);
        RES.loadConfig("");
    }
    private onGroupComplete(e: RES.ResourceEvent): void {
        if (e.groupName === "") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemError, this);

            this.createGameScene();
        }
    }
    private onGroupProgress(e: RES.ResourceEvent): void {
        if(e.groupName === ""){
            //给加载界面设置进度数据
        }
    }
    private onGroupError(e: RES.ResourceEvent): void {
        console.warn("GROUP: " + e.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onGroupComplete(e);
    }
    private onItemError(e: RES.ResourceEvent): void {
        console.warn("URL: " + e.resItem.url + " has failed to load");
    }

    private createGameScene() {
        let sceneMgr = zero.SceneMgr.getInstance();
        sceneMgr.sceneContainer = this;
        sceneMgr.loadScene(test.TestScrollView);

        console.log(this);
     };
}