import { fabric } from "fabric";

const drawMode = {
  pan: 'pan',
  line: 'line',
}

export default class ImgMeasure {
  constructor(canvasElement) {
    this.canvas = new fabric.Canvas(canvasElement);
    this.mode = null;
  }

  init() {
    let img = new Image();
    let that = this;
    img.onload = () => {
        this.canvas.setBackgroundImage(
          img.src,
          this.canvas.renderAll.bind(this.canvas),
          {
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height,
          }
        );
    }

    img.src = "./ruler.jpg";
  }

  zoomIn() {
    this.canvas.setZoom(this.canvas.getZoom() * 1.1);
  }

  zoomOut() {
    let zoomScale = 1;
    if ((this.canvas.getZoom() * 0.9) > 1) {
      zoomScale = this.canvas.getZoom() * 0.9;
    }
    this.canvas.setZoom(zoomScale);
  }

  resetZoom() {
    this.canvas.setZoom(1);
    this.canvas.setViewportTransform([1,0,0,1,0,0]);
  }

  drawLine() {
    let lineDrawing = false;
    let line = {};
    this.canvas.on('mouse:down', (event) => {
      if (this.mode == drawMode.line) {
        this.canvas.selection = false;
        lineDrawing = true;
        var pointer = this.canvas.getPointer(event.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];

        line = new fabric.Line(points, {
          strokeWidth: 1,
          fill: 'red',
          stroke: 'red',
          originX: 'center',
          originY: 'center'
        });
        this.canvas.add(line);
      }
    });

    this.canvas.on('mouse:move', (event) => {
      if (!lineDrawing)
        return;
      if (this.mode == drawMode.line) {
        let pointer = this.canvas.getPointer(event.e);
        line.set({x2: pointer.x, y2: pointer.y});
        this.canvas.renderAll();
      }
    });

    this.canvas.on('mouse:up', function (o) {
      lineDrawing = false;
    });
  }

  panning() {
    let panning = false;
    this.canvas.selection = false;

    this.canvas.on('mouse:up', (e) => {
      panning = false;
    });

    this.canvas.on('mouse:down', (e) => {
      if (this.mode === drawMode.pan) {
        panning = true;
      }
    });

    this.canvas.on('mouse:move', (e) => {
      if (panning && this.mode === drawMode.pan) {
        if (e && e.e) {
          var units = 10;
          var delta = new fabric.Point(e.e.movementX, e.e.movementY);
          this.canvas.relativePan(delta);
        }
      }
    });

    this.canvas.on('mouse:out', ({ e }) => {});
  }
}
