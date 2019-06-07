class Router {

	private static router: Router

    	private _stage: egret.DisplayObjectContainer // 场景容器

	/**
	 * 当前路由信息
	 */
	private _route: {
		name: string,
		meta: any,
		params: any,
		scene: BaseScene
	} = {name: '', meta: null, scene: null, params: null}

	private _params: {
		meta: any,
		params: any,
	} = {meta: null, params: null}

	/**
	 * 路由映射表
	 */
	private _routeMap: SelfMap<{
		className: any,
		name: string,
		meta: any,
		params?: any
	}> = new SelfMap<{
		className: any,
		name: string,
		meta: any,
		params?: any
	}>()

	/**
	 * 页面离开动画
	 */
	private _leaveAnimation: SelfAnimation

	/**
	 * 页面进入动画
	 */
	private _enterAnimation: SelfAnimation

	/**
	 * 
	 */
	private _beforeEach: Function = (to, from, next)=> {next()}

	private constructor() {
	}

    	public static get instance() {
        	if (!this.router) {
            		this.router = new Router()
        	}
        	return this.router
    	}

	public static get params() {
		return this.instance._params.params
	}

	public static get meta() {
		return this.instance._params.meta
	}

	/**
	 * 初始化，设置放置页面的容器
	 */
	public static init(main: egret.DisplayObjectContainer) {
        	if (this.instance._stage) {
            		console.log('已经创建过场景容器')
            		return
        	}
        	if (!main) {
            		console.log('主场景不能为空')
            		return
        	}
		// 创建一个新容器放在main上，专门用来存放页面，这样能保证toast一直在所有页面上
		this.instance._stage = new egret.DisplayObjectContainer()
        	main.addChild(this.instance._stage)
		return this
	}

	/**
	 * 注册页面
	 */
	public static register(key: string, className: any, meta: any = null) {
		this.instance._routeMap.put(key, {className: className, name: key, meta: meta})
		return this
	}

	/**
	 * 跳转路由之前做的事
	 */
	public static beforeEach(beforeEach: Function) {
		this.instance._beforeEach = beforeEach
		return this
	}

	/**
	 * 设置页面离开动画
	 */
	public static setLeaveAnimation(animation?: SelfAnimation) {
		this.instance._leaveAnimation = animation
		return this
	}

	/**
	 * 设置页面进入动画
	 */
	public static setEnterAnimation(animation?: SelfAnimation) {
		this.instance._enterAnimation = animation
		return this
	}

	/**
	 * 退出页面，有动画就执行动画
	 */
	private leavePage(page: BaseScene, callback: Function, leaveAnimation: SelfAnimation) {
		if (!page) {
			callback && callback()
			return
		}
		let animation = leaveAnimation || this._leaveAnimation

		page.onDestory()
		if (animation) {
			animation.execute(page, ()=> {
				callback && callback()
			})
		} else {
			callback && callback()
		}
	}

	/**
	 * 加载页面，有动画就执行动画
	 */
	private enterPage(page: BaseScene, callback: Function, enterAnimation: SelfAnimation) {
		let animation = enterAnimation || this._enterAnimation
		if (animation) {
			animation.beforeAnim(page)
		}
		this._stage.addChild(page)
		if (animation) {
			animation.execute(page, ()=> {
				callback && callback()
			})
		} else {
			callback && callback()
		}
	}

	private _currentLeavePage: BaseScene = null

	public static to(config: {
		name: string,
		params?: any,
		leaveAnimation?: SelfAnimation,
		enterAnimation?: SelfAnimation
	}) {
		let page = this.instance._routeMap.get(config.name)
		if (page == undefined) {
			console.error(`scene ${config.name} is not register`)
			return
		}
		let currentRoute = this.instance._route
		this.instance._beforeEach(page, currentRoute, (to: string = config.name)=> {
			if (to != config.name) {
				config.name = to
				page = this.instance._routeMap.get(config.name)
				if (page == undefined) {
					console.error(`scene ${config.name} is not register`)
					return
				}
			}
			let currentLeavePage = this.instance._currentLeavePage
			// 如果当前离开的页面跟正要离开的页面一样，不执行
			if (currentLeavePage && currentRoute.scene && currentLeavePage.pageName === currentRoute.scene.pageName) {
				return
			}
			// 如果要进入的页面跟当前页面一样，不执行
			if (config.name === currentRoute.name) {
				return
			}
			this.instance._currentLeavePage = currentRoute.scene
			currentLeavePage = currentRoute.scene
			this.instance.leavePage(currentRoute.scene, ()=> {
				currentLeavePage && currentLeavePage.afterLeaveAnimation()
				let newPage = new page.className(config.name)
				this.instance._params.meta = page.meta
				this.instance._params.params = config.params
				this.instance.enterPage(newPage, ()=> {
					currentLeavePage && this.instance._stage.removeChild(currentLeavePage)
					currentLeavePage = this.instance._currentLeavePage = null
					currentRoute.name = config.name
					currentRoute.meta = page.meta
					currentRoute.scene = newPage
					currentRoute.params = config.params
					newPage.afterEnterAnimation()
				}, config.enterAnimation)
			}, config.leaveAnimation)
		})
	}
}