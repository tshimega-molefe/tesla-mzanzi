class Driver {
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.#addKeyboardListeners();
  }

  // Input Listeners: Throttle, Break, Steering-Left, Steering-Right

  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      // Force
      switch (event.key) {
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    };

    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    };
  }
}
