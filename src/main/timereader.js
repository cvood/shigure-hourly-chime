import path from 'path'

PlayTimeAudio = new function() {
    HH = new Date().getHours()
    filenum = HH + 28
    var audio = new document.createElement("audio")
    audio.src = path.join(__static, '/shigure/shigure${filenum}.mp3')
    audio.play()
}

module.exports = {
    PlayTimeAudio: PlayTimeAudio
}
PlayTimeAudio()