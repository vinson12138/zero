/** Created by Neo on 2018/2/3 */

namespace zero.ResUtils {
    /**
     * 加载资源组
     * @param {string} group 资源组名称
     * @param {(e: RES.ResourceEvent) => void} onLoadProgress 资源组加载进度 回调函数
     * @param {(e: RES.ResourceEvent) => void} onLoadComplete 资源组加载成功 回调函数
     * @param {(e: RES.ResourceEvent) => void} onLoadError 资源组加载失败 回调函数
     * @param thisObj 回调函数中this指针的指向
     */
    export function loadGroup(group: string, onLoadProgress: (e: RES.ResourceEvent) => void,
                       onLoadComplete: (e: RES.ResourceEvent) => void,
                       onLoadError: (e: RES.ResourceEvent) => void = null, thisObj:any): void {

        let loader = new ResourceLoader();
        loader.groupName = group;
        loader.onLoadProgress = onLoadProgress;
        loader.onLoadComplete = onLoadComplete;
        loader.onLoadError = onLoadError;
        loader.thisObj = thisObj;

        loader.load();
    }

    /**
     * 自定义的资源加载器
     */
    class ResourceLoader {
        /**
         * 要加载的资源组名
         */
        public groupName: string;
        /**
         * 资源组加载进度 回调函数
         */
        public onLoadProgress: (e: RES.ResourceEvent) => void;
        /**
         * 资源组加载成功 回调函数
         */
        public onLoadComplete: (e: RES.ResourceEvent) => void;
        /**
         * 资源组加载失败 回调函数
         */
        public onLoadError: (e: RES.ResourceEvent) => void;

        /**
         * 当前的this指针的指向
         */
        public thisObj:any;

        /**
         * @constructor
         */
        public constructor() {
        }

        public load() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
            RES.loadGroup(this.groupName);
        }

        private onResourceProgress(e: RES.ResourceEvent): void {
            this.onLoadProgress.call(this.thisObj, e);
        }

        private onResourceLoadComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
                this.onLoadComplete.call(this.thisObj, e);
            }
        }

        private onResourceLoadError(e: RES.ResourceEvent): void {
            //如果有自定义的资源加载出错的处理，就使用自定义的
            if (this.onLoadError != null) {
                this.onLoadError.call(this.thisObj, e);
                return;
            }
            if (e.resItem.url) {
                console.warn(`资源：${e.resItem.url} 加载失败`);
            }
            else {
                console.warn(`资源组：${e.groupName} 加载出错`);
            }

            this.onResourceLoadComplete(e);
        }
    }
}