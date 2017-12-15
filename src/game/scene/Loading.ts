module game.scene {
	export class Loading extends Scene{
		private _controller:controller.Controller;
		private nodes:egret.DisplayObject[]
		public constructor() {
			super();
			console.log("Loading 创建了..");
			
			this._controller = new controller.Startup();
			this._controller.scene = this;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}
		protected initUI():void {
			this.nodes = new Array<egret.DisplayObject>();
			let rect:egret.Shape;
			for(let i=0;i<500;i++){
				rect = new egret.Shape();
				rect.graphics.beginFill(0xff0000, 0.1);
				rect.graphics.drawRect(0,0,System.width, System.height);
				rect.graphics.endFill();
				this.addChild(rect);
				this.nodes.push(rect)
			}
			console.log("创建的");
			console.log(this.$children);
		}

		private onTouch(e:egret.TouchEvent):void {
			(<controller.Startup>this._controller).forward();
		}
	}
}