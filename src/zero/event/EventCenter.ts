namespace zero {
	import Map = zero.utils.Map;
	export class EventCenter {
		private static _instance: EventCenter;

		private events: Map<string, Function[]>;

		private constructor() {
			this.events = new Map<string, Function[]>();
		}

		public static getInstance(): EventCenter {
			if (!this._instance) this._instance = new EventCenter();
			return this._instance;
		}

		public addEventListener(eventName: string, listener: (e?: any) => void, thisObject: any): void {
			let listenerList: Function[] = this.events.get(eventName);
			if (!listenerList) this.events.put(eventName, []);

			listener.bind(thisObject);
			listenerList = this.events.get(eventName);

			let i:number;
			for (i = 0; i < listenerList.length; i++) {
				if (listenerList[i] == listener) {
					listenerList[i] = listener;
					break;
				}
			}
			//如果有重复的，i的取值范围为[0, length-1];
			if(i == listenerList.length) listenerList.push(listener);
		}

		public removeEventListener(eventName: string, listener: (e?: any) => void): void {
			let listenerList: Function[] = this.events.get(eventName);
			if (!listenerList || listenerList.length <= 0) return;

			for (let i = 0; i < listenerList.length; i++) {
				if (listenerList[i] == listener) {
					listenerList.splice(i, 1);
					break;
				}
			}
		}

		public removeAllEventListener(eventName: string): void {
			this.events.remove(eventName);
		}

		public dispatchEvent(eventName: string, data?: any): void {
			let listenerList: Function[] = this.events.get(eventName);
			if (!listenerList || listenerList.length <= 0) return;

			for (let listener of listenerList) {
				listener(data);
			}
		}

	}
}