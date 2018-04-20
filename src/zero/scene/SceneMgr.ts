namespace zero {
    /**
     * 场景管理类（单例类）
     * 用于切换场景
     */
    export class SceneMgr {
        private static _instance: SceneMgr;
        private _stage: egret.Stage;
        private _scene: Scene;

        private constructor() {
        }

        public static getInstance(): SceneMgr {
            if (!this._instance) {
                this._instance = new SceneMgr();
            }
            return this._instance;
        }

        /**
         * 加载场景
         * @param {{new(): T}} clazz 场景的完全类名
         */
        public load<T extends Scene>(clazz: new () => T): void {
            if (!this._stage) {
                console.error(`无法加载场景！SceneMgr.stage需要用一个Stage对象初始化`);
                return;
            }

            layerMgr.unbindAll();
            
            //如果当前存在新场景，移除并卸载
            if (this._scene) {
                this.stage.removeChild(this._scene);
                this._scene.unload();
                this._scene = null;
            }
            let scene: Scene = new clazz();
            scene.preload();
            this._scene = scene;

            this.addScene();
        }

        private addScene(): void {
            if (!this._scene) return;
            this._stage.addChildAt(this._scene, 0);
        }

        /**
         * 场景容器 非特殊情况应该将这个值设置为stage
         * @param {egret.Stage} container
         */
        public set stage(container: egret.Stage) {
            this._stage = container;
            container.removeChildren();
        }

        /**
         * 返回当前的场容器
         * @returns {egret.Stage}
         */
        public get stage(){
            return this._stage;
        }
        public get currentScene():Scene{
            return this._scene;
        }
    }
}