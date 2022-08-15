var canvasWidth = 588 * 1.5
var canvasHeight = 252 * 1.5

const sizeEl = document.getElementById("size")
var size = sizeEl.value

function sizeSorter(size) {
    switch (size) {
        case "21-9":
            canvasWidth = 588 * 1.5
            canvasHeight = 252 * 1.5
            break;
        case "16-9":
            canvasWidth = 488 * 1.5
            canvasHeight = 252 * 1.5
            break;
        case "12-9":
            canvasWidth = 366 * 1.5
            canvasHeight = 252 * 1.5
            break;
        case "9-9":
            canvasWidth = 252 * 1.5
            canvasHeight = 252 * 1.5
            break;

        default:
            break;
    }
}

// 21:9     588:252
// 16:9     488:252
// 4:3 12:9 366:252
// 1:1      252:252


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const trace = document.getElementById("trace")
const trace_ctx = trace.getContext("2d")



let myReq
let anim_active = false
canvas.width = canvasWidth
canvas.height = canvasHeight
trace.width = canvasWidth
trace.height = canvasHeight

ctx.strokeStyle = "black"
ctx.strokeRect(0, 0, canvasWidth, canvasHeight)



let color = "black"


const brick = {
    x: 0,
    y: 0,
    width: 40,
    height: 25,
    dx: 8,
    dy: 8
}


trace_ctx.beginPath();
trace_ctx.moveTo(brick.x, brick.y)


function drawBrick() {
    // ctx.clearRect(brick.x - brick.dx, brick.y - brick.dy, brick.width / 2, brick.height / 2)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.fillRect(brick.x, brick.y, brick.width / 2, brick.height / 2)


}


function drawTrace() {

    trace_ctx.strokeStyle = color;
    trace_ctx.lineWidth = 2;

    trace_ctx.lineTo(brick.x + brick.width / 4, brick.y + brick.height / 4);
    trace_ctx.stroke();


}


function playSound() {
    const audio = new Audio("pong.mp3");
    audio.play();
}


function update() {
    drawTrace()
    drawBrick()

    brick.x += brick.dx
    brick.y += brick.dy

    if (brick.x + brick.width / 2 > canvas.width || brick.x < 0) {
        brick.dx *= -1
        ctx.fillStyle = "skyblue"
        color = "skyblue"
        playSound()
    }

    if (brick.y + brick.height / 2 > canvas.height || brick.y < 0) {
        brick.dy *= -1
        ctx.fillStyle = "yellow"
        color = "yellow"
        playSound()
    }



    myReq = requestAnimationFrame(update)

    if ((brick.x + brick.width / 2 > canvas.width || brick.x < 0) && (brick.y + brick.height / 2 > canvas.height || brick.y < 0)) {
        color = "lightgreen"
        drawTrace()
        cancelAnimationFrame(myReq);
        anim_active = false
    }
    //console.log((brick.x + brick.width / 4) < brick.dx, (brick.y + brick.height / 4) > canvasHeight + brick.dy );
    // if ((brick.x + brick.width / 4) < brick.dx && (brick.y + brick.height / 4) > canvasHeight + brick.dy) {
    //     cancelAnimationFrame(myReq);
    // }
    //console.log((brick.x + brick.width / 4) , (brick.y + brick.height / 4));
    //console.log((canvasHeight - brick.dy));
}


function hitit() {
    if (!anim_active) {
        anim_active = true
        brick.x = 0
        brick.y = 0
        brick.dx = 8
        brick.dy = 8
        color = "black"
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        trace_ctx.clearRect(0, 0, canvas.width, canvas.height)
        update()
    }
}


function clr() {
    cancelAnimationFrame(myReq);
    ctx.reset()
    trace_ctx.reset()
    brick.x = 0
    brick.y = 0
    brick.dx = 8
    brick.dy = 8
    color = "black"
    anim_active = false
}


function resize() {
    size = sizeEl.value
    sizeSorter(size)
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    trace.width = canvasWidth
    trace.height = canvasHeight
}
// // drawTrace()
// update()


// 2,446