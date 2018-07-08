<script>
import path from 'path'
export default {
    methods:{
        PlayTimeAudio () {
            let HH = new Date().getHours()
            let filenum = HH + 28
            let audio = document.createElement("audio")
            audio.src = `static/shigure/Shigure${ filenum }.mp3`
            audio.play()
        }
    },
    mounted(){
        this.PlayTimeAudio()
    }
}
</script>
