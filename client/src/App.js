import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './MainContent';
import Registration from './Registration';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Search from './Search';
import HomePage from './HomePage';

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
        </Routes>
      </div>

    </Router>
  );
}

export default App;