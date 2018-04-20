/**
 * Created by Neo on 2017/11/21
 */
namespace zero.cookie {
    /**
     * 以键值对的方式存储cookie值，并且还可以设置一个过期时间
     * 由于使用了encodeURIComponent对value编码,因此value可以写入';''='这些会混淆cookie值的字符
     * 各浏览器之间对Cookie的数量限制基本上是50个，大小基本为4K(所有的key,value,expires,等号)
     * @param {string} key cookie键
     * @param {string} value cookie值 只能是字符串
     * @param {number} exdays 过期时间，默认30天
     */
    export function set(key: string, value: string, expdays: number = 30): void {
        let d = new Date();
        d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toLocaleTimeString();
        document.cookie = key + "=" + encodeURIComponent(value) + "; " + expires;
    }

    /**
     * 根据键值获取存储的cookie
     * @param {string} key
     * @returns {string}
     */
    export function get(key: string): string {
        let start: number;
        let end: number;
        if (document.cookie.length > 0) {
            start = document.cookie.indexOf(key + "=");
            if (start != -1) {
                start += key.length + 1;
                end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return decodeURIComponent(document.cookie.substring(start, end));
            }
        }

        return "";
    }
    /**
     * 根据键移除cookie键值对
     * @param {string} key
     */
    export function remove(key: string): void {
        //设置为过期，系统会立刻删除cookie
        this.set(key, "", -1);
    }
    /**
     * 清空所有cookie数据
     */
    export function removeAll():void {
        document.cookie = '';
    }


    /**
     * @deprecated 直接使用zero.cookie命名空间里的方法就好
     */
    class Cookie {
        ////////////////////////////////////////////////////////////////////////////
        //public
        //请在此处书写所有的公有方法
        ////////////////////////////////////////////////////////////////////////////
        public constructor() {
        }

        /**
         * 以键值对的方式存储cookie值，并且还可以设置一个过期时间
         * 由于使用了encodeURIComponent对value编码,因此value可以写入';''='这些会混淆cookie值的字符
         * @param {string} key cookie键
         * @param {string} value cookie值 只能是字符串
         * @param {number} exdays 过期时间，默认30天
         */
        public set(key: string, value: string, expdays: number = 30): void {
            let d = new Date();
            d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toLocaleTimeString();
            document.cookie = key + "=" + encodeURIComponent(value) + "; " + expires;
        }

        /**
         * 根据键值获取存储的cookie
         * @param {string} key
         * @returns {string}
         */
        public get(key: string): string {
            let start: number;
            let end: number;
            if (document.cookie.length > 0) {
                start = document.cookie.indexOf(key + "=");
                if (start != -1) {
                    start += key.length + 1;
                    end = document.cookie.indexOf(";", start);
                    if (end == -1) {
                        end = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(start, end));
                }
            }

            return "";
        }

        /**
         * 根据键移除cookie
         * @param {string} key
         */
        public remove(key: string): void {
            //设置为过期，系统会立刻删除cookie
            this.set(key, "", -1);
        }
    }
}