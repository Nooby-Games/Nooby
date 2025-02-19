function chat(){
    url = 'https://nooby-games.github.io/Nooby/chatroom/'
    win = window.open('', `Classroom`, 'width=400, height=400, resizable=yes')
    const frame = document.createElement('iframe')
    frame.src = url
    frame.setAttribute('style', 'position: absolute; width: 100vw; height: 100vh; border: none; left: 0px; top: 0px;')
    win.document.body.appendChild(frame)
}
