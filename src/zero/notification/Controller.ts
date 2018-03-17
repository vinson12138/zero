/** Created by Neo on 2018/2/8 */
namespace zero {
    /**
     * Controller类
     */
    export abstract class Controller{
        public NAME: string = 'Controller';
        private _view: Layer | EUILayer;

        /**
         * 构造函数
         */
        public constructor(view: Layer | EUILayer) {
            this._view = view;
        }

        public onRemove(): void {
            this._view = null;
        }

        /**
         * 感兴趣的消息通知列表
         * @returns {string[]}
         */
        public notificationList(): string[] {
            return Array<string>();
        }

        /**
         * 对通知的处理
         * @param notification
         */
        public abstract handleNotification(notification: Notification): void;

        public getView(): Layer | EUILayer {
            return this._view;
        }
    }
}