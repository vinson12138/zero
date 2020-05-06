/**
 * create by WangCheng on 2020/5/6 9:12
 */
namespace math
{
    export const Deg2Rad = Math.PI / 180;
    export const Rad2Deg = 180 / Math.PI;

    function _clampAngle(degree: number): number
    {
        degree = degree % 360;
        return degree > 180 ? degree - 360 : degree < -180 ? degree + 360 : degree;
    }

    function _clampAngleFull(degree: number): number
    {
        degree = degree % 360;
        return degree < 0 ? degree + 360 : degree;
    }

    export function clampAngle<T>(degree: T): T
    {
        if (typeof degree == "number")
        {
            return <T><any>_clampAngle(degree);
        }
        if (degree instanceof Vect2)
        {
            degree.x = _clampAngle(degree.x);
            degree.y = _clampAngle(degree.y);
            return degree;
        }
        if (degree instanceof Vect3)
        {
            degree.x = _clampAngle(degree.x);
            degree.y = _clampAngle(degree.y);
            degree.z = _clampAngle(degree.z);
            return degree;
        }
    }

    export function clampAngleFull<T>(degree: T): T
    {
        if (typeof degree == "number")
        {
            return <T><any>_clampAngleFull(degree);
        }
        if (degree instanceof Vect2)
        {
            degree.x = _clampAngleFull(degree.x);
            degree.y = _clampAngleFull(degree.y);
            return degree;
        }
        if (degree instanceof Vect3)
        {
            degree.x = _clampAngleFull(degree.x);
            degree.y = _clampAngleFull(degree.y);
            degree.z = _clampAngleFull(degree.z);
            return degree;
        }
    }

    export function radian<T>(degree: T): T
    {
        if (typeof degree == "number")
        {
            return <T><any>(math.Deg2Rad * degree);
        }
        if (degree instanceof Vect2)
        {
            return <T><any>Vect2.scale(degree, math.Deg2Rad);
        }
        if (degree instanceof Vect3)
        {
            return <T><any>Vect3.scale(degree, math.Deg2Rad);
        }
    }

    export function degree<T>(radian: T): T
    {
        if (typeof radian == "number")
        {
            return <T><any>(math.Rad2Deg * radian);
        }
        if (radian instanceof Vect2)
        {
            return <T><any>Vect2.scale(radian, math.Rad2Deg);
        }
        if (radian instanceof Vect3)
        {
            return <T><any>Vect3.scale(radian, math.Rad2Deg);
        }
    }

    /**
     *
     * @param start
     * @param end
     * @param ratio
     */
    export function lerp<T>(start: T, end: T, ratio: number): T
    {
        ratio = clamp01(ratio);
        if (typeof start == "number" && typeof end == "number")
        {
            return <T><any>(start + (end - start) * ratio);
        }
        if (start instanceof Vect2 && end instanceof Vect2)
        {
            return <T><any>Vect2.lerp(start, end, ratio);
        }
        if (start instanceof Vect3 && end instanceof Vect3)
        {
            return <T><any>Vect3.lerp(start, end, ratio);
        }
        return start;
    }
}



