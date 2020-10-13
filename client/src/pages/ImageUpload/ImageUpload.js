import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';

import img from '../../images/questionMark.png';

import './ImageUpload.scss';
import "cropperjs/dist/cropper.min.css";

const ImageUpload = () => {
  const [imageDestination, setImageDestination] = useState('');

  const imageElement = useRef();

  useEffect(() => {
    const cropper = new Cropper(imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        setImageDestination(canvas.toDataURL("image/png"));
      }
    })
  });

  return (
    <div>
      <div className='img-container'>
        <img
          ref={imageElement}
          src={img}
          alt='Source'
          crossOrigin
        />
      </div>
      <img
        src={imageDestination}
        className='img-preview'
        alt='Destination'
      />
    </div>
  )
};

export default ImageUpload;
