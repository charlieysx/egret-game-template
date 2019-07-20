/**
 * 音乐管理器类
 */
class AudioManager {
    /**
     * 存放播放的声音
     * key：声音名称
     * value：对应的SoundChannel，调用play方法会返回这个对象
     */
    private soundChannelList: {[index: string]: egret.SoundChannel} = {}
    /**
     * 是否静音
     */
    public muted: boolean = false
    /**
     * 自动播放音乐（bgm）
     */
    private autoPlayAudioName: string

    /**
     * 播放列表
     */
    private playList: SelfMap<boolean> = new  SelfMap<boolean>()

    public static audioManager: AudioManager


    public static get instance() {
        if (!this.audioManager) {
            this.audioManager = new AudioManager()
        }
        return this.audioManager
    }

    private constructor() {
        
    }

    /**
     * 设置自动播放音乐列表
     * @param audioName 自动播放音乐名称
     */
    public setAutoPlayAudio(audioName: string) {
        this.autoPlayAudioName = audioName
        this.autoPlay()
    }

    /**
     * 自动播放音乐
     */
    private autoPlay() {
        if (this.muted) {
            return
        }
        if (!this.autoPlayAudioName) {
            return
        }
        this.play(this.autoPlayAudioName, 0, 0)
    }

    /**
     * 播放音乐
     * @param name 音乐名称
     * @param startTime 应开始播放的初始位置（以秒为单位），默认值是 0
     * @param loops 播放次数，默认值是 1。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
     */
    public play(audioName: string, startTime: number = 0, loops: number = 1) {
        this.stop(audioName)
        let audio: egret.Sound = RES.getRes(audioName)
        if (audio && audio.play) {
            this.soundChannelList[audioName] = audio.play(startTime, loops)
            this.soundChannelList[audioName].volume = this.muted ? 0 : 1
        }
        if (loops === 0 && !this.playList.get(audioName)) {
            this.playList.put(audioName, true)
        }
        console.log('play', audioName)
    }

    /**
     * 停止播放指定的音乐
     * @param audioName 音乐名称
     */
    public stop(audioName: string) {
        let channel = this.soundChannelList[audioName]
        if (channel && channel.stop) {
            channel.stop()
            this.soundChannelList[audioName] = null
            console.log('stop', audioName)
        }
        this.playList.delete(audioName)
    }

    /**
     * 停止播放所有音乐
     */
    public stopAll() {
        for (let audioName in this.playList.list) {
            this.stop(audioName)
        }
    }

    /**
     * 设置是否静音
     */
    public mute(muted: boolean) {
        this.muted = muted
        if (muted) {
            this.setVolume(0)
        } else {
            this.setVolume(1)
        }
    }

    public setVolume(volume: number) {
        for (let audioName in this.playList.list) {
            let channel = this.soundChannelList[audioName]
            if (channel && channel.volume >= 0) {
                channel.volume = volume
                console.log('volume', audioName, volume)
            }
        }
    }

    /**
     * 是否正在播放
     */
    public isPlaying(audioName: string) {
        return !this.muted && this.soundChannelList[audioName]
    }
}