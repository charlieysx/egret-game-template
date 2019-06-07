/**
 * 工具类
 */
class GameUtil {

    public static isIos: boolean = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())

    public static getTopStage(): egret.Stage {
        return egret.MainContext.instance.stage
    }
    /**
     * 获取舞台高度
     */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight
    }

    /*
     * 获取舞台宽度
     */
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth
    }

    // 是容器可点击
    public static tap(bitmap: egret.DisplayObject, callback, thisObject) {
        bitmap.touchEnabled = true
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, thisObject)
    }

    // 创建圆角矩形
    public static drawRoundRect(shape: egret.Shape, color: number, width: number, height: number, round: number, rArr: Array<number>) {
        shape.graphics.clear()
        shape.graphics.beginFill(color, 1)
        shape.graphics.drawRoundRect(0, 0, width, height, round, round)
        shape.graphics.endFill()
        let roundArr: Array<number> = [0, 1, 2, 3].filter(item=> rArr.indexOf(item) === -1)
        let rectData: Array<Array<number>> = [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ]
        for (let i = 0;i < roundArr.length;++i) {
            let x = (width - round) * rectData[roundArr[i]][0]
            let y = (height - round) * rectData[roundArr[i]][1]
            shape.graphics.beginFill(color, 1)
            shape.graphics.drawRect(x, y, round, round)
            shape.graphics.endFill()
        }
    }
}