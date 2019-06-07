class Http {

    private baseUrl: string = ''

    public static http: Http

    public static get instance() {
        if (!this.http) {
            this.http = new Http()
        }
        return this.http
    }

    private constructor() {
        
    }

    private request({method = egret.HttpMethod.GET, url, params = {}, headers = {}}): Promise<any> {
        if (!(/http(|s):\/\//.test(url))) {
            url = this.baseUrl + url
        }
        let _params: any = ''
        let _headers = {}
        _headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // 如果有传入，则覆盖掉
        for (let key in headers) {
            _headers[key] = headers[key]
        }
        if (_headers['Content-Type'] === 'application/json') {
            _params = JSON.stringify(params)
            _params = _params.replace(/\+/g, "%2B").replace(/\&/g, "%26")
            // console.log(_params)
        } else {
            for (let key in params) {
                _params += `${key}=${('' + params[key]).replace(/\&/g, "%26")}&`
            }
            _params = _params.replace(/\+/g, "%2B")
            // console.log(_params)
            if (_params.length > 0) {
                _params = _params.substring(0, _params.length - 1)
            }
            if (method === egret.HttpMethod.GET) {
                url += `?${_params}`
            }
        }

        return new Promise((resolve, reject)=> {
            let request = new egret.HttpRequest()
            request.responseType = egret.HttpResponseType.TEXT
            request.open(url, method)
            for (let key in _headers) {
                request.setRequestHeader(key, _headers[key])
            }
            if (method === egret.HttpMethod.GET) {
                request.send()
            } else {
                request.send(_params)
            }
            request.addEventListener(egret.Event.COMPLETE, (event)=> {
                dealResult(event)
            }, this)
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event)=> {
                dealResult(event, false)
            }, this)
            function dealResult(event, success = true) {
                let response
                try {
                    response = JSON.parse(request.response)
                } catch(e) {
                    response = request.response
                }
                if (success) {
                    resolve(response)
                } else {
                    reject(response)
                }
            }
        })
    }

    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    public get(url: string, params = {}, headers = {}): Promise<any> {
        return this.request({
            url: url,
            params: params,
            headers: headers
        })
    }

    public post(url: string, params = {}, headers = {}): Promise<any> {
        return this.request({
            method: egret.HttpMethod.POST,
            url: url,
            params: params,
            headers: headers
        })
    }
}