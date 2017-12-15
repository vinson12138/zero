module test {
	export class TestScrollView extends game.scene.Scene {
		private scrollviewBG: egret.Shape;
		private scrollview: egret.ScrollView;
		private spContent: egret.Sprite;

		private _controller: game.controller.Controller;
		public constructor() {
			super();
			this.initData();
			this.initUI();
		}
		private initData(): void {
			this._controller = new game.controller.TestScrollView();
			
			this._controller.scene = this;
		}
		protected initUI(): void {
			let shape = new egret.Shape();
			shape.graphics.beginFill(0xffffff);
			shape.graphics.drawRect(0, 0, game.System.width, game.System.height);
			shape.graphics.endFill();
			this.addChild(shape);

			this.spContent = new egret.Sprite();
			this.initContent();
			this.spContent.touchEnabled = true;
			this.spContent.touchChildren = true;
			this.spContent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
			//创建ScrollView
			this.scrollview = new egret.ScrollView();
			this.scrollview.setContent(this.spContent);
			this.scrollview.width = 800;
			this.scrollview.height = 400;
			this.scrollview.x = 100;
			this.scrollview.y = 100;
			this.addChild(this.scrollview);
			//背景图，用来展现ScrollView 的边界
			this.scrollviewBG = new egret.Shape();
			this.scrollviewBG.graphics.lineStyle(1, 0xff00ff);
			this.scrollviewBG.graphics.drawRect(0, 0, this.scrollview.width, this.scrollview.height);
			this.scrollviewBG.graphics.endFill();
			this.scrollviewBG.x = this.scrollview.x;
			this.scrollviewBG.y = this.scrollview.y;
			this.addChild(this.scrollviewBG);
		}
		
		private initContent(): void {
			for (let i = 0; i < 10; i++) {
				let color = i % 2 == 0 ? 0xF9C20B : 0x2A9FFF;
				let shape = new egret.Shape();
				shape.name = "" + i;
				shape.graphics.beginFill(color, 1);
				shape.graphics.drawRect(120 * i, 50, 100, 300)
				shape.graphics.endFill();
				shape.touchEnabled = true;

				this.spContent.addChild(shape);
			}
		}
		private onBtnTouch(e: egret.TouchEvent): void {
			//console.log(e.target.name);
			
			this._controller.forward(Number(e.target.name));
		}


	}
}