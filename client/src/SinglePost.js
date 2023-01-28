import { Link } from 'react-router-dom';
import './Singlepost.css';
import moment from 'moment';

const SinglePost = (props) => {
  const post = props.post;
  return (
    <Link to={`/details/${post.id}`}>
      <div className="single-post">
        <img
          src={
            post.picture
              ? post.picture
              : 'https://www.ninjaseo.com.au/wp-content/uploads/2016/07/placeholder4.png'
          }
          alt="Post Img"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            objectPosition: 'center',
            marginBottom: '15px',
          }}
        />
        <h1 className="name">{post.title}</h1>
        <p className="preview">
          {post.content.substr(0, 150)}
          {post.content.length > 150 ? '...' : ''}
        </p>
        <p className="time">{moment(post?.createdAt).format('llll')}</p>
      </div>
    </Link>
  );
};

export default SinglePost;
