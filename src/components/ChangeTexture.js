import React, { useContext, useEffect, useState } from "react";
import UploadButton from "./UploadButton";
import { Context as ModalContext } from "../context/ModelContext";
import { TextureLoader } from "three";

const ChangeTexture = () => {
  const [texture, setTexture] = useState(null);
  const [defaultTexture, setDefaultTexture] = useState();

  const {
    state: { mainModel },
  } = useContext(ModalContext);

  useEffect(() => {
    if (mainModel) {
      mainModel.traverse((child) => {
        if (child.isMesh && typeof child.material.map !== "function") {
          setTexture(child.material.map);
          setDefaultTexture(child.material.map);
        }
      });
    }
  }, [mainModel]);

  useEffect(() => {
    if (texture !== null) {
      mainModel.traverse((child) => {
        if (child.isMesh && typeof child.material.map !== "function") {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture]);

  const onTextureUpload = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      changeTexture(URL.createObjectURL(file));
    }
  };

  const changeTexture = (file) => {
    const textureLoader = new TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    textureLoader.load(file, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  };

  return (
    <ul className="collection with-header" style={{ marginTop: "25px" }}>
      <li className="collection-header grey darken-4 white-text">
        <h5>Change Texture</h5>
        <p>(.png / .jpg)</p>
        <UploadButton onUpload={onTextureUpload} accept=".png,.jpg" />
        {texture && (
          <button className="btn red" onClick={() => setTexture(undefined)}>
            Delete current texture
          </button>
        )}
        {texture !== defaultTexture && (
          <button className="btn" onClick={() => setTexture(defaultTexture)}>
            Default Texture
          </button>
        )}
      </li>
    </ul>
  );
};

export default ChangeTexture;
