/** Created by Neo on 2018/3/2 */
namespace example {
    import Controller = zero.Controller;

    export class HubMainController extends Controller {
        private hubMain: HubMainView;
        /**
         * 构造函数
         */
        public constructor(view: HubMainView) {
            super(view);
            this.NAME = 'HubMainController';
            this.hubMain = view;

            this.addEventListener();
        }

        private addEventListener():void {
            //this.hubMain.addEventListener()
        }

        public onRemove(): void {
            super.onRemove();
        }

        public notificationList(): string[] {
            return [

            ];
        }

        public handleNotification(notification: zero.Notification): void {

        }
    }
}