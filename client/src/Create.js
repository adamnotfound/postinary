import './Create.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION, ALL_POSTS } from './queries';
import ImgUpload from './ImgUpload';
const Create = () => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadedImg, setUploadedImg] = useState('');
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: ALL_POSTS }],
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      createPost({
        variables: {
          createPostInput: {
            title,
            picture: uploadedImg,
            content,
          },
        },
      }).then((result) => {
        if (result.data) history('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="details-section"></div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Add New Post</h2>
          <label>Post tittle:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Post content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label>Image:</label>
          <ImgUpload
            uploadedImg={uploadedImg}
            setUploadedImg={setUploadedImg}
          />
          {loading && (
            <button disabled className="btn-disabled" type="submit">
              Posting...
            </button>
          )}
          {!loading && (
            <button className="formSubmitBtn" type="submit">
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Create;
