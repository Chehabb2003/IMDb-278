import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './Header';
import Registration from './Registration';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Search from './Search';
import HomePage from './HomePage';
import WatchList from './WatchList';
import Footer from './Footer';

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