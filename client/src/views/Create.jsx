import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION, ALL_POSTS } from '../queries';
import PostForm from '../components/PostForm';

const Create = () => {
  const history = useNavigate();
  const [form, setForm] = useState({});
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: ALL_POSTS }],
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      createPost({
        variables: {
          createPostInput: {
            title: form.title,
            content: form.content,
            picture: form.uploadedImg,
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
    <section className="details-section">
      <div className="post-details"></div>
      <div className="container">
        <PostForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          title="Add New Post"
        />
      </div>
    </section>
  );
};

export default Create;
