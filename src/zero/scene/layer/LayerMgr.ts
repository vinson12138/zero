namespace zero {
    export class LayerMgr {
        private static _instance: LayerMgr;
        private _layers: (Layer | EUILayer)[];

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
         * @param {zero.Scene} scene
         * @param {number} layerID
         * @param {zero.Layer | zero.EUILayer} layer
         * @param {string} layerName 图层的名字 可选
         */
        public register(scene: Scene, layerID: number, layer: Layer | EUILayer, layerName?: string): void {
            if (layer) {
                layer.name = layerName ? layerName : "";
                scene.addChild(layer);
                this._layers[layerID] = layer;
            }
        }

        /**
         * 将某个图层与当前场景解绑
         * @param {number} layerID
         */
        public unbind(layerID: number): void {
            let layer: Layer | EUILayer = this.get(layerID);
            if (layer && layer.parent) {
                layer.parent.removeChild(layer);
                layer = null;
            }
        }

        /**
         * 将所有图层与当前活动的场景解绑
         */
        public unbindAll():void {
            for(let layer of this._layers){
                if(!layer) continue;
                if(layer && layer.parent){
                    layer.parent.removeChild(layer);
                    layer = null;
                }
            }
            this._layers = [];
        }

        /**
         *  获取当前活动的场景上的某个图层
         * @param {number} layerID
         * @returns {zero.Layer | zero.EUILayer}
         */
        public get(layerID: number): Layer | EUILayer {
            let layer: Layer | EUILayer = this._layers[layerID];
            if (!layer) {
                console.warn(`ID为[${layerID}]的图层并未不存在`);
                layer = null;
            }
            return layer;
        }
    }
}