class LoadingScene extends BaseScene {

    private progressBar: egret.Shape
    private progressText: egret.TextField
    private barWidth: number = 0
    private barHeight: number = 0
    private startTime: number = 0

    private preload: number = 2 // preload资源组的数量
    private main: number = 100 - this.preload

    public async onAddToStage() {
        this.drawBg();
        this.initProgress();

        try {
            this.startTime = new Date().getTime()
            await RES.loadConfig(`resource/default.res.json?v=${Math.random()}`, "resource/")
            await RES.loadGroup("preload", 0, {
                onProgress: (current: number, total: number)=> {
                    let progress = current / total * this.preload
                    let width = this.barWidth * progress / 100
                    this.drawProgress(width, Math.floor(progress))
                }
            })
            // 因为logo是图片，需要等资源加载回来才可以绘制
            this.drawLogo();
            this.load()
        } catch(e) {
            console.error(e)
        }
    }

    private async load() {
        await RES.loadGroup("main", 0, {
            onProgress: (current: number, total: number)=> {
                let progress = current / total * this.main + this.preload
                let width = this.barWidth * progress / 100
                this.drawProgress(width, Math.floor(progress))
            }
        })
    }

    private initProgress() {
        this.barWidth = this.width * 0.6
        this.barHeight = 20
        this.progressBar = new egret.Shape()
        this.progressBar.width = this.barWidth
        this.progressBar.height = this.barHeight
        this.progressBar.x = (this.width - this.barWidth) / 2
        this.progressBar.y = (this.height - this.barHeight) / 2
        this.addChild(this.progressBar)

        this.progressText = new egret.TextField()
        this.progressText.textColor = 0x005660
        this.progressText.size = 28
        this.progressText.strokeColor = 0xFFFFFF
        this.progressText.stroke = 3
        this.progressText.width = this.width
        this.progressText.textAlign = 'center'
        this.progressText.text = '0%'
        this.progressText.y = this.progressBar.y - this.progressText.height - 20
        this.addChild(this.progressText)
    }

    private drawProgress(width, progress) {
        this.progressBar.graphics.clear()
        this.progressBar.graphics.beginFill(0xFFFFFF, 1)
        this.progressBar.graphics.drawRoundRect(0, 0, width, this.barHeight, this.barHeight, this.barHeight)
        this.progressBar.graphics.endFill()
        this.progressText.text = `${progress}%`
        if (progress == 100) {
            let diff = new Date().getTime() - this.startTime
            diff = diff < 1000 ? (1000 - diff) : 300
            egret.setTimeout(()=> {
                // 加载完成跳转到游戏页面
                Router.to({name: 'game'})
            }, this, diff)
        }
    }

    private drawBg() {
        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x56A1D2);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private drawLogo() {
        let logo: egret.Bitmap = ResUtil.createBitmap('egret_icon');
        logo.x = (this.width - logo.width) / 2
        this.addChild(logo);
    }
}