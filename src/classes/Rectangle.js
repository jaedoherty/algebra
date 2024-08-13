const SELECTION_GAP = 4

class Rectangle {
  constructor(
    context,
    x,
    y,
    width,
    height,
    border,
    background,
    text,
    textAlign
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.border = border;
    this.background = background;
    this.text = text;
    this.textAlign = textAlign;
    this.isSelected = false;
  }

  onClick(isSelected) {
    this.isSelected = isSelected
  }

  containsCoordinate(x, y) {
    const maxX = this.x + this.width
    const maxY = this.y + this.height

    return x >= this.x && x <= maxX && y >= this.y && y <= maxY
  }

  draw() {
    if (this.isSelected) {
      this.context.beginPath()
      this.context.roundRect(this.x - SELECTION_GAP, this.y - SELECTION_GAP, this.width + SELECTION_GAP * 2, this.height + SELECTION_GAP * 2, 5)
      this.context.strokeStyle = "blue";
      this.context.stroke();
    }

    // Hard code font
    this.context.font = "16px Kalam";

    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.background;
    this.context.fill();
    this.context.strokeStyle = this.border;
    this.context.stroke();
    this.context.fillStyle = "#000000";
    this.context.textAlign = this.textAlign;
    this.context.textBaseline = "middle";
    this.context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 2);

    // Reset fill and stroke styles
    this.context.fillStyle = "rgba(0,0,0,0)";
    this.context.strokeStyle = "#000000";
  }
}

export default Rectangle;
