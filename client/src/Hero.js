import { Link } from 'react-router-dom';
import './Hero.css';
const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to Postinary</h1>
      <p>
        Postinary is an imaginary social network blog where you can share your
        thoughts and ideas with other people around the globe, start posting now!
      </p>
      <Link className="create" to="/create">
        Create Post
      </Link>
    </div>
  );
};

export default Hero;
