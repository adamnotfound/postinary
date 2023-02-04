import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_POSTS, SINGLE_POST, UPDATE_POST_MUTATION } from '../queries';
import { LoadingTwo } from '../components/Loading';
import PostForm from '../components/PostForm';

const Edit = () => {
  const history = useNavigate();
  const [form, setForm] = useState({});
  const { id } = useParams();
  const { data, loading, error } = useQuery(SINGLE_POST, {
    variables: { id: Number(id) },
  });
  const [updatePost, { loading: updateLoad, error: updateErr }] = useMutation(
    UPDATE_POST_MUTATION,
    {
      refetchQueries: [{ query: ALL_POSTS }],
    },
  );
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      updatePost({
        variables: {
          updatePostInput: {
            title: form.title,
            content: form.content,
            picture: form.uploadedImg,
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
    setForm({ ...data.post, uploadedImg: data.post.picture });
  }
  return (
    <section className="details-section">
      <div className="post-details">
        {loading && <LoadingTwo />}
        {error && <p>{error.message}</p>}
      </div>
      {data && (
        <div className="container">
          <PostForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            error={updateErr}
            loading={updateLoad}
            title="Edit Post"
          />
        </div>
      )}
    </section>
  );
};

export default Edit;
