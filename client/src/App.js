import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Registration from './components/Registration';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Search from './components/Search';
import HomePage from './components/HomePage';
import WatchList from './components/WatchList';
import Footer from './components/Footer';
import MoviesDb from './components/MoviesDb';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/search/:searchvalue' element={<Search />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/movies-db' element={<MoviesDb />} />

        </Routes>
      </div>
      <Footer />

    </Router >
  );
}

export default App;