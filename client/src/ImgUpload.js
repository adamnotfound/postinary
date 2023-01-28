import { useRef, useState } from 'react';

function ImgUpload({ uploadedImg, setUploadedImg }) {
  const [loadingImg, setLoadingImg] = useState(false);
  const backgroundInput = useRef(null);
  const type = ['image/jpeg', 'image/png'];
  
  const changeHandler = async (e) => {
    setLoadingImg(true);
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {});
    reader.readAsDataURL(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'my-upload');
    try {
      if (selected && type.includes(selected.type)) {
        const data = await fetch(
          'https://api.cloudinary.com/v1_1/dxrdyke2n/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        ).then((r) => r.json());
        setUploadedImg(data.secure_url);
        setLoadingImg(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onButtonClick = () => {
    backgroundInput.current.click();
  };
  return (
    <div
      style={{
        border: uploadedImg ? '1px solid #d9d9d9' : '1px dashed  #d9d9d9',
        background: uploadedImg ? 'white' : 'rgba(0,0,0,.02)',
      }}
      className="image-container"
    >
      {uploadedImg ? (
        <div className="overlay">
          <div
            className="uploaded-img"
            style={{ backgroundImage: `url(${uploadedImg})` }}
          ></div>
          <div className="delete-img-container">
            <span
              className="material-icons delete"
              style={{ position: 'static' }}
              onClick={(e) => setUploadedImg('')}
            >
              delete
            </span>
          </div>
        </div>
      ) : (
        <>
          {loadingImg ? (
            <div className="loading-upload-container">
              <span>Uploading...</span>
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="image-btn" onClick={onButtonClick}>
              <input
                type="file"
                id="file"
                style={{ display: 'none' }}
                ref={backgroundInput}
                onChange={changeHandler}
              />
              <div className="icon-container">
                <span className="plus-icon">+</span>
                <span className="upload-text">Upload</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ImgUpload;