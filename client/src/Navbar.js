import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [searchValue, SetSearchValue] = useState('');
    const nagivate = useNavigate();
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            nagivate('/search/' + searchValue);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-div1">
                <Link to="/"><button className="imdb-button">IMDb</button></Link>
            </div>
            <div className="navbar-div2">
                <input type="text" placeholder="Search IMDb" value={searchValue}
                    onChange={(e) => SetSearchValue(e.target.value)}
                    onKeyDown={(e) => handleSearch(e)}
                />
            </div>
            <div className="navbar-div3">
                <Link to='/watchlist'><button>Watchlist</button></Link>
                <Link to="/registration"><button>Sign In</button></Link>
            </div>
        </nav>
    );
}

export default Navbar;