import { useRef, useState } from 'react';

function ImgUpload({ uploadedImg, setUploadedImg }) {
  const [loadingImg, setLoadingImg] = useState(false);
  const [error, setError] = useState('');
  const backgroundInput = useRef(null);
  const type = ['image/jpeg', 'image/jpg', 'image/png'];

  const changeHandler = async (e) => {
    setLoadingImg(true);
    setError('');
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {});
    reader.readAsDataURL(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'my-upload');
    console.log(selected);
    try {
      if (selected && type.includes(selected.type)) {
        const data = await fetch(
          'https://api.cloudinary.com/v1_1/dxrdyke2n/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        )
          .then((r) => r.json())
          .catch((err) => console.log(err));
        setLoadingImg(false);
        setUploadedImg(data.secure_url);
      } else {
        setLoadingImg(false);
        throw setError('Wrong type, JPEG or PNG only.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onButtonClick = () => {
    backgroundInput.current.click();
  };
  return (
    <div>
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
      {error && (
        <p style={{ marginTop: '10px', color: 'red', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default ImgUpload;
