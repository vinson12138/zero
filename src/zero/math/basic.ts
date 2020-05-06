/**
 * create by WangCheng on 2020/5/6 16:04
 */
namespace math
{
    export function clamp(value: number, min: number, max: number): number
    {
        if (max < min)
        {
            let t = max;
            max = min;
            min = t;
        }
        return value < min ? min : value > max ? max : value;
    }

    export function clamp01(value: number): number
    {
        return clamp(value, 0, 1);
    }

    export function floor(n: number, digits: number = 0): number
    {
        let base = pow10(digits);
        return Math.floor(n * base) / base;
    }

    export function ceil(n: number, digits: number = 0): number
    {
        let base = pow10(digits);
        return Math.ceil(n * base) / base;
    }

    export function round(n: number, digits: number = 0): number
    {
        let base = Math.pow(10, digits);
        return Math.round(n * base) / base;
    }

    //十进制倍数 ... 0.1，1，10，100....
    const _decimals: { [k: number]: number } = {};

    export function pow10(exp: number): number
    {
        if (_decimals[exp] == void 0)
        {
            _decimals[exp] = Math.pow(10, exp);
        }
        return _decimals[exp];
    }
}