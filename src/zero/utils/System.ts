module zero {
	export class System {
		private static _width: number;
		private static _height: number;
		private constructor() {
		}

		public static set width(width: number) {
			this._width = width;
		}
		public static get width(): number {
			return this._width
		}
		public static set height(height: number) {
			this._height = height;
		}
		public static get height(): number {
			return this._height;
		}
	}
}