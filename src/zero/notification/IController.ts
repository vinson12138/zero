/** Created by Neo on 2018/3/2 */
namespace zero {
    /**
     * IController接口
     */
    export interface IController {
        getControllerName():string;
        notificationList():string[];
        handleNotification(notification: Notification):void;
        onRemove():void;
    }
}