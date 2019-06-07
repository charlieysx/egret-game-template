class SelfAnimation {

	private animationList: Array<{
		props: any,
		duration: number,
		ease: Function
	}> = new Array()
	private animIndex: number = 0

	private _initProps: any = {}

	public constructor() {
	}

	private play(target: egret.DisplayObject, callback?: Function) {
		let data = this.animationList[this.animIndex++]
		if (data) {
			egret.Tween
				.get(target)
				.to(data.props, data.duration, data.ease)
				.call(()=> {
					if (this.animationList.length === this.animIndex) {
						callback && callback()
					} else {
						this.play(target, callback)
					}
				}, this)
		}
	}

	/**
	 * 设置页面初始状态
	 */
	public init(props: any = {}) {
		this._initProps = props
		return this
	}

	/**
	 * 添加动画
	 */
	public add(props: any = {}, duration: number = 0, ease: Function = null) {
		this.animationList.push({
			props: props,
			duration: duration,
			ease: ease
		})
		return this
	}

	public beforeAnim(target: egret.DisplayObject) {
		for (let key in this._initProps) {
			target[key] = this._initProps[key]
		}
	}

	public execute(target: egret.DisplayObject, callback?: Function) {
		this.animIndex = 0
		this.play(target, callback)
	}

	public clear() {
		this.animIndex = 0
		this.animationList = new Array()
		this._initProps = {}
	}
 }