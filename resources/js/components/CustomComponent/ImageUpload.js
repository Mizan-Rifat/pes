import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useSelector, useDispatch } from "react-redux";
import { addImages } from "../Redux/actions/resultAddAction";

const ImageUpload = props => {

  const [pictures, setPictures] = useState([]);

  const dispatch = useDispatch();

  const onDrop = picture => {
    setPictures(picture);
    dispatch(addImages(props.label,picture))
  };
  return (
    <ImageUploader
      {...props}
      withIcon={false}
      onChange={onDrop}
      imgExtension={[".jpg",'.jpeg',".png"]}
      maxFileSize={1048580}
      withPreview={true}
      label='Max file size: 1mb, accepted: jpeg|jpg|png'
    //   buttonText={props.buttonText}
    />
  );
};

export default ImageUpload;