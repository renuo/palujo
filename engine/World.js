class World {
  constructor() {
    this.camera = new Camera();
    this.light = null;
    this.ambientLightColor = [...Colors.white, 0.1];
    this.models = [];
    this.goal = [];

    this.opponents = [];

    this.player = this.camera;
    this.player.v = [0, 0, 0];
    this.player.rotationV = [0, 0, 0];
    this.player.rotation = [0, 0, 0];
  }

  inAnyModel(position) {
    const inRange = (x, min, max) => ((x-min)*(x-max) <= 0);
    const collidingBlocks = this.models
      .filter(m => inRange(position[0], m.axisMin(0), m.axisMax(0)))
      .filter(m => inRange(position[2], m.axisMin(2), m.axisMax(2)))
      .filter(m => inRange(position[1], m.axisMin(1), m.axisMax(1)));
    return collidingBlocks.length > 0;
  }
}
