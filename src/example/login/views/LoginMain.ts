module example {
	export class LoginMain extends zero.EUILayer {
		private _btnLogin:eui.Button;
		private _btnSetting:eui.Button;

		public constructor() {
			super();
			this.skinName = "LoginMainSkin";

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();

			this._btnLogin.touchChildren = false;
			this._btnSetting.touchChildren = false;

		}

		private onTouch(e:egret.TouchEvent):void {
			if(e.target === this._btnLogin){
				zero.sceneMgr.load(example.HubScene);
			}
		}
	}
}