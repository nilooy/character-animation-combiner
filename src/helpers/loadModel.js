import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3 } from "three";

export default (path, type, callback) => {
  let loader = null;
  if (type === "fbx") {
    loader = new FBXLoader();
  } else loader = new GLTFLoader();

  loader.load(path, (object) => {
    if (type === "fbx") {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      var box = new Box3().setFromObject(object);
      var center = new Vector3();
      box.getCenter(center);
      object.position.sub(center); // center the model
    }

    callback(object);
  });
};
