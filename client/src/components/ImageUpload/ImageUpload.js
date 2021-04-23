import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';

import img from '../../images/questionMark.png';

import './ImageUpload.scss';
import "cropperjs/dist/cropper.min.css";
import ImageEdit from './ImageEdit/ImageEdit';

const ImageUpload = ({ profileImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const onFileUpload = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  return ReactDom.createPortal(
    <div>
      {!profileImage &&
        <>
          <label className='btn btn-info' htmlFor='upload-photo'><i className='fa fa-plus' /> Upload Photo</label>
          <input id='upload-photo' type='file' accept='image/*' multiple={false} onChange={(e) => onFileUpload(e)} ></input>
          <button><i className='fa fa-pencil' /></button>
        </>
      }
      {selectedImage ?
        <ImageEdit selectedImage={selectedImage} />
        : null
      }
    </div>,
    document.getElementById('modal'),
  )
};

const mapStateToProps = (state) => ({
  profileImage: state.profileImage,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
