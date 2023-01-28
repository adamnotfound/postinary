import './App.css';
import Nav from './Nav';
import Hero from './Hero';
import Posts from './Posts';
import Details from './Details';
import Create from './Create';
import Edit from './Edit';
import NotFound from './NotFound';
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
              <Route
                exact
                path="/"
                element={
                  <>
                    <Hero />
                    <Posts />
                  </>
                }
              />
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
