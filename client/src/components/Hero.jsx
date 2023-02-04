import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to Postinary</h1>
      <p>
        Postinary is an imaginary social network blog where you can share your
        thoughts and ideas with other people around the globe, start posting
        now!
      </p>
      <Link to="/create">Create Post</Link>
    </div>
  );
};

export default Hero;
