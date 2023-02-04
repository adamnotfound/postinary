import { Link } from 'react-router-dom';
import routes from '../routes';

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <h1 className="logo">POSTINARY</h1>
      </Link>

      <div className="nav-links">
        {routes &&
          routes.map((r, i) => (
            <Link key={i} to={r.path}>
              {r.name}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Nav;
