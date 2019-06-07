class Api {

    private static api: Api

    private constructor() {
        let baseUrl: string = 'http://xxx.com'
        if (DEBUG) {
            baseUrl = 'http://localhost:3000'
        }
        Http.instance.setBaseUrl(baseUrl)
    }

    public static get instance() {
        if (!this.api) {
            this.api = new Api()
        }
        return this.api
    }

    /**
     * 统一处理结果
     */
    private predeal(http: Promise<any>): Promise<any> {
        return http.then(response=> {
                    if (response.code == '0') {
                        // 这个结构根据自己的数据确定
                        return Promise.resolve(response.payload.data || response.payload || response)
                    } else {
                        return Promise.reject(response)
                    }
                })
                .catch(response=> {
                    return Promise.reject(response.msg || '请求出错')
                })
    }

    /**
     * get
     */
    private get(url: string, params = {}, headers = {}): Promise<any> {
        return this.predeal(Http.instance.get(url, params, headers))
    }

    /**
     * post
     */
    private post(url: string, params = {}, headers = {}): Promise<any> {
        return this.predeal(Http.instance.post(url, params, headers))
    }

    /**
     * get例子
     */
    public getInfo(): Promise<any> {
        return this.get('/info')
    }

    /**
     * post例子
     */
    public postInfo(params): Promise<any> {
        return this.post('/info', params)
    }
}