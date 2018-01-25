namespace zero {
    export class LayerMgr {
        private static _instance: LayerMgr;
        private _layers: egret.DisplayObjectContainer[];

        private constructor() {
            this._layers = [];
        }

        public static getInstance(): LayerMgr {
            if (!this._instance) {
                this._instance = new LayerMgr();
            }
            return this._instance;
        }

        /**
         * 将某个图层添加到场景中
         * @param {zero.Scene} scene 场景
         * @param {number} layerID 图层编号
         * @param {egret.DisplayObject} layer 图层
         */
        public register(scene: Scene, layerID: number, layer: egret.DisplayObjectContainer, layerName?:string): void {
            if(layer){
                layer.name = layerName?layerName:"";
                scene.addChild(layer);
                this._layers[layerID] = layer;
            }
        }

        /**
         * 将某个图层与当前场景解绑
         * @param {number} layerID
         */
        public unbind(layerID: number): void {
            let layer:egret.DisplayObjectContainer = this.get(layerID);
            if(layer && layer.parent){
                layer.parent.removeChild(layer);
                this._layers[layerID] = null;
            }
        }

        /**
         * 获取当前活动的场景上的某个图层
         * @param {number} layerID
         * @returns {egret.DisplayObject}
         */
        public get(layerID: number): egret.DisplayObjectContainer {
            let layer: egret.DisplayObjectContainer = this._layers[layerID];
            if (!layer) {
                console.warn(`ID为[${layerID}]的图层并未被添加到任何场景上`);
                layer = null;
            }
            return layer;
        }
    }
}