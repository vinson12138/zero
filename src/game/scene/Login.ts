module game.scene {
	export class Login extends Scene{
		public constructor() {
			super();
			console.log("Login 创建了..");
		}
		protected initUI():void {
			console.trace();
			console.log("调用子类的initUI");
		}
	}
}