const drawRect = (
    canvasEl,
    x = 100,
    y = 100,
    width = 100,
    height = 100,
    strokeColor = 'black',
    backgroundColor = 'rgba(0,0,0,0)',
    text = '',
    textAlign = 'center',
) => {
    const context = canvasEl.getContext("2d");

    // Hard code font
    context.font = "16px Kalam";

    context.beginPath()
    context.roundRect(x, y, width, height, 5)
    context.fillStyle = backgroundColor;
    context.fill()
    context.strokeStyle = strokeColor;
    context.stroke()
    context.fillStyle = '#000000';
    context.textAlign = textAlign;
    context.textBaseline = 'middle';
    context.fillText(text, x + width / 2, y + height / 2 + 2)

    // Reset fill and stroke styles
    context.fillStyle = 'rgba(0,0,0,0)'
    context.strokeStyle = '#000000'
}

export default drawRect;