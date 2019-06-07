class ToastMsg {
    public msg: string
    public duration: number = 2000
    public cb: Function

    public constructor(msg, duration, cb) {
        this.msg = msg
        this.duration = duration
        this.cb = cb
    }
}

/**
 * 这是模仿Android中的Toast
 * 实现弹出消息提示，并自动关闭
 */
class Toast {

    /**
     * 消息列表
     */
    private _msgList: Array<ToastMsg> = new Array<ToastMsg>()

    private _toasting: boolean = false

    private _stage: egret.Stage // 舞台

    private _toastContainer: egret.DisplayObjectContainer
    private _shapeBg: egret.Bitmap
    
    public static toast: Toast

    public constructor() {
        // toast到舞台上，保证消息显示在最上层
        this._stage = egret.MainContext.instance.stage
        this._toastContainer = new egret.DisplayObjectContainer()
    }

    public static get instance() {
        if (!this.toast) {
            this.toast = new Toast()
        }
        return this.toast
    }

    public show(msg: string, duration = 2000, cb?: Function) {
        // 将消息存进列表
        this._msgList.push(new ToastMsg(msg, duration, cb))

        // 如果当前在显示消息，那么不掉用显示方法，里面轮询会调用到的
        if (!this._toasting) {
            this._toasting = true
            this._show()
        }
    }

    private _show() {
        if(this._msgList.length > 0) {
            let msg = this._msgList.shift()

            this._toastContainer.alpha = 0

            // 创建文本
            let textField: egret.TextField = new egret.TextField()
            textField.text = msg.msg
            textField.textAlign = 'center'
            textField.textColor = 0xffffff
            textField.size = 24

            // 文本与黑色背景边缘的宽度
            let space = 40

            // 如果文字宽度超过屏幕宽度的0.8倍，就设置一下（相当于设置外容器的最大宽度，暂时只想到这个办法）
            if (textField.textWidth >= GameUtil.getStageWidth() * 0.8) {
                textField.width = GameUtil.getStageWidth() * 0.8 - space
            }
            // 设置装文本的容器的宽高和锚点，文本的锚点
            this._toastContainer.width = textField.width + space
            this._toastContainer.height = textField.height + space

            this._toastContainer.anchorOffsetX = this._toastContainer.width / 2
            this._toastContainer.anchorOffsetY = this._toastContainer.height

            textField.anchorOffsetX = textField.width / 2
            textField.anchorOffsetY = textField.height / 2

            textField.x = this._toastContainer.width / 2
            textField.y = this._toastContainer.height / 2

            // 容器的位置，在底部横向居中
            this._toastContainer.x = GameUtil.getStageWidth() / 2
            this._toastContainer.y = GameUtil.getStageHeight() * 0.8

            let shapeBg = new egret.Shape()
            shapeBg.graphics.beginFill(0x000000, 1)
            shapeBg.graphics.drawRoundRect(0, 0, this._toastContainer.width, this._toastContainer.height, 20, 20)
            shapeBg.graphics.endFill()

            this._toastContainer.addChild(shapeBg)
            this._toastContainer.addChild(textField)

            this._stage.addChild(this._toastContainer)
            
            // 弹出和消失动画
            egret.Tween
                .get(this._toastContainer)
                .to({
                    alpha: 1
                }, 200, egret.Ease.sineIn)
                .wait(msg.duration) // 等待xxx毫秒后再消失
                .to({
                    alpha: 0
                }, 200, egret.Ease.sineIn)
                .wait(100)
                .call(()=> {
                    this._toastContainer.removeChild(shapeBg)
                    this._toastContainer.removeChild(textField)
                    this._stage.removeChild(this._toastContainer)
                    msg.cb && msg.cb()
                    this._show() // 继续显示下一条消息
                }, this)
        } else {
            this._toasting = false
        }
    }
}