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

  const exportGLB = () => {
    var exporter = new GLTFExporter();

    // Parse the input and generate the glTF output
    exporter.parse(
      mainModel,
      function (result) {
        saveArrayBuffer(result, `mixamo-${new Date().getTime()}.glb`);
      },
      { trs: true, binary: true, animations: animations }
    );
  };

  const exportGLTF = () => {
    var exporter = new GLTFExporter();

    // Parse the input and generate the glTF output
    exporter.parse(
      mainModel,
      function (result) {
        var output = JSON.stringify(result, null, 2);
        saveString(output, `mixamo-${new Date().getTime()}.gltf`);
      },
      { trs: true, binary: false, animations: animations }
    );
  };

  return (
    <div style={{ height: 100 }}>
      <h4 className="white-text">Export</h4>

      <div className="row">
        <button
          style={{ margin: "0 auto" }}
          className="waves-effect waves-light btn-large indigo accent-4 col m12 l6"
          onClick={exportGLTF}
        >
          Export GLTF
        </button>

        <button
          style={{ margin: "0 auto" }}
          className="waves-effect waves-light btn-large indigo accent-4 col m12 l6"
          onClick={exportGLB}
        >
          Export GLB
        </button>
      </div>
    </div>
  );
};

export default Export;
