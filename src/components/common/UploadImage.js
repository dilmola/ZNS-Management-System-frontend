import React, { useState } from "react";

const UploadImage = ({ onChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    if (onChange) {
      onChange(formData);
    }
  };

  return <input type="file" accept="image/*" onChange={handleImageChange} />;
};

export default UploadImage;
