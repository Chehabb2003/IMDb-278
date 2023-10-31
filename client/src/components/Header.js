import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
const Header = () => {
    const location = useLocation();
    const pathsWoutNav = ['/signin', '/signup', '/movies-db'];

    return (
        <div className="app">
            {!pathsWoutNav.includes(location.pathname) && <Navbar />}
        </div>

    );
}

export default Header;