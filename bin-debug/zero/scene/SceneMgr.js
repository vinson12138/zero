var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    /**
     * 场景管理类（单例类）
     * 用于切换场景
     */
    var SceneMgr = (function () {
        function SceneMgr() {
        }
        SceneMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneMgr();
            }
            return this._instance;
        };
        /**
         * 加载场景
         * @param {{new(): T}} clazz 场景的完全类名
         */
        SceneMgr.prototype.load = function (clazz) {
            if (!this._container) {
                console.error("\u65E0\u6CD5\u52A0\u8F7D\u573A\u666F\uFF01SceneMgr.sceneContainer\u9700\u8981\u7528\u4E00\u4E2A\u663E\u793A\u5BF9\u8C61\u5BB9\u5668\u5BF9\u8C61\u521D\u59CB\u5316");
                return;
            }
            zero.layerMgr.unbindAll();
            var scene = new clazz();
            if (this._scene) {
                this._scene.unload();
            }
            scene.preload();
            this._scene = scene;
            this.addScene();
        };
        SceneMgr.prototype.addScene = function () {
            if (!this._scene)
                return;
            this._container.addChildAt(this._scene, 0);
        };
        Object.defineProperty(SceneMgr.prototype, "sceneContainer", {
            /**
             * 返回当前的场容器
             * @returns {egret.DisplayObjectContainer}
             */
            get: function () {
                return this._container;
            },
            /**
             * 场景容器 非特殊情况应该将这个值设置为stage
             * @param {egret.DisplayObjectContainer} container
             */
            set: function (container) {
                this._container = container;
                container.removeChildren();
            },
            enumerable: true,
            configurable: true
        });
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
