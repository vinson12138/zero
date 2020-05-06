/**
 * create by WangCheng on 2020/5/6 9:16
 */
class Vect3
{
    private _x: number;
    private _y: number;
    private _z: number;
    private _length: number;
    private _lengthChanged: boolean;

    public constructor(x: number = 0, y: number = 0, z: number = 0)
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._lengthChanged = true;
    }

    public set x(value: number)
    {
        if (this._x == value) return;
        this._x = value;
        this._lengthChanged = true;
    }

    public get x()
    {
        return this._x;
    }

    public set y(value: number)
    {
        if (this._y == value) return;
        this._y = value;
        this._lengthChanged = true;
    }

    public get y()
    {
        return this._y;
    }

    public set z(value: number)
    {
        if (this._z == value) return;
        this._z = value;
        this._lengthChanged = true;
    }

    public get z()
    {
        return this._z;
    }

    public get length(): number
    {
        if (this._lengthChanged)
        {
            this._length = Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2) + Math.pow(this._z, 2));
            this._lengthChanged = false;
        }
        return this._length;
    }

    /**
     * 点乘的几何意义：目标向量在当前向量方向上的投影和当前向量长度的乘积
     * m(v1) * m(v2) * cosθ = x1 * x2 + y1 * y2 + z1 * z2
     * @param v
     */
    public dot(v: Vect3): number
    {
        return this._x * v._x + this._y * v._y + this._z * v._z;
    }

    /**
     * 叉乘的几何意义：当前向量和目标向量构成的平面的法向量
     * (x1, y1, z1) × (x2, y2, z2) = (y1z2 - z1y2, z1x2 - x1z2, x1y2 - x2y1)
     * @param v
     */
    public cross(v: Vect3): Vect3
    {
        return new Vect3(
            this._y * v._z - this._z * v._y,
            this._z * v._x - this._x - v._z,
            this._x * v._y - this._y * v._x
        );
    }

    /**
     * 对当前向量加一个向量
     * @param v
     */
    public add(v: Vect3): Vect3
    {
        this.x += v._x;
        this.y += v._y;
        this.z += v._z;
        return this;
    }

    /**
     * 对当前向量减一个向量
     * @param v
     */
    public subtract(v: Vect3): Vect3
    {
        this.x -= v._x;
        this.y -= v._y;
        this.z -= v._z;
        return this;
    }

    /**
     * 对当前向量进行扩大或缩小
     * @param s
     */
    public scale(s: number): Vect3
    {
        this._x *= s;
        this._y *= s;
        this._z *= s;
        this._length *= s;
        return this;
    }

    /**
     * 将当前向量绕 x轴 逆时针旋转指定角度(弧度)
     *
     *    旋转矩阵      当前向量            结果向量
     *  1   0    0        x        1 * x + 0 * y + 0 * z
     *  0  cos -sin   *   y   =    0 * x + cos * y - sin * z
     *  0  sin  cos       z        0 * x + sin * y + cos * z
     *
     * @param rad
     */
    public rotateX(rad: number): Vect3
    {
        if (this.length == 0) return this;
        let cos = math.round(Math.cos(rad), 6);
        let sin = math.round(Math.sin(rad), 6);
        let y = cos * this._y - sin * this._z;
        let z = sin * this._y + cos * this._z;
        this._y = y;
        this._z = z;
        return this;
    }

    /**
     * 将当前向量绕 y轴 逆时针旋转指定角度(弧度)
     *
     *   旋转矩阵     当前向量            结果向量
     *  cos  0 -sin      x        cos * x + 0 * y - sin * z
     *   0   1  0    *   y   =    0 * x + 1 * y + 0 * z
     *  -sin 0 cos       z        -sin * x + 0 * y + cos * z
     *
     * @param rad
     */
    public rotateY(rad: number): Vect3
    {
        if (this.length == 0) return this;
        let cos = math.round(Math.cos(rad));
        let sin = math.round(Math.sin(rad));
        let x = cos * this._x - sin * this._z;
        let z = -sin * this._x + cos * this._z;
        this._x = x;
        this._z = z;
        return this;
    }

    /**
     *  将当前向量绕 z轴 逆时针旋转指定角度(弧度)
     *  旋转矩阵     当前向量            结果向量
     *  cos -sin 0      x        cos * x - sin * y + 0 * z
     *  sin cos  0  *   y   =    sin * x + cos * y + 0 * z
     *  0   0    1      z        0 * 0   + 0 * 0   + 1 * z
     *
     * @param rad
     */
    public rotateZ(rad: number): Vect3
    {
        if (this.length == 0) return this;
        let cos = math.round(Math.cos(rad), 6);
        let sin = math.round(Math.sin(rad), 6);
        let x = cos * this._x - sin * this._y;
        let y = sin * this._x + cos * this._y;
        this._x = x;
        this._y = y;
        return this;
    }

    /**
     * 返回当前向量和目标向量之间的夹角（弧度）
     * 不存在正负之分，所以取值范围[0, Π]
     * @param v
     */
    public angleTo(v: Vect3): number
    {
        let cos = this.dot(v) / (this.length * v.length);
        return Math.acos(cos);
    }

    /**
     * 对当前向量进行归一化，保持向量的方向不变，长度变为1
     */
    public normalized(): Vect3
    {
        let length = this.length;
        if (length == 0) return this;

        this._x /= length;
        this._y /= length;
        this._z /= length;
        this._length = 1;
        return this;
    }

    public equals(v: Vect3, epsilon: number = 0): boolean
    {
        return Math.abs(this._x - v._x) < epsilon
            && Math.abs(this._y - v._y) < epsilon
            && Math.abs(this._z - v._z) < epsilon;
    }

    /**
     * 三维空间内，某条向量的法向量是固定的，只有确定向量所在的平面才能确定法向量
     * 叉积的结果就是法向量
     * @param v 与当前向量构成平面的向量
     */
    public normal(v: Vect3): Vect3
    {
        return this.cross(v).normalized();
    }

    public reverse(): Vect3
    {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        return this;
    }

    public toString(): string
    {
        return `(${this._x}, ${this._y}, ${this._z})`;
    }

    public toArray(): number[]
    {
        return [this._x, this._y, this._z];
    }

    public clone(): Vect3
    {
        return new Vect3(this._x, this._y, this._z);
    }

    public static get zero()
    {
        return new Vect3();
    }

    public static get one()
    {
        return new Vect3(1, 1, 1);
    }

    public static lerp(start: Vect3, end: Vect3, ratio: number): Vect3
    {
        let x = start._x + (end._x - start._x) * ratio;
        let y = start._y + (end._y - start._y) * ratio;
        let z = start._z + (end._z - start._z) * ratio;
        return new Vect3(x, y, z);
    }

    /**
     * 将向量缩放，结果为新的向量
     * @param v1
     * @param v2
     */
    public static add(v1: Vect3, v2: Vect3): Vect3
    {
        return v1.clone().add(v2);
    }

    /**
     * 将向量缩放，结果为新的向量
     * @param v1
     * @param v2
     */
    public static subtract(v1: Vect3, v2: Vect3): Vect3
    {
        return v1.clone().subtract(v2);
    }

    /**
     * 将向量缩放，结果为新的向量
     * @param v
     * @param s
     */
    public static scale(v: Vect3, s: number): Vect3
    {
        return v.clone().scale(s);
    }
}