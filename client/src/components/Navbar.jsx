import '../styles/navbar.css';
import { Link, Navigate, redirect } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchValue, SetSearchValue] = useState('');
    const navigate = useNavigate();
    // const [selectedOption, SetSelectedOption] = useState('Profile');
    let name;
    const user = JSON.parse(window.localStorage.getItem('token'));
    if (user) {
        name = user.name;
    }
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${searchValue}`);
        }
    }

    const handleSelect = (e) => {
        const value = e.target.value;
        e.target.value = name;
        switch (value) {
            case 'view-profile':
                // navigate('/profile');
                break;
            case 'watchlist':
                navigate('/watchlist');
                break;
            case 'sign-out':
                window.localStorage.clear();
                navigate('/');
                break;
            case 'ratings':
                window.localStorage.clear();
                navigate('/');
                break;
            default:
                break;
        }
    }

    return (
        <div className="navbars">
            {!user && <nav className='navbar'>
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
                    <Link to='/registration'><button>Watchlist</button></Link>
                    <Link to="/registration"><button>Sign In</button></Link>
                </div>
            </nav>}
            {user && <nav className='navbar'>
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
                    <select onChange={handleSelect} defaultValue={name}>
                        <option value={name} hidden>{name}</option>
                        <option value="view-profile">Profile</option>
                        <option value="watchlist">Watchlist</option>
                        <option value="ratings">Ratings</option>
                        <option value="sign-out">Sign Out</option>
                    </select>
                </div>
            </nav>}
        </div>
    );
}

export default Navbar;