import { Link } from 'react-router-dom';
import { useState } from 'react'
const Navbar = () => {
    const [searchValue, SetSearchValue] = useState('');

    return (
        <nav className="navbar">
            <div className="navbar-div1">
                <Link to="/"><button className="imdb-button">IMDb</button></Link>
            </div>
            <div className="navbar-div2">
                <input type="text" placeholder="Search IMDb" value={searchValue} onChange={(e) => SetSearchValue(e.target.value)} />
            </div>
            <div className="navbar-div3">
                <button>Watchlist</button>
                <Link to="/registration"><button>Sign In</button></Link>
            </div>
        </nav>
    );
}

export default Navbar;