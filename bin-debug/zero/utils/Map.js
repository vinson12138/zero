/** Created by Neo on 2018/2/8 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    var utils;
    (function (utils) {
        /**
         * Map类
         * K 键类型(没有什么特殊原因，应该使用string或者number类型)
         * V 值类型
         */
        var Map = (function () {
            /**
             * 构造函数
             */
            function Map() {
                /**
                 * 键
                 * @type {any[]}
                 */
                this._keys = [];
                /**
                 * 值
                 * @type {any[]}
                 */
                this._values = [];
            }
            /**
             * 增加一个键值对映射
             * @param {K} key
             * @param {T} value
             */
            Map.prototype.put = function (key, value) {
                var index = this.indexOfKey(key);
                //存在键值对，就将值覆盖
                if (index >= 0) {
                    this._values[index] = value;
                }
                else {
                    this._keys.push(key);
                    //value = deepClone(value);
                    this._values.push(value);
                }
            };
            /**
             * 根据键名返回对应的值
             * @param {K} key
             * @returns {V}
             */
            Map.prototype.get = function (key) {
                var index = this.indexOfKey(key);
                if (index >= 0) {
                    return this._values[index];
                }
                return null;
            };
            /**
             * 根据值返回对应的键名
             * @param {V} value
             * @returns {K}
             */
            Map.prototype.getKeyByValue = function (value) {
                return this._keys[this.indexOfValue(value)];
            };
            /**
             * 根据键名移除一个键值对
             * @param {K} key
             * @returns {boolean}
             */
            Map.prototype.remove = function (key) {
                var index = this.indexOfKey(key);
                if (index >= 0) {
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    return true;
                }
                return false;
            };
            Map.prototype.removeAll = function () {
                for (var i = 0; i < this.length; i++) {
                    this.keys[i] = null;
                    this.values[i] = null;
                }
            };
            /**
             * 返回键的索引
             * @param {K} key
             * @returns {number}
             */
            Map.prototype.indexOfKey = function (key) {
                return this._keys.indexOf(key);
            };
            /**
             * 返回值的索引
             * @param {V} value
             * @returns {number}
             */
            Map.prototype.indexOfValue = function (value) {
                return this._values.indexOf(value);
            };
            Object.defineProperty(Map.prototype, "keys", {
                /**
                 * 键列表
                 * @returns {K[]}
                 */
                get: function () {
                    //return deepClone(this._keys);
                    return this._keys;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Map.prototype, "values", {
                /**
                 * 值列表
                 * @returns {V[]}
                 */
                get: function () {
                    //return deepClone(this._values);
                    return this._values;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Map.prototype, "length", {
                /**
                 * 键值对的数目
                 * @returns {number}
                 */
                get: function () {
                    return this._keys.length;
                },
                enumerable: true,
                configurable: true
            });
            return Map;
        }());
        utils.Map = Map;
        __reflect(Map.prototype, "zero.utils.Map");
    })(utils = zero.utils || (zero.utils = {}));
})(zero || (zero = {}));
