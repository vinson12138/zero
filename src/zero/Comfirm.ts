module zero.component {
	export class Confirm extends egret.DisplayObjectContainer{
		private content:string;
		private btns:string[];
		private callbacks: Function[];
		private thisObj:any;
		private 
		public constructor(content:string, btns:string[], callbackfns:Function[], thisObj:any) {
			super();
			this.content = content;
			this.btns = btns;
			this.callbacks = callbackfns;
			this.thisObj = thisObj;
		}

		public show():void {
			console.log(this.content);
			for(let i=0,len=this.btns.length;i<len;i++){
				console.log("\t"+this.btns[i]);
			}
		}
		public clickBtn(index:number):void {
			if(index >= this.callbacks.length || index < 0) return;
			console.log("点击了---"+this.btns[index]);
			this.callbacks[index].call(this.thisObj);
		};

	}
}