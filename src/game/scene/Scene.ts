module game.scene {
	/**
	 * 游戏场景基类
	 */
	export class Scene extends egret.DisplayObjectContainer {
		protected gameLayer: egret.DisplayObjectContainer;
		protected popupLayer: egret.DisplayObjectContainer;
		protected msgLayer: egret.DisplayObjectContainer;

		public constructor() {
			super();
			this.touchEnabled = true;
			this.touchChildren = true;
			this.initUI();
		}
		/**由父类调用，子类无需主动调用 */
		protected initUI(): void {
			console.log("父元素调用");
		}
		/**
		 * 唤醒场景
		 */
		public awake(): void { }
		/**
		 * 场景是否正在卸载
		 */
		public isUnloading(): boolean { return }
		/**
		 * 场景预卸载处理
		 */
		public preUnload(): void { }
		/**
		 * 卸载场景
		 */
		public unload(): void {
			// console.log("销毁类");
			// this.$children.forEach(node => {
			// 	node = null;
			// });
			// this.removeChildren();
			// console.log(this);
		}
	}
}