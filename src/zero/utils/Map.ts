/** Created by Neo on 2018/2/8 */

namespace zero.utils {
    import deepClone = zero.utils.deepClone;

    /**
     * Map类
     * K 键类型(没有什么特殊原因，应该使用string或者number类型)
     * V 值类型
     */
    export class Map<K, V> {
        /**
         * 键
         * @type {any[]}
         */
        private _keys: K[] = [];
        /**
         * 值
         * @type {any[]}
         */
        private _values: V[] = [];

        /**
         * 构造函数
         */
        public constructor() {
        }

        /**
         * 增加一个键值对映射
         * @param {K} key
         * @param {T} value
         */
        public put(key: K, value: V): void {
            let index: number = this.indexOfKey(key);
            //存在键值对，就将值覆盖
            if (index >= 0) {
                this._values[index] = value;
            }
            else {
                this._keys.push(key);
                //value = deepClone(value);
                this._values.push(value);
            }
        }

        /**
         * 根据键名返回对应的值
         * @param {K} key
         * @returns {V}
         */
        public get(key: K): V {
            let index: number = this.indexOfKey(key);
            if (index >= 0) {
                return this._values[index];
            }
            return null;
        }

        /**
         * 根据值返回对应的键名
         * @param {V} value
         * @returns {K}
         */
        public getKeyByValue(value: V): K {
            return this._keys[this.indexOfValue(value)];
        }

        /**
         * 根据键名移除一个键值对
         * @param {K} key
         * @returns {boolean}
         */
        public remove(key: K): boolean {
            let index: number = this.indexOfKey(key);
            if (index >= 0) {
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            }
            return false;
        }

        public removeAll(): void {
            for (let i = 0; i < this.length; i++) {
                this.keys[i] = null;
                this.values[i] = null;
            }
        }

        /**
         * 返回键的索引
         * @param {K} key
         * @returns {number}
         */
        private indexOfKey(key: K): number {
            return this._keys.indexOf(key);
        }

        /**
         * 返回值的索引
         * @param {V} value
         * @returns {number}
         */
        private indexOfValue(value: V): number {
            return this._values.indexOf(value);
        }

        /**
         * 键列表
         * @returns {K[]}
         */
        public get keys(): K[] {
            //return deepClone(this._keys);
            return this._keys;
        }

        /**
         * 值列表
         * @returns {V[]}
         */
        public get values(): V[] {
            //return deepClone(this._values);
            return this._values;
        }

        /**
         * 键值对的数目
         * @returns {number}
         */
        public get length(): number {
            return this._keys.length;
        }
    }
}