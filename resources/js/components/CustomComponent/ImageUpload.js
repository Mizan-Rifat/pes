import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useSelector, useDispatch } from "react-redux";
import { addImages} from "../Redux/Ducks/MatchImagesDuck";
import { setImages } from "../Redux/Ducks/MatchImagesDuck";
import { Button } from "@material-ui/core";
import Notify from '@customComponent/Notify';
import clsx from 'clsx';

const ImageUpload = props => {

  const [pictures, setPictures] = useState([]);
  const [preview, setPreview] = useState(true);
  const [ImageUploaderKey, setImageUploaderKey] = useState(0);

  const [loading, setloading] = useState(false)


  const dispatch = useDispatch();
  const toast = Notify();

  const onDrop = picture => {
    setPreview(true)
    setPictures(picture);
    // dispatch(setImages(props.label,picture))
  };

  const handleUpload = ()=>{

    setloading(true)

    const field={
      eventsImages:1,
      ratings1Images:2,
      ratings2Images:3
    };

    const formData = new FormData();

    for (let i = 0; i < pictures.length; i++) {
        formData.append('images[]', pictures[i]);
    }

    formData.append('fixture_id',props.fixture_id);
    formData.append('field',field[props.label]);

    dispatch(addImages(formData,
 
        { 
            headers: { "Content-Type": "multipart/form-data" } 
        }
    ))
    .then(response=>{
      setloading(false)
        toast(response,'success')
        setPictures([])
        setImageUploaderKey(ImageUploaderKey + 1);
    })
    .catch(error=>{
      setloading(false)
        Object.keys(error.errors).map(err=>{
            toast(error.errors[err],'error')
        })
    })
  }

  return (
    <div className={clsx({'formDisable':loading})}>
        <ImageUploader
          {...props}
          key={ImageUploaderKey}
          withIcon={false}
          onChange={onDrop}
          imgExtension={[".jpg",'.jpeg',".png"]}
          maxFileSize={1048580}
          withPreview={preview}
          label='Max file size: 1mb, accepted: jpeg|jpg|png'
        //   buttonText={props.buttonText}
        />
        {
            pictures.length > 0 ?
          
            <div className='text-center'>
                <Button variant='contained' color='primary' size='small' onClick={handleUpload}>Upload</Button>
            </div>
            : ''
        }
    </div>
  );
};

export default ImageUpload;