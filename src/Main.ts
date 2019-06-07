class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        Router.init(this)
            .setLeaveAnimation(new SelfAnimation().add({alpha: 0}, 300))// 设置页面离开动画
            .setEnterAnimation(new SelfAnimation().init({alpha: 0}).add({alpha: 1}, 300)) // 设置页面进入动画
            .register('loading', LoadingScene) // 注册默认路由
            .register('game', GameScene) // 注册游戏场景路由
            .to({ // 跳转到默认页面
                name: 'loading'
            })
    }
}