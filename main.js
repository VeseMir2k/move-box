class MoveBox {
  constructor() {
    this.createBox();
    this.box = document.querySelector(".box");

    this.onElement = false;
    this.lX = 0;
    this.lY = 0;

    this.box.addEventListener("mousedown", this.handleMouseDown);
    document.body.addEventListener("mouseup", this.handleMouseUp);
  }

  controlMouseMove = () => {
    if (this.onElement) {
      document.body.addEventListener("mousemove", this.handleMouseMove);
    } else {
      document.body.removeEventListener("mousemove", this.handleMouseMove);
    }
  };

  handleMouseMove = (event) => {
    const x = this.getPosition(event).x;
    const y = this.getPosition(event).y;

    this.setPositionElement(this.box, x, y, this.lX, this.lY);
  };

  handleMouseDown = (event) => {
    this.onElement = true;
    this.lX = this.getLayerElement(event).x;
    this.lY = this.getLayerElement(event).y;
    this.changeColorElement(this.box, "grey");
    this.controlMouseMove();
  };

  handleMouseUp = () => {
    this.onElement = false;
    this.changeColorElement(this.box, "black");
    this.controlMouseMove();
  };

  createBox = () => {
    const box = document.createElement("div");
    box.classList.add("box");
    document.body.appendChild(box);
  };

  setPositionElement = (element, x, y, lX, lY) => {
    element.style.top = `${y - lY}px`;
    element.style.left = `${x - lX}px`;
  };

  getPosition = (event) => ({ x: event.clientX, y: event.clientY });

  getLayerElement = (event) => ({ x: event.layerX, y: event.layerY });

  changeColorElement = (element, color) => (element.style.background = color);
}

const moveBox = new MoveBox();
