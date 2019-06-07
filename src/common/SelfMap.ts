class SelfMap<T> {

	private datas: {[index: string]: T}

	public constructor() {
		this.datas = {}
	}

	public get list() {
		return this.datas
	}

	public put(key: string, data: T) {
		this.datas[key] = data
	}

	public delete(key: string): T {
		let data = this.get(key)
		if (data) {
			delete this.datas[key]
		}
		return data
	}

	public get(key: string): T {
		return this.datas[key]
	}
}