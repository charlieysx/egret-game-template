class WxSdk {

    private signPackage: BodyConfig = new BodyConfig()

    public static wxsdk: WxSdk

    public static get instance() {
        if (!this.wxsdk) {
            this.wxsdk = new WxSdk()
        }
        return this.wxsdk
    }

    private constructor() {
        
    }

    /**
     * 配置微信签名
     */
    public configWx(): Promise<any> {
        // 这里有个坑。用//api.24haowan.com时，nonceStr是大写。用平台时是：noncestr。切换时记得切换
        if (!this.signPackage.appId || !this.signPackage.timestamp ||
            !this.signPackage.nonceStr || !this.signPackage.signature) {
            return Promise.reject('微信签名参数错误')
        }
        this.signPackage.debug = false
        this.signPackage.jsApiList = [
                // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
                // 录音相关
                'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
            ]
        /* 微信接口 */
        wx.config(this.signPackage)
        wx.error(err=> {
            console.error('error: configWx of wxsdk.ts', err)
        })
        return Promise.resolve('微信签名配置完成')
    }

    /**
     * 获取微信签名信息
     */
    public getWxSignPackage(): Promise<any> {
        let params = {
            url: encodeURIComponent(window.location.href.split('#')[0])
        }
        // 获取微信签名
        return Http.instance.get('xxxxx', params)
                .then(response=> {
                    let data = response.payload
                    if (!data.appId) {
                        return Promise.reject(response.msg || response)
                    }
                    this.signPackage.appId = data.appId
                    this.signPackage.timestamp = data.timestamp
                    this.signPackage.nonceStr = data.nonceStr
                    this.signPackage.signature = data.signature
                    return Promise.resolve(this.configWx())
                })
                .catch(error=> {
                    console.error('error: getWxSignPackage of wxsdk.js', JSON.stringify(error))
                    return Promise.reject(error)
                })
    }

    public share(shareInfo: ShareBody) {
        if (!shareInfo.title) {
            shareInfo.title = '分享标题'
        }
        if (!shareInfo.link) {
            shareInfo.link = window.location.href.split('#')[0]
        }
        if (!shareInfo.desc) {
            shareInfo.desc = '分享描述'
        }
        wx.ready(()=> {
            console.log('wx ready', shareInfo)
            wx.onMenuShareAppMessage(shareInfo)
            wx.onMenuShareTimeline(shareInfo)
            wx.onMenuShareQQ(shareInfo)
            wx.onMenuShareWeibo(shareInfo)
        })
    }
}