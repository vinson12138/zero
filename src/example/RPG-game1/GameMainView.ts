/** Created by Neo on 2018/3/17 */


namespace example {
    import CtrInfo = zero.CtrInfo;
    import Joystick = zero.Joystick;
    import System = zero.System;

    /**
     * GameMainView类
     */
    export class GameMainView extends zero.Layer {
        /**
         * 构造函数
         */
        public constructor() {
            super();

            this.startCreateScene();
        }

        private stageW: number;
        private stageH: number;
        private speed: number = 4;

        private ctrInfo: CtrInfo;
        private role: Role;
        private map: egret.Sprite;

        /**
         * 创建场景界面
         * Create scene interface
         */
        private startCreateScene(): void {
            let stageW = System.width;
            let stageH = System.height;
            this.stageW = stageW;
            this.stageH = stageH;

            let map = this.createMap();
            this.addChild(map);
            this.map = map;

            let role: Role = new Role();
            role.x = 800;
            role.y = 580;
            role.doAction(Action.STAND, 'RD');
            this.addChild(role);
            this.role = role;

            let joystick = new Joystick();
            joystick.x = 0;
            joystick.y = stageH - joystick.height;
            joystick.setNumDirection(8);
            //内圆不在原始位置就可以移动
            joystick.setOnStartCallBack((data: CtrInfo) => {
                this.ctrInfo = data;
            }, this);
            this.addChild(joystick);
            //console.log(stageH, joystick.height);
            egret.startTick(this.onEachFrame, this);
            console.log(stageW, stageH, this.map.width,this.map.height);
        }

        private onEachFrame(timeStamp: number): boolean {
            let stageW = this.stageW;
            let stageH = this.stageH;
            let speed = this.speed;

            let map = this.map;
            let role = this.role;
            let data = this.ctrInfo;
            if (!data) return;
            if (data.stopped) {
                role.doAction(Action.STAND, null);
                return;
            }

            //运动时
            role.doAction(Action.MOVE, data.direction);
            let radian = data.angle * Math.PI / 180;
            map.x -= speed * Math.cos(radian) + 0.5 | 0;
            map.y -= speed * Math.sin(radian) + 0.5 | 0;

            if (map.x >= 0) {
                map.x = 0;
                role.move(speed, data.angle);
            }
            if (map.y >= 0) {
                map.y = 0;
                role.move(speed, data.angle);
            }
            if (map.x <= stageW - map.width) {
                map.x = stageW - map.width;
                role.move(speed, data.angle);
            }
            if (map.y <= stageH - map.height) {
                map.y = stageH - map.height;
                role.move(speed, data.angle);
            }
            return false;
        }

        private _mapPieces: egret.Bitmap[];

        private createMap(): egret.Sprite {
            this._mapPieces = [];
            let map: egret.Sprite = new egret.Sprite();
            for (let i = 0; i < 4; i++) {
                let piece: egret.Bitmap = new egret.Bitmap();
                piece.texture = RES.getRes('map1_jpg');
                piece.anchorOffsetX = piece.width / 2;
                piece.x = piece.width * i;
                if (i % 2 != 0) {
                    piece.scaleX = -1;
                }
                //piece.y = piece.height * (i / 2 | 0);
                map.addChild(piece);
                this._mapPieces.push(piece);
            }
            return map;
        }
    }
}