import { useNavigate } from 'react-router-dom';
const Registration = () => {
    const navigate = useNavigate();

    return (
        <div className="registration">
            <div className="registration-container">
                <div className="left-div">
                    <h1>Sign in</h1>

                    <button onClick={() => navigate('/signin')}>
                        <div className="button-div">
                            <img src="https://cdn.icon-icons.com/icons2/70/PNG/512/imdb_14058.png" alt="" />
                            <span>Sign in with IMDb</span>
                        </div>
                    </button>
                    <button>
                        <div className="button-div">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="" />
                            <span>Sign in with Google</span>
                        </div>
                    </button>
                    <button>
                        <div className="button-div">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="" />
                            <span>Sign in with Facebook</span>
                        </div>
                    </button>
                    <p class="divider-text"><span>or</span></p>
                    <button className="create-account" onClick={() => navigate('/signup')}>Create a New Account</button>
                    <p>By signing in, you agree to IMDb's Conditions of Use and Privacy Policy.</p>
                </div>
                <div className="right-div">
                    <h1>Benefits of your free IMDb account</h1>
                    <p>
                        <strong>Personalized Recommendations</strong><br />
                        Discover shows you'll love.
                    </p>
                    <p>
                        <strong>Your Watchlist </strong><br />
                        Track everything you want to watch and receive e-mail when movies open in theaters.
                    </p>
                    <p>
                        <strong>Your Ratings</strong><br />
                        Rate and remember everything you've seen.
                    </p>
                    <p>
                        <strong>Contribute to IMBb</strong><br />
                        Add data that will be seen by millions of people and get cool badges.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registration;


