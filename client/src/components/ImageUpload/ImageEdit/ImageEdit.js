import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';

const ImageEdit = ({ selectedImage }) => {
  const [imageDestination, setImageDestination] = useState('');

  const imageElement = useRef();

  useEffect(() => {
    console.log(
      imageElement.current.height,
      imageElement.current.width,
    )
    const cropper = new Cropper(imageElement.current, {
      zoomable: false,
      scalable: false,
      initialAspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        setImageDestination(canvas.toDataURL("image/png"));
      },
    })
  });

  return (
    <>
      <div className='img-container'>
        <img
          ref={imageElement}
          src={URL.createObjectURL(selectedImage)}
          alt='Source'
          crossOrigin='true'
          className='img-upload'
        />
      </div>
      <img
        src={imageDestination}
        className='img-preview'
        alt='Destination'
      />
    </>
  )
}

export default ImageEdit;
