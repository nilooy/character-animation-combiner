import React from "react";

const UploadButton = ({ onUpload, multiple, accept }) => {
  return (
    <div className="file-field input-field ">
      <div className="btn">
        <span>Upload File</span>
        <input
          type="file"
          onChange={onUpload}
          multiple={multiple}
          accept={accept}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
};

export default UploadButton;
