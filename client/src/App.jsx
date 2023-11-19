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
import { useEffect, useState } from 'react';
import Profile from './components/Profile';

const App = () => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('token')));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(window.localStorage.getItem('token')));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn user={user} setUser={setUser} />} />
          <Route path='/search' element={<Search />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/movies-db' element={<MoviesDb />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      <Footer user={user} />
    </Router >
  );
}

export default App;