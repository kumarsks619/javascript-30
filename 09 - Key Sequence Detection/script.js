const secret = 'venom'
let pressed = []

window.addEventListener('keyup', (e) => {
    pressed.push(e.key)
    if (pressed.length > secret.length) {
        pressed = pressed.slice(-secret.length)
    }
    if (pressed.join('').toLowerCase() === secret.toLowerCase()) {
        cornify_add()
    }
})
