module game.controller {
	export class Startup extends game.controller.Controller{
		public constructor() {
			super();
		}
		public forward():void{
			let sceneMgr = zero.SceneMgr.getInstance();
			sceneMgr.load(test.TestScrollView);
		}
	}
}