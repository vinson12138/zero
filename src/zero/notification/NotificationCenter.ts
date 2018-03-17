/** Created by Neo on 2018/2/8 */
namespace zero {
    import Map = zero.utils.Map;

    /**
     * NotificationCenter类
     */
    export class NotificationCenter {

        private static _instance: NotificationCenter;

        /**
         * 观察者列表
         */
        private _observers: Map<string, Controller>;

        /**
         * 构造函数
         */
        private constructor() {
            this._observers = new Map<string, Controller>();
        }

        public static getInstance(): NotificationCenter {
            if (!this._instance) {
                this._instance = new NotificationCenter();
            }
            return this._instance;
        }

        /**
         * 添加观察者
         * @param {zero.Controller} observer
         */
        public attach(observer: Controller): void {
            this._observers.put(egret.getQualifiedClassName(observer), observer);
            console.log("name", observer.NAME);
        }

        /**
         * 发出通知
         * @param {string} name 通知的名称
         * @param data 通知包含的数据
         */
        public notify(name: string, data: any): void {
            let notification: Notification = new Notification(name, data);
            let observers: Controller[] = this._observers.values;
            for (let observer of observers) {
                if (!observer) return;
                //只给订阅了此消息的观察者，发出通知
                let notificationList: string[] = observer.notificationList();
                if (!notificationList || notificationList.indexOf(name) < 0)
                    return;

                observer.handleNotification(notification);
            }
        }

        /**
         * 获取指定类名的Controller
         * @param {string} name
         * @returns {zero.Controller}
         */
        public getController(name: string): Controller {
            return this._observers.get(name);
        }

        public onRemove(): void {
            let observers: Controller[] = this._observers.values;
            for (let observer of observers) {
                if (!observer) return;

                observer.onRemove();
                observer = null;
            }
            this._observers.removeAll();
        }
    }
}