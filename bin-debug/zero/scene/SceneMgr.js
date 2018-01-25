var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    var SceneMgr = (function () {
        function SceneMgr() {
        }
        SceneMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneMgr();
            }
            return this._instance;
        };
        Object.defineProperty(SceneMgr.prototype, "sceneContainer", {
            set: function (container) {
                this._container = container;
            },
            enumerable: true,
            configurable: true
        });
        SceneMgr.prototype.load = function (clazz) {
            if (!this._container) {
                console.error("\u65E0\u6CD5\u52A0\u8F7D\u573A\u666F\uFF01SceneMgr.sceneContainer\u9700\u8981\u7528\u4E00\u4E2A{egret.DisplayObjectContainer}\u5BF9\u8C61\u521D\u59CB\u5316");
                return;
            }
            var scene = new clazz();
            if (this._scene) {
                this._scene.unload();
            }
            this._scene = scene;
            this.addScene();
        };
        SceneMgr.prototype.addScene = function () {
            if (!this._scene)
                return;
            this._container.removeChildren();
            this._container.addChild(this._scene);
        };
        Object.defineProperty(SceneMgr.prototype, "currentScene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        return SceneMgr;
    }());
    zero.SceneMgr = SceneMgr;
    __reflect(SceneMgr.prototype, "zero.SceneMgr");
})(zero || (zero = {}));
