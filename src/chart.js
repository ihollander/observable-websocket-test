class LineChart {
  constructor(ctx, options) {
    this.ctx = ctx;
    if (options) {
      const { color, data } = options;
      this.color = color || "black";
      this.data = data || [];
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  draw() {
    this.ctx.strokeStyle = this.color;
    // take each coordinate set and draw the line
    this.data.forEach(this._drawLine.bind(this));
  }

  _drawLine(coordinates) {
    this.ctx.beginPath();
    this.ctx.moveTo(...coordinates[0]);

    coordinates.slice(1).forEach(coordinate => {
      this.ctx.lineTo(...coordinate);
    });

    this.ctx.stroke();
  }
}

export default LineChart;
