namespace zero {
    export class SceneMgr {
        private static _instance: SceneMgr;
        private _container: egret.DisplayObjectContainer | egret.Stage;
        private _scene: Scene;

        private constructor() {
        }

        public static getInstance(): SceneMgr {
            if (!this._instance) {
                this._instance = new SceneMgr();
            }
            return this._instance;
        }

        public set sceneContainer(container: egret.Stage | egret.DisplayObjectContainer) {
            this._container = container;
        }

        public load<T extends Scene>(clazz: new () => T): void {
            if (!this._container) {
                console.error(`无法加载场景！SceneMgr.sceneContainer需要用一个{egret.DisplayObjectContainer}对象初始化`);
                return;
            }
            let scene: Scene = new clazz();
            if (this._scene) {
                this._scene.unload();
            }
            this._scene = scene;
            this.addScene();
        }

        private addScene(): void {
            if (!this._scene) return;

            this._container.removeChildren();
            this._container.addChild(this._scene);
        }

        public get currentScene():Scene{
            return this._scene;
        }
    }
}