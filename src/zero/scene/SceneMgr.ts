namespace zero {
    /**
     * 场景管理类（单例类）
     * 用于切换场景
     */
    export class SceneMgr {
        private static _instance: SceneMgr;
        private _container: egret.DisplayObjectContainer;
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
            if (!this._container) {
                console.error(`无法加载场景！SceneMgr.sceneContainer需要用一个显示对象容器对象初始化`);
                return;
            }

            layerMgr.unbindAll();

            let scene: Scene = new clazz();
            if (this._scene) {
                this._scene.unload();
            }
            scene.preload();
            this._scene = scene;

            this.addScene();
        }

        private addScene(): void {
            if (!this._scene) return;

            this._container.addChildAt(this._scene, 0);
        }

        /**
         * 场景容器 非特殊情况应该将这个值设置为stage
         * @param {egret.DisplayObjectContainer} container
         */
        public set sceneContainer(container: egret.DisplayObjectContainer) {
            this._container = container;
            container.removeChildren();
        }

        /**
         * 返回当前的场容器
         * @returns {egret.DisplayObjectContainer}
         */
        public get sceneContainer(){
            return this._container;
        }
        public get currentScene():Scene{
            return this._scene;
        }
    }
}