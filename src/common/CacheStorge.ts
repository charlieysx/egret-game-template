class CacheStorge {
    /**
     * key的前缀
     */
    private keyPrefix: string = 'XSJBH-LIANLIANKAN'

    public static cacheStorge: CacheStorge

    public static get instance() {
        if (!this.cacheStorge) {
            this.cacheStorge = new CacheStorge()
        }
        return this.cacheStorge
    }

    private constructor() {
        let href: string = window.location.href
        let version = ''
        if (DEBUG) {
            version = 'local'
        } else {
            try {
                version = href.split('?')[0].split('#')[0].split('/').pop()
            } catch (e) {
                console.log(href)
            }
        }
        this.keyPrefix += `-${version}`
    }

    private generateKey = (key)=> {
        return `${this.keyPrefix}:${key}`.toUpperCase()
    }

    public save(key: string, value?: any) {
        let saveValue
        try {
            saveValue = JSON.stringify(value)
        } catch(e) {
            saveValue = value
        }
        window.localStorage.setItem(this.generateKey(key), saveValue)
    }

    public load(key: string, defaultValue?: any): any {
        let value = window.localStorage.getItem(this.generateKey(key))
        if (value === null) {
            return defaultValue
        }
        try {
            value = JSON.parse(value)
        } catch(e) {
            value = defaultValue
        }
        return value
    }
}