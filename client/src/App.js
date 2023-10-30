import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './components/Header';
import Registration from './components/Registration';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Search from './components/Search';
import HomePage from './components/HomePage';
import WatchList from './components/WatchList';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <MainContent />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/search/:searchvalue' element={<Search />} />
          <Route path='/watchlist' element={<WatchList />} />
        </Routes>
      </div>
      <Footer />

    </Router>
  );
}

export default App;