import './Details.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_POSTS, DELETE_POST, SINGLE_POST } from './queries';
import LoadingTwo from './LoadingTwo';
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
    <section className="details">
      <div className="details-section">
        {post && !delLoad && <h1 className="title-detail">{post.title}</h1>}
        {(loading || delLoad) && <LoadingTwo />}
        {error && <p>{error}</p>}
      </div>
      <div className="blog-container">
        {post && !delLoad && (
          <div className="blog-details">
            <img
              className="detail-img"
              alt="Post Img"
              src={
                post.picture
                  ? post.picture
                  : 'https://www.ninjaseo.com.au/wp-content/uploads/2016/07/placeholder4.png'
              }
            />
            <p>{post?.content}</p>
            <span className="time">
              {moment(post?.createdAt).format('llll')}
            </span>
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
