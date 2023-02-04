import { Link } from 'react-router-dom';
import moment from 'moment';

const SinglePost = (props) => {
  const post = props.post;
  return (
    <Link to={`/details/${post.id}`}>
      <div className="post-card">
        <img
          src={
            post.picture
              ? post.picture
              : 'https://www.ninjaseo.com.au/wp-content/uploads/2016/07/placeholder4.png'
          }
          alt="Post thumbnail"
        />
        <h1>{post.title}</h1>
        <p className="preview">
          {post.content.substr(0, 100)}
          {post.content.length > 100 ? '...See More' : ''}
        </p>
        <p className="time">{moment(post?.createdAt).format('llll')}</p>
      </div>
    </Link>
  );
};

export default SinglePost;
