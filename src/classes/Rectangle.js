const SELECTION_GAP = 4;

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
    this.isSelected = isSelected;
  }

  containsCoordinate(x, y) {
    const maxX = this.x + this.width;
    const maxY = this.y + this.height;

    return x >= this.x && x <= maxX && y >= this.y && y <= maxY;
  }

  drawSelection() {
    this.context.beginPath();
    this.context.roundRect(
      this.x - SELECTION_GAP,
      this.y - SELECTION_GAP,
      this.width + SELECTION_GAP * 2,
      this.height + SELECTION_GAP * 2,
      5
    );
    this.context.strokeStyle = "blue";
    this.context.stroke();
  }

  draw() {
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
    this.context.closePath();
    if (this.text !== "1") {
      this.context.beginPath();
      const [num, denom] = this.text.split("/");
      this.context.fillText(
        num,
        this.x + this.width / 2,
        this.y + this.height / 2.5
      );
      this.context.fillText(
        denom,
        this.x + this.width / 2,
        this.y + this.height / 2 + 14
      );
      this.context.moveTo(
        this.x + this.width / 2 - 6,
        this.y + this.height / 2
      );
      this.context.lineTo(
        this.x + this.width / 2 + 6,
        this.y + this.height / 2
      );
      this.context.strokeStyle = "black";
      this.context.stroke();
      this.context.closePath();
    } else {
      this.context.beginPath();
      this.context.fillText(
        this.text,
        this.x + this.width / 2,
        this.y + this.height / 2 + 2
      );
      this.context.closePath();
    }

    // Reset fill and stroke styles
    this.context.fillStyle = "rgba(0,0,0,0)";
    this.context.strokeStyle = "#000000";
  }
}

export default Rectangle;
