import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_POSTS, DELETE_POST, SINGLE_POST } from '../queries';
import { LoadingTwo } from '../components/Loading';
import moment from 'moment';

const Details = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [deletePost, { error: delError, loading: delLoad }] = useMutation(
    DELETE_POST,
    {
      refetchQueries: [{ query: ALL_POSTS }],
    },
  );
  const { data, loading, error } = useQuery(SINGLE_POST, {
    variables: { id: Number(id) },
  });
  const post = data?.post;

  const handleDelete = async () => {
    try {
      deletePost({
        variables: {
          id: Number(id),
        },
      }).then((result) => {
        history('/');
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="details-section">
      <div className="layout-header">
        {post && !delLoad && <h1 className="mb-2">{post.title}</h1>}
        {(loading || delLoad) && <LoadingTwo />}
        {error && <p>{error}</p>}
      </div>
      <div className="post-container">
        {post && !delLoad && (
          <div className="content">
            <img
              alt="Post Img"
              src={
                post.picture
                  ? post.picture
                  : 'https://www.ninjaseo.com.au/wp-content/uploads/2016/07/placeholder4.png'
              }
            />
            <p className="mb-3">{post?.content}</p>
            <p className="time">
              Last update: {moment(post?.updatedAt).format('llll')}
            </p>
            <p className="time">
              Created at: {moment(post?.createdAt).format('llll')}
            </p>
            <span
              disabled={delLoad}
              className="material-icons delete"
              onClick={handleDelete}
            >
              delete
            </span>
            <Link to={`/edit/${id}`}>
              <span className="material-icons edit">edit</span>
            </Link>
            {delError && <p>{delError.message}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
