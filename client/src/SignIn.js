import './signin.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [ErrorData, SetErrorData] = useState({ email: false, password: false });

    const IsValidEmail = () => {
        const regexEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        return regexEmail.test(email);
    }
    const IsValidPassword = () => {
        const regexPassword = new RegExp("^.{8,}$");
        return regexPassword.test(password);
    }
    const handleSignIn = (e) => {
        e.preventDefault();
        if (!IsValidEmail()) {
            SetErrorData({
                email: true, password: false
            })
        }
        else if (!IsValidPassword()) {
            SetErrorData({
                email: false, password: true
            })
        }
        else {
            SetErrorData({
                email: false, password: false
            })
        }
    
    }
    // function to fetch from sever eamil and see if found or not




  return (
    <div className="shared-signin-signup">
            <Link to='/'><button>IMDb</button></Link>
            {ErrorData.email && <p className='error'>Please enter a valid email </p>}
            {ErrorData.password && <p className='error'>Please enter a valid password</p>}
            <div className='shared-signin-signup-container'>
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>
                    <div className='shared-signin-signup-div'>
                        <label>Email <br />
                            <input type="text"
                                value={email}
                                onChange={(e) => SetEmail(e.target.value)}
                            /></label>

                    </div>
                    <div className='shared-signin-signup-div'>
                        <label>Password <br />
                            <input type="password"
                                value={password}
                                onChange={(e) => SetPassword(e.target.value)}
                            /></label>

                    </div>
                    <div className='signin-div'>
                        <button>Sign In</button>
                    </div>
                    <div className='shared-signin-signup-div'>
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
  );
};

export default Signin;