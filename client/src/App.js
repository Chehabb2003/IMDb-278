import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './MainContent';
import Registration from './Registration';
import SignUp from './SignUp'
import SignIn from './SignIn'

const App = () => {
  return (
    <Router>
      <MainContent />
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;