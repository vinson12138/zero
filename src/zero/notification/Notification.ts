/** Created by Neo on 2018/2/8 */
namespace zero {
    /**
     * Notification类
     * 通知的数据结构
     */
    export class Notification {
        private _name;
        private _data;

        /**
         * 构造函数
         */
        public constructor(name: string, data: any) {
            this._name = name;
            this._data = data;
        }

        /**
         * 返回通知的名称
         * @returns {string}
         */
        public getName(): string {
            return this._name;
        }

        /**
         * 返回通知携带的数据
         * @returns {any}
         */
        public getData(): any {

        }
    }
}