import React, { useContext } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { AnimationClip } from "three";
import { Context as ModalContext } from "../context/ModelContext";

const Export = () => {
  const {
    state: { mainModel, animations },
    toggleLoading,
  } = useContext(ModalContext);

  const save = (blob, filename) => {
    var link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    toggleLoading();
  };

  const saveString = (text, filename) => {
    save(new Blob([text], { type: "text/plain" }), filename);
  };

  const saveArrayBuffer = (buffer, filename) => {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  };

  // Helper function to get all bone names from the model
  const getBoneNames = (object) => {
    const boneNames = new Set();
    object.traverse((child) => {
      if (child.isBone || child.type === "Bone") {
        boneNames.add(child.name);
      }
    });
    return boneNames;
  };

  // Helper function to filter animation tracks to only include bones that exist in the model
  const filterAnimationTracks = (animation, boneNames) => {
    const validTracks = animation.tracks.filter((track) => {
      // Extract bone name from track name (format: "boneName.property" or "boneName.property[index]")
      const trackNameParts = track.name.split(".");
      if (trackNameParts.length < 2) return false;
      const boneName = trackNameParts[0];
      return boneNames.has(boneName);
    });

    if (validTracks.length === 0) {
      return null; // No valid tracks, skip this animation
    }

    // Create a new animation clip with only valid tracks
    return new AnimationClip(animation.name, animation.duration, validTracks);
  };

  const exportGLB = () => {
    if (!mainModel) {
      alert("Please upload a model first");
      return;
    }
    
    toggleLoading();
    try {
      var exporter = new GLTFExporter();
      
      // Use animations from state which contains all animations (main + separately uploaded)
      // The state.animations array is the source of truth
      const allAnimations = animations && animations.length > 0 ? animations : (mainModel.animations || []);
      
      // Get all bone names from the main model
      const boneNames = getBoneNames(mainModel);
      
      // Filter animation tracks to only include bones that exist in the main model
      const filteredAnimations = allAnimations
        .map((anim) => filterAnimationTracks(anim, boneNames))
        .filter((anim) => anim !== null); // Remove animations with no valid tracks
      
      
      if (filteredAnimations.length === 0) {
        toggleLoading();
        alert("No valid animations found. Make sure animations reference bones that exist in the main model.");
        return;
      }
      
      // Also update mainModel.animations directly since GLTFExporter reads from the object
      const originalAnimations = mainModel.animations ? [...mainModel.animations] : [];
      mainModel.animations = [...filteredAnimations];
      
      exporter.parse(
        mainModel,
        function (result) {
          // Restore original animations
          mainModel.animations = originalAnimations;
          saveArrayBuffer(result, `cac-${new Date().getTime()}.glb`);
        },
        { trs: true, binary: true, animations: filteredAnimations }
      );
    } catch (error) {
      // Restore original animations in case of error
      if (mainModel.animations) {
        const originalAnimations = mainModel.animations;
        mainModel.animations = originalAnimations;
      }
      toggleLoading();
      console.error("Export error:", error);
      alert(
        "Error: Try deleting the texture, if that does not help, Open an issue on the Github Repo"
      );
    }
  };

  const exportGLTF = () => {
    if (!mainModel) {
      alert("Please upload a model first");
      return;
    }
    
    toggleLoading();
    try {
      var exporter = new GLTFExporter();
      
      // Use animations from state which contains all animations (main + separately uploaded)
      // The state.animations array is the source of truth
      const allAnimations = animations && animations.length > 0 ? animations : (mainModel.animations || []);
      
      // Get all bone names from the main model
      const boneNames = getBoneNames(mainModel);
      
      // Filter animation tracks to only include bones that exist in the main model
      const filteredAnimations = allAnimations
        .map((anim) => filterAnimationTracks(anim, boneNames))
        .filter((anim) => anim !== null); // Remove animations with no valid tracks
      
      
      if (filteredAnimations.length === 0) {
        toggleLoading();
        alert("No valid animations found. Make sure animations reference bones that exist in the main model.");
        return;
      }
      
      // Also update mainModel.animations directly since GLTFExporter reads from the object
      const originalAnimations = mainModel.animations ? [...mainModel.animations] : [];
      mainModel.animations = [...filteredAnimations];
      
      exporter.parse(
        mainModel,
        function (result) {
          // Restore original animations
          mainModel.animations = originalAnimations;
          var output = JSON.stringify(result, null, 2);
          saveString(output, `cac-${new Date().getTime()}.gltf`);
        },
        { trs: true, binary: false, animations: filteredAnimations }
      );
    } catch (error) {
      // Restore original animations in case of error
      if (mainModel.animations) {
        const originalAnimations = mainModel.animations;
        mainModel.animations = originalAnimations;
      }
      toggleLoading();
      console.error("Export error:", error);
      alert(
        "Error: Try deleting the texture, if that does not help, Open an issue on the Github Repo"
      );
    }
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
