class GameScene extends BaseScene {

    public async onAddToStage() {
        let bg: egret.Bitmap = ResUtil.createBitmap('bg', 'jpg');
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);

        let btn: egret.Shape = new egret.Shape();
        GameUtil.drawRoundRect(btn, 0xFFFFFF, 300, 100, 10, [0, 1, 2, 3]);
        btn.x = (this.width - btn.width) / 2;
        btn.y = (this.height - btn.height) / 2;
        this.addChild(btn);

        let btnText: egret.TextField = new egret.TextField();
        btnText.text = '点击';
        btnText.textColor = 0x000000;
        btnText.x = (this.width - btnText.width) / 2;
        btnText.y = (this.height - btnText.height) / 2;
        this.addChild(btnText);

        GameUtil.tap(btn, ()=> {
            this.toast('点击按钮');
        }, this)
    }
}