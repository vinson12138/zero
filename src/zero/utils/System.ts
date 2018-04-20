module zero {
	export class System {
		public static width: number;
		public static height: number;
		public static designWidth: number;
		public static designHeight: number;
		public static stage: egret.Stage;

		private constructor() {
		}

		public static init(stage: egret.Stage, responsive: boolean = false): void {
			this.stage = stage;
			System.width = stage.stageWidth;
			System.height = stage.stageHeight;
			
			if (responsive) {
				this.stage.addEventListener(egret.Event.RESIZE, () => {
					System.width = stage.stageWidth;
					System.height = stage.stageHeight;
				}, this);
			}
		}
	}
}