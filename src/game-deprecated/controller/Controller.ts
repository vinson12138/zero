module game.controller {
	import Scene = zero.Scene;

    export class Controller {
		protected _scene: Scene;
		public constructor() {
		}
		public set scene(scene: Scene) {
			this._scene = scene;
		}
		public forward(scene: Scenes): void {
			let sceneMgr = zero.SceneMgr.getInstance();
			let clazz = null;
			switch (scene) {
				case Scenes.Startup: clazz = game.scene.Startup; break;
				case Scenes.Loading: clazz = game.scene.Loading; break;
				case Scenes.Login: clazz = game.scene.Login; break;
				case Scenes.Hub: clazz = game.scene.Hub; break;
				default: ;
			}
			sceneMgr.load(clazz);
		}
		public destroy(): void {
			this._scene = null;
		}
	}
}