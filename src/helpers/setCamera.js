import { PerspectiveCamera } from "three";

export default (container) => {
  let camera = new PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  // camera.position.set(100, 200, 400);
  camera.position.z = 300;
  camera.position.y = 50;

  return camera;
};
