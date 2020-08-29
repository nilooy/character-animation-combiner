import React from "react";
import UploadButton from "./UploadButton";

const UploadSection = ({ onMainModelUpload, onAnimationUpload }) => {
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h5>Upload File with Character</h5>
        <UploadButton onUpload={onMainModelUpload} />
      </li>
      <li className="collection-header">
        <h5>Upload Animation</h5>
        <UploadButton onUpload={onAnimationUpload} multiple={true} />
      </li>
    </ul>
  );
};

export default UploadSection;
