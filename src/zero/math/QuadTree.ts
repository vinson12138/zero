/**
 * create by WangCheng on 2020/5/6 19:37
 */
type Rect = { x: number, y: number, width: number, height: number }

namespace math
{
    /**
     * 四叉树
     * 对象只会添加到叶子节点
     */
    export class QuadTree<T extends Rect>
    {
        private maxObjects: number;
        private maxDepth: number;
        private depth: number;
        public bounds: Rect;
        private objects: T[];
        public nodes: QuadTree<T>[];

        public constructor(bounds: Rect, maxObjects?: number, maxDepth?: number, depth?: number)
        {
            this.maxObjects = maxObjects || 10;
            this.maxDepth = maxDepth || 4;
            this.depth = depth || 0;
            this.bounds = bounds;
            this.objects = [];
            this.nodes = [];
        }

        public clear()
        {
            this.objects.length = 0;
            for (let i = this.nodes.length - 1; i >= 0; i--)
            {
                if (this.nodes.length)
                {
                    this.nodes[i].clear();
                }
            }
            this.nodes.length = 0;
        }

        private split()
        {
            let nextDepth = this.depth + 1;
            let subWidth = this.bounds.width / 2;
            let subHeight = this.bounds.height / 2;
            let x = this.bounds.x;
            let y = this.bounds.y;

            //top right
            this.nodes[0] = new QuadTree({x: x + subWidth, y: y, width: subWidth, height: subHeight}, this.maxObjects, this.maxDepth, nextDepth);
            //top left
            this.nodes[1] = new QuadTree({x: x, y: y, width: subWidth, height: subHeight}, this.maxObjects, this.maxDepth, nextDepth);
            //bottom left;
            this.nodes[2] = new QuadTree({x: x, y: y + subHeight, width: subWidth, height: subHeight}, this.maxObjects, this.maxDepth, nextDepth);
            //bottom right
            this.nodes[3] = new QuadTree({x: x + subWidth, y: y + subHeight, width: subWidth, height: subHeight}, this.maxObjects, this.maxDepth, nextDepth);
        }

        /**
         * 获取指定矩形在当前空间所在的所有象限
         * @param rect
         */
        private getIndexes(rect: Rect): number[]
        {
            let indexes = [];
            let midX = this.bounds.x + this.bounds.width / 2;
            let midY = this.bounds.y + this.bounds.height / 2;
            let startInTop = rect.y < midY;
            let startInLeft = rect.x < midX;
            let endInRight = rect.x + rect.width > midX;
            let endInBottom = rect.y + rect.height > midY;

            //右上顶点在第一象限
            if (startInTop && endInRight)
            {
                indexes.push(0);
            }
            //左上顶点在第二象限
            if (startInLeft && startInTop)
            {
                indexes.push(1);
            }
            //左下顶点在第三象限
            if (startInLeft && endInBottom)
            {
                indexes.push(2)
            }
            //右下顶点在第四象限
            if (endInRight && endInBottom)
            {
                indexes.push(3);
            }

            return indexes;
        }

        /**
         * 向四叉树中添加对象，
         * 对象只会添加到叶子节点上
         * 如果对象分属几个象限，每个象限的节点都会添加一份该对象
         * @param rect
         */
        public insert(rect: T)
        {
            let i, indexes;
            if (this.nodes.length)
            {
                indexes = this.getIndexes(rect);
                for (i = indexes.length - 1; i >= 0; i--)
                {
                    this.nodes[indexes[i]].insert(rect);
                }
                return;
            }

            this.objects.push(rect);
            if (this.objects.length > this.maxObjects && this.depth < this.maxDepth)
            {
                if(!this.nodes.length) {
                    this.split();
                }else {
                    console.warn("has nodes but comes here")
                }
                for (i = this.objects.length - 1; i >= 0; i--)
                {
                    indexes = this.getIndexes(this.objects[i]);
                    for (let j = indexes.length - 1; j >= 0; j--)
                    {
                        this.nodes[indexes[j]].insert(this.objects[i]);
                    }
                }
                this.objects.length = 0;
            }
        }

        public retrieve(rect: Rect): T[]
        {
            let indexes = this.getIndexes(rect);
            let ret = this.objects;
            if (this.nodes.length)
            {
                for (let i = indexes.length - 1; i >= 0; i--)
                {
                    ret = ret.concat(this.nodes[indexes[i]].retrieve(rect));
                }
            }
            ret = ret.filter((item, index) =>
            {
                return ret.indexOf(item) >= index;
            });
            return ret;
        }
    }
}