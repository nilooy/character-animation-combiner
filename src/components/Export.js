import React, { useContext } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Context as ModalContext } from "../context/ModelContext";

const Export = () => {
  const {
    state: { mainModel, animations },
  } = useContext(ModalContext);

  const save = (blob, filename) => {
    var link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...
  };

  const saveString = (text, filename) => {
    save(new Blob([text], { type: "text/plain" }), filename);
  };

  const saveArrayBuffer = (buffer, filename) => {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  };

  const exportFile = () => {
    var exporter = new GLTFExporter();

    // Parse the input and generate the glTF output
    exporter.parse(
      mainModel,
      function (result) {
        // result.animations = fly.animations;
        // var output = JSON.stringify(result, null, 2);
        // saveString(output, "scene.gltf");
        // console.log(result);

        saveArrayBuffer(result, `mixamo-${new Date().getTime()}.glb`);
      },
      { trs: true, binary: true, animations: animations }
    );
  };

  return (
    <div className="valign-wrapper" style={{ height: 100 }}>
      <button
        style={{ margin: "0 auto" }}
        className="waves-effect waves-light btn-large indigo accent-4"
        onClick={exportFile}
      >
        Export GLTF/GLB
      </button>
    </div>
  );
};

export default Export;
