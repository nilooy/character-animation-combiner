import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default (camera, viewer) => {
  let controls = new OrbitControls(camera, viewer);
  controls.update();
};
