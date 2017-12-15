module zero.asset {
	export class ResLoader {
		private _onConfigComplete: Function;
		private _onGroupComplete: Function;
		private _onGroupError: Function;
		private _onGroupProgress: Function;
		private _onItemError: Function;

		public constructor() {
		}
		public loadConfig(url: string, root: string, type: string): void {
			RES.loadConfig(url, root, type);
		}
		public set onConfigComplete(hander: Function) {
			this._onConfigComplete = hander;
		}
		public set onGroupComplete(hander: Function) {
			this.onGroupComplete = hander;
		}
		public set onGroupError(hander: Function) {
			this.onGroupError = hander;
		}
		public set onGroupProgress(hander: Function) {
			this._onGroupProgress = hander;
		}
		public set onItemError(hander: Function) {
			this._onItemError = hander;
		}
	}
}