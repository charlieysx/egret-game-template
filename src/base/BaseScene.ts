class BaseScene extends BaseView {
    /**
     * 场景名称
     */
    private _pageName: string = ''

    public constructor(pageName: string = '') {
        super()
        this._pageName = pageName
	    // 设置场景宽高为舞台的宽高
        this.width = GameUtil.getStageWidth()
        this.height = GameUtil.getStageHeight()
        // 防止页面点击穿透
        this.touchEnabled = true
    }

    public get pageName() {
        return this._pageName
    }

    /**
     * 关于场景动画部分，后面写路由时会写到
     */
    /**
     * 进入动画执行结束
     */
    public afterEnterAnimation() {
        // console.log(this._pageName, 'afterEnterAnimation')
    }

    /**
     * 离开动画执行结束
     */
    public afterLeaveAnimation() {
        // console.log(this._pageName, 'afterLeaveAnimation')
    }
}//https://mp.weixin.qq.com/s/Kl7yA3ZJwNWmtWym6DEXuQ