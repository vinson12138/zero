/** Created by Neo on 2018/2/3 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    var ResUtils;
    (function (ResUtils) {
        /**
         * 加载资源组
         * @param {string} group 资源组名称
         * @param {(e: RES.ResourceEvent) => void} onLoadProgress 资源组加载进度 回调函数
         * @param {(e: RES.ResourceEvent) => void} onLoadComplete 资源组加载成功 回调函数
         * @param {(e: RES.ResourceEvent) => void} onLoadError 资源组加载失败 回调函数
         * @param thisObj 回调函数中this指针的指向
         */
        function loadGroup(group, onLoadProgress, onLoadComplete, onLoadError, thisObj) {
            if (onLoadError === void 0) { onLoadError = null; }
            var loader = new ResourceLoader();
            loader.groupName = group;
            loader.onLoadProgress = onLoadProgress;
            loader.onLoadComplete = onLoadComplete;
            loader.onLoadError = onLoadError;
            loader.thisObj = thisObj;
            loader.load();
        }
        ResUtils.loadGroup = loadGroup;
        /**
         * 自定义的资源加载器
         */
        var ResourceLoader = (function () {
            /**
             * @constructor
             */
            function ResourceLoader() {
            }
            ResourceLoader.prototype.load = function () {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
                RES.loadGroup(this.groupName);
            };
            ResourceLoader.prototype.onResourceProgress = function (e) {
                this.onLoadProgress.call(this.thisObj, e);
            };
            ResourceLoader.prototype.onResourceLoadComplete = function (e) {
                if (e.groupName == this.groupName) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
                    this.onLoadComplete.call(this.thisObj, e);
                }
            };
            ResourceLoader.prototype.onResourceLoadError = function (e) {
                //如果有自定义的资源加载出错的处理，就使用自定义的
                if (this.onLoadError != null) {
                    this.onLoadError.call(this.thisObj, e);
                    return;
                }
                if (e.resItem.url) {
                    console.warn("\u8D44\u6E90\uFF1A" + e.resItem.url + " \u52A0\u8F7D\u5931\u8D25");
                }
                else {
                    console.warn("\u8D44\u6E90\u7EC4\uFF1A" + e.groupName + " \u52A0\u8F7D\u51FA\u9519");
                }
                this.onResourceLoadComplete(e);
            };
            return ResourceLoader;
        }());
        __reflect(ResourceLoader.prototype, "ResourceLoader");
    })(ResUtils = zero.ResUtils || (zero.ResUtils = {}));
})(zero || (zero = {}));
