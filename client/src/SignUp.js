import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="signup">
            <Link to='/'><button>IMDb</button></Link>
            <div className='signup-container'>
                <form action="/">
                    <h1>Create an account</h1>
                    <div className='signup-div'>
                        <label>Your name <br />
                            <input type="text"
                                placeholder="First and last name" /></label>
                    </div>
                    <div className='signup-div'>
                        <label>Email <br />
                            <input type="text" /></label>

                    </div>
                    <div className='signup-div'>
                        <label>Password <br />
                            <input type="password" /></label>

                    </div>
                    <div className='signup-div'>
                        <label>Re-enter Password<br />
                            <input type="password" /></label>

                    </div>

                    <div className='createacc-div'>
                        <button>Create your IMDb account</button>
                    </div>
                    <div className='signup-div'>
                        <p>Already have an account? <Link to='/signin'>Sign in</Link></p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default SignUp;