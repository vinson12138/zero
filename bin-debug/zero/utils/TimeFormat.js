/**
 * Created by Neo on 2017/11/21
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zero;
(function (zero) {
    var utils;
    (function (utils) {
        var TimeFormat = (function () {
            ////////////////////////////////////////////////////////////////////////////
            //public
            //请在此处书写所有的公有方法
            ////////////////////////////////////////////////////////////////////////////
            function TimeFormat() {
            }
            /**
             * 格式化 startTime 距离某个时间点的间隔
             * @param {Date} startTime
             * @returns {string}
             */
            TimeFormat.prototype.formatTimeDistance = function (startTime) {
                var curTime = new Date();
                var t = curTime.getTime() - startTime.getTime(), d = t / (1000 * 60 * 60 * 24) | 0, h = t / (1000 * 60 * 60) | 0, m = t / (1000 * 60) | 0, M = d / 30 | 0, y = M / 12 | 0;
                if (t >= 0) {
                    if (y)
                        return y + TimeFormat.AGO.year;
                    if (M)
                        return M + TimeFormat.AGO.month;
                    if (d) {
                        if (d == 1)
                            return TimeFormat.AGO.oneDay;
                        return d + TimeFormat.AGO.day;
                    }
                    if (h)
                        return h + TimeFormat.AGO.hour;
                    if (m)
                        return m + TimeFormat.AGO.minute;
                    else
                        return TimeFormat.AGO.second;
                }
                else {
                    if (y)
                        return -y + TimeFormat.LATER.year;
                    if (M)
                        return -M + TimeFormat.LATER.month;
                    if (d) {
                        if (d == -1)
                            return TimeFormat.LATER.oneDay;
                        return -d + TimeFormat.LATER.day;
                    }
                    if (h)
                        return -h + TimeFormat.LATER.hour;
                    if (m)
                        return -m + TimeFormat.LATER.minute;
                    else
                        return TimeFormat.LATER.second;
                }
            };
            /**
             * 格式化现在距离未来某个时间的剩余时间
             * @param {Date} endTime
             * @returns {string}
             */
            TimeFormat.prototype.formatTimeRemain = function (endTime) {
                var startTime = new Date();
                var t = endTime.getTime() - startTime.getTime(); //时间差
                var d = 0, h = 0, m = 0, s = 0;
                if (t >= 0) {
                    d = Math.floor(t / 1000 / 3600 / 24);
                    h = Math.floor(t / 1000 / 60 / 60 % 24);
                    m = Math.floor(t / 1000 / 60 % 60);
                    s = Math.floor(t / 1000 % 60);
                }
                return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
            };
            TimeFormat.AGO = {
                year: "年前",
                month: "个月前",
                day: "天前",
                oneDay: "昨天",
                hour: "小时前",
                minute: "分钟前",
                second: "刚刚"
            };
            TimeFormat.LATER = {
                year: "年后",
                month: "个月后",
                day: "天后",
                oneDay: "明天",
                hour: "小时后",
                minute: "分钟后",
                second: "秒后"
            };
            return TimeFormat;
        }());
        utils.TimeFormat = TimeFormat;
        __reflect(TimeFormat.prototype, "zero.utils.TimeFormat");
    })(utils = zero.utils || (zero.utils = {}));
})(zero || (zero = {}));
