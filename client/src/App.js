import Nav from './components/Nav';
import Home from './views/Home';
import Details from './views/Details';
import Create from './views/Create';
import Edit from './views/Edit';
import NotFound from './components/NotFound';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloConsumer } from '@apollo/client';

function App() {
  return (
    <ApolloConsumer>
      {(client) => (
        <Router>
          <div className="App">
            <Nav />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      )}
    </ApolloConsumer>
  );
}

export default App;
