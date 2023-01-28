import './Posts.css';
import Loading from './Loading';
import { useQuery } from '@apollo/client';
import { ALL_POSTS } from './queries';
import SinglePost from './SinglePost';
import Masonry from 'react-masonry-css';

const Posts = () => {
  const { data, loading, error } = useQuery(ALL_POSTS, {
    notifyOnNetworkStatusChange: true,
  });
  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    700: 2,
    500: 1,
  };
  const posts = data?.posts;

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  return (
    <section className="post-section">
      <h1 className="header">LATEST POSTS</h1>
      {posts && posts.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts?.map((post) => {
            return <SinglePost post={post} key={post.id} />;
          })}
        </Masonry>
      ) : (
        <div className="no-posts">
          <span>No posts yet</span>
        </div>
      )}
    </section>
  );
};

export default Posts;
