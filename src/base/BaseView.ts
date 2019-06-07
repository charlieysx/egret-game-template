class BaseView extends egret.DisplayObjectContainer {
    /**
     * 加载框（可用于网络请求前调用，或一些异步耗时操作前调用）
     */
    private _loading: egret.DisplayObjectContainer
    private _loadingIcon: egret.Bitmap

    /**
     * 记录是否弹出加载框
     */
    private isLoading: boolean = false


    /**
     * 加载动画
     */
    private loadingTween: egret.Tween

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    
    /**
     * 被添加到舞台
     */
    public onAddToStage(event: egret.Event) {
    }

    /**
     * 视图销毁
     */
    public onDestory() {
    }


    /**
     * 消息提示
     */
    protected toast(msg: string, duration = 2000, cb?: Function) {
	    // 后面会写到如何封装该Toast类
        Toast.instance.show(msg, duration, cb)
    }

    /**
     * 显示加载框
     */
    protected showLoading() {
        if (this.isLoading) {
            return
        }
        this.isLoading = true
        if (!this._loading) {
            this._loading = new egret.DisplayObjectContainer()
            let bg = new egret.Shape()
            bg.graphics.beginFill(0x000000, 1)
            bg.graphics.drawRect(0, 0, this.width, this.height)
            bg.graphics.endFill()
            bg.alpha = 0.3
            bg.touchEnabled = true
            this._loading.addChild(bg)
        }
        if (!this._loadingIcon) {
            // this._loadingIcon = ResUtil.createBitmap('loading_icon') // 这是自己封装的获取bitmap的方法，后面会写到
            // this._loadingIcon.width = 50
            // this._loadingIcon.height = 50
            // this._loadingIcon.anchorOffsetX = this._loadingIcon.width / 2
            // this._loadingIcon.anchorOffsetY = this._loadingIcon.height / 2
            // this._loadingIcon.x = this.width / 2
            // this._loadingIcon.y = this.height / 2
            // this._loading.addChild(this._loadingIcon)
        }
        egret.MainContext.instance.stage.addChild(this._loading)
        this.loadingTween = egret.Tween
                                .get(this._loadingIcon, {loop: true})
                                .to({
                                    rotation: 360
                                }, 500, egret.Ease.sineIn)
    }

    /**
     * 关闭加载框
     */
    protected closeLoading() {
        if (!this.isLoading) {
            return
        }
        if (this.loadingTween) {
            this.loadingTween.setPaused(true)
        }
        this.loadingTween = null
        egret.MainContext.instance.stage.removeChild(this._loading)
        this.isLoading = false
    }
}