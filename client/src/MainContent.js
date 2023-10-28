import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
const MainContent = () => {
    const location = useLocation();
    const pathsWoutNav = ['/signin', '/signup'];

    return (
        <div className="app">
            {!pathsWoutNav.includes(location.pathname) && <Navbar />}
        </div>

    );
}

export default MainContent;