const canvas = document.querySelector('#draw')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let isIncreaseLineWidth = true

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true

    // updating the cursor coordinates when the mouse is just clicked to set the origin of line
    lastX = e.offsetX
    lastY = e.offsetY
})
canvas.addEventListener('mouseup', () => (isDrawing = false))
canvas.addEventListener('mouseout', () => (isDrawing = false))
canvas.addEventListener('mousemove', draw)

// setting the context settings
const ctx = canvas.getContext('2d')
ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 15
ctx.globalCompositeOperation = 'multiply'

function draw(e) {
    if (!isDrawing) return // stop the function from running when mouse button is not pressed

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` // setting the line color

    // drawing on canvas
    ctx.beginPath()
    ctx.moveTo(lastX, lastY) // start from
    ctx.lineTo(e.offsetX, e.offsetY) // go to
    ctx.stroke()

    // updating the last position of the cursor
    lastX = e.offsetX
    lastY = e.offsetY

    // updating the line color
    hue++
    if (hue >= 360) hue = 0

    // updating the line width
    if (ctx.lineWidth >= 30 || ctx.lineWidth <= 10) {
        isIncreaseLineWidth = !isIncreaseLineWidth
    }
    if (isIncreaseLineWidth) ctx.lineWidth++
    else ctx.lineWidth--
}
