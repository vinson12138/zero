module game.controller {
	export class TestScrollView extends Controller{
		protected _scene: test.TestScrollView;
		public constructor() {
			super();
		}
		public login():void{
			console.log("登录了");
		}
	}
}