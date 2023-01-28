import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_POSTS, SINGLE_POST, UPDATE_POST_MUTATION } from './queries';
import LoadingTwo from './LoadingTwo';
import ImgUpload from './ImgUpload';

const Edit = () => {
  const history = useNavigate();
  const [form, setForm] = useState({});
  const { id } = useParams();
  const [uploadedImg, setUploadedImg] = useState();

  const { data, loading, error } = useQuery(SINGLE_POST, {
    variables: { id: Number(id) },
  });
  const [updatePost, { loading: updateLoad, error: updateErr }] = useMutation(
    UPDATE_POST_MUTATION,
    {
      refetchQueries: [{ query: ALL_POSTS }],
    },
  );

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      updatePost({
        variables: {
          updatePostInput: {
            title: form.title,
            content: form.content,
            picture: uploadedImg,
            id: form.id,
          },
        },
      }).then((result) => {
        if (result.data) history('/');
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (data && !form.id) {
    setForm(data.post);
    data.post.picture && setUploadedImg(data.post.picture);
  }
  return (
    <div>
      <div className="details-section">
        {loading && <LoadingTwo />}
        {error && <p>{error.message}</p>}
      </div>
      {data && (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <label>Post tittle:</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={form.title}
              onChange={handleFormChange}
            />
            <label>Post content:</label>
            <textarea
              name="content"
              defaultValue={form.content}
              onChange={handleFormChange}
            ></textarea>
            <label>Image:</label>

            <ImgUpload
              uploadedImg={uploadedImg}
              setUploadedImg={setUploadedImg}
            />

            {updateLoad && (
              <button disabled className="btn-disabled" type="submit">
                Updating...
              </button>
            )}
            {!updateLoad && <button type="submit">Update</button>}
            {updateErr && <p>{updateErr.message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
