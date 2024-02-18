class MoveBox {
  constructor(id, x, y, color) {
    this.createBox(id, x, y, color);

    this.box = document.querySelector(`#box-${id}`);
    this.innerElement = false;
    this.layerX = 0;
    this.layerY = 0;
    this.color = color;

    this.increaseZIndex();

    this.box.addEventListener("mousedown", this.handleMouseDown);
    document.body.addEventListener("mouseup", this.handleMouseUp);
  }

  increaseZIndex = () => zIndex++;

  controlMouseMove = () => {
    if (this.innerElement) {
      document.body.addEventListener("mousemove", this.handleMouseMove);
    } else {
      document.body.removeEventListener("mousemove", this.handleMouseMove);
    }
  };

  handleMouseMove = (event) => {
    const x = this.getPositionCursor(event).x;
    const y = this.getPositionCursor(event).y;

    this.setPositionMoveElement(this.box, x, y, this.layerX, this.layerY);
  };

  handleMouseDown = (event) => {
    this.innerElement = true;

    this.layerX = this.getLayerElement(event).x;
    this.layerY = this.getLayerElement(event).y;

    // this.setColorElement(this.box, "grey");
    this.setBrightnessElement(this.box, 0.5);
    this.setZIndexElement(this.box, this.increaseZIndex());

    this.controlMouseMove();
  };

  handleMouseUp = () => {
    this.innerElement = false;

    // this.setColorElement(this.box, this.color);
    this.setBrightnessElement(this.box, 1);

    this.controlMouseMove();
  };

  createBox = (id, x, y, color) => {
    const box = document.createElement("div");
    this.setPositionElement(box, x, y);
    this.setColorElement(box, color);
    box.setAttribute("id", `box-${id}`);
    box.classList.add("box");
    document.body.appendChild(box);
  };

  setPositionElement = (element, x, y) => {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
  };

  setPositionMoveElement = (element, x, y, layerX, layerY) => {
    element.style.top = `${y - layerY}px`;
    element.style.left = `${x - layerX}px`;
  };

  getPositionCursor = (event) => ({ x: event.clientX, y: event.clientY });

  getLayerElement = (event) => ({ x: event.layerX, y: event.layerY });

  setColorElement = (element, color) => (element.style.background = color);

  setBrightnessElement = (element, brightness) =>
    (element.style.filter = `brightness(${brightness})`);

  setZIndexElement = (element, index) => (element.style.zIndex = index);
}

let zIndex = 0;

const moveBox = new MoveBox(1, 30, 50, "red");
const moveBox2 = new MoveBox(2, 100, 300, "blue");
const moveBox3 = new MoveBox(3, 200, 400, "pink");
