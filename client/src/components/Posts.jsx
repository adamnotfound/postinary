import { Loading } from './Loading';
import { useQuery } from '@apollo/client';
import { ALL_POSTS } from '../queries';
import SinglePost from './SinglePost';

const Posts = () => {
  const { data, loading, error } = useQuery(ALL_POSTS);
  const posts = data?.posts;
  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <section className="post-section">
      <h1>LATEST POSTS</h1>
      {posts ? (
        <div className="post-list">
          {posts?.map((post) => {
            return <SinglePost post={post} key={post.id} />;
          })}
        </div>
      ) : (
        <div className="no-posts">
          <span>No posts yet</span>
        </div>
      )}
    </section>
  );
};

export default Posts;
