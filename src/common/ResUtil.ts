class ResUtil {
    private bitmapList: {[index: string]: egret.Texture} = {}
    private movieClipList: {[index: string]: egret.MovieClip} = {}

    private static resUtil: ResUtil

    public static get instance() {
        if (!this.resUtil) {
            this.resUtil = new ResUtil()
        }
        return this.resUtil
    }

    /**
     * 加载网络图片
     * item: {
     *  url: 'xxxx' // 图片地址
     *  xxxx // 自己附带其他参数
     * }
     */
    public static loadImageByUrl(item, callback) {
        try {
            RES.getResByUrl(item.url, (event)=> {
                callback && callback({
                    status: 1,
                    event: event,
                    item: item
                })
            }, this, RES.ResourceItem.TYPE_IMAGE)
        } catch (e) {
            console.error(e)
            callback && callback({
                status: 0
            })
        }
    }

    /**
     * 创建图片
     * @param name 
     * @param suffix 
     */
    public static createBitmap(name: string, suffix: string = 'png'): egret.Bitmap {
        const key = `${name}_${suffix}`
        let result = new egret.Bitmap()
        if (!this.instance.bitmapList[key]) {
            this.instance.bitmapList[key] = RES.getRes(key)
        }
        result.texture = this.instance.bitmapList[key]
        return result
    }

    /**
     * 创建动图
     * @param name 
     * @param suffix 
     */
    public static createMovieClip(name: string): egret.MovieClip {
        let result = new egret.MovieClip()
        if (!this.instance.movieClipList[name]) {
            const data_stay: any = RES.getRes(name + '_json')
            const texture_stay: egret.Texture = RES.getRes(name + '_png')
            const mcFactory_stay: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data_stay, texture_stay)
            this.instance.movieClipList[name] = new egret.MovieClip(mcFactory_stay.generateMovieClipData(name))
        }
        result.movieClipData = this.instance.movieClipList[name].movieClipData
        return result
    }

    /**
     * 获取动图的最大宽高
     * @param name 
     * @param suffix 
     */
    public static getMoviceClipWH(name: string): {w: number, h: number} {
        let mw = 0
        let mh = 0
        const movie = ResUtil.createMovieClip(name)
        const tData = movie.movieClipData.textureData
        for (let key in tData) {
            mw = Math.max(tData[key].w, mw)
            mh = Math.max(tData[key].h, mh)
        }
        return {
            w: mw,
            h: mh
        }
    }
}