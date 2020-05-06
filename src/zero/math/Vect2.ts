/**
 * create by WangCheng on 2020/5/6 9:16
 */
class Vect2
{
    private _x: number;
    private _y: number;
    private _length: number;
    private _lengthChanged: boolean;

    public constructor(x: number = 0, y: number = 0)
    {
        this._x = x;
        this._y = y;
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

    public get length(): number
    {
        if (this._lengthChanged)
        {
            this._length = Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
            this._lengthChanged = false;
        }
        return this._length;
    }

    /**
     * 点乘的几何意义：目标向量在当前向量方向上的投影和当前向量长度的乘积
     * m(v1) * m(v2) * cosθ
     * @param v
     */
    public dot(v: Vect2): number
    {
        return this._x * v._x + this._y * v._y;
    }

    /**
     * 叉乘的几何意义：当前向量和目标向量构成的平面的法向量，2维向量叉乘的结果，x,y坐标永远为零，所以只返回z坐标的值
     * (x1, y1, 0) × (x2, y2, 0) = (0, 0, x1y2 - x2y1)
     * @param v
     */
    public cross(v: Vect2): number
    {
        return this._x * v._y - this._y * v._x;
    }

    /**
     * 对当前向量加一个向量
     * @param v
     */
    public add(v: Vect2): Vect2
    {
        this.x += v._x;
        this.y += v._y;
        return this;
    }

    /**
     * 对当前向量减一个向量
     * @param v
     */
    public subtract(v: Vect2): Vect2
    {
        this.x -= v._x;
        this.y -= v._y;
        return this;
    }

    /**
     * 对当前向量进行扩大或缩小
     * @param s
     */
    public scale(s: number): Vect2
    {
        this._x *= s;
        this._y *= s;
        this._length *= s;
        return this;
    }

    /**
     * 将当前向量绕z轴逆时针旋转一定角度(弧度)
     * @param rad
     */
    public rotate(rad: number): Vect2
    {
        if(this.length == 0) return this;

        let cos = math.round(Math.cos(rad), 6);
        let sin = math.round(Math.sin(rad), 6);
        let x = this._x * cos - this._y * sin;
        let y = this._x * sin + this._y * cos;
        this._x = x;
        this._y = y;
        return this;
    }

    /**
     * 返回向量与x轴的夹角(弧度)
     * 取值范围[-Π，Π]
     */
    public angle(): number
    {
        return Math.atan2(this._y, this._x);
    }

    /**
     * 返回两个向量的夹角(弧度)
     * 不存在正负之分，所以取值范围[0, Π]
     * @param v
     */
    public angleTo(v: Vect2): number
    {
        let cos = this.dot(v) / (this.length * v.length);
        return Math.acos(cos);
    }

    /**
     * 对当前向量进行归一化，保持向量的方向不变，长度变为1
     */
    public normalized(): Vect2
    {
        let length = this.length;
        if (length == 0) return this;

        this._x /= length;
        this._y /= length;
        this._length = 1;
        return this;
    }

    public normal(): Vect2
    {
        return new Vect2(this._y, -this.x).normalized();
    }

    public reverse():Vect2 {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    }
    public clone(): Vect2
    {
        return new Vect2(this._x, this._y);
    }

    public toString():string{
        return `(${this._x}, ${this._y})`;
    }

    public toArray():number[] {
        return [this._x, this._y];
    }

    public static get zero()
    {
        return new Vect2();
    }

    public static get one()
    {
        return new Vect2(1, 1);
    }

    /**
     *
     * @param start
     * @param end
     * @param ratio
     */
    public static lerp(start: Vect2, end: Vect2, ratio: number): Vect2
    {
        let x = start._x + (end._x - start._x) * ratio;
        let y = start._y + (end._y - start._y) * ratio;
        return new Vect2(x, y);
    }

    /**
     * 两个向量相加，结果为新的向量
     * @param v1
     * @param v2
     */
    public static add(v1: Vect2, v2: Vect2): Vect2
    {
        return v1.clone().add(v2);
    }

    /**
     * 两个向量相减 结果为新的向量
     * @param v1
     * @param v2
     */
    public static subtract(v1: Vect2, v2: Vect2): Vect2
    {
        return v1.clone().subtract(v2);
    }

    /**
     * 将向量缩放，结果为新的向量
     * @param v
     * @param s
     */
    public static scale(v: Vect2, s: number): Vect2
    {
        return v.clone().scale(s);
    }
}