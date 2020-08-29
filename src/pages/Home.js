import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import UploadSection from "../components/UploadSection";
import ModelViewer from "../components/ModelViewer";
import AnimationList from "../components/AnimationList";
import loadFBX from "../helpers/loadFBX";
import { Context as ModalContext } from "../context/ModelContext";
import Export from "../components/Export";

const Home = () => {
  const [model, setModel] = useState("/fly.fbx");
  const { addAnimations } = useContext(ModalContext);

  const onMainModelUpload = (event) => {
    if (event.target.files[0]) {
      let fileUrl = URL.createObjectURL(event.target.files[0]);
      setModel(fileUrl);
    }
  };

  const onAnimationUpload = (event) => {
    console.log(event.target.files);
    if (event.target.files.length) {
      Array.from(event.target.files).forEach((element) => {
        let fileUrl = URL.createObjectURL(element);
        loadFBX(fileUrl, (object) => {
          let fileName = element.name.split(".")[0].replace(/\s/g, "");
          fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
          if (object.animations.length > 1) {
            object.animations.forEach((anim, index) => {
              anim.name = fileName + index;
            });
          } else {
            if (object.animations[0].name === "Take 001") {
              object.animations[0].name = "T-Pose (No Animation)";
            } else {
              object.animations[0].name = fileName;
            }
          }
          addAnimations(object.animations);
        });
      });
    }
  };

  return (
    <Layout>
      <div className="row" style={{ height: "91vh" }}>
        <div className="col m3">
          <UploadSection
            onMainModelUpload={onMainModelUpload}
            onAnimationUpload={onAnimationUpload}
          />
          <Export />
        </div>
        <div className="col m6">
          <ModelViewer model={model} />
        </div>
        <div className="col m3">
          <AnimationList />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
