import './signup.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [retypepassword, SetRetypePassword] = useState('');
    const [ErrorData, SetErrorData] = useState({
        name: false, email: false, password: false, password_match: false
    });

    const IsValidName = () => {
        const regexName = new RegExp("^[a-zA-Z]+([-\\s][a-zA-Z]+)*$");
        return regexName.test(name);

    }
    const IsValidEmail = () => {
        const regexEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        return regexEmail.test(email);
    }
    const IsValidPassword = () => {
        const regexPassword = new RegExp("^.{8,}$");
        return regexPassword.test(password);
    }

    const PasswordsMatch = () => {
        return password === retypepassword;
    }

    const handleCreation = (e) => {
        e.preventDefault();
        if (!IsValidName()) {
            SetErrorData({
                name: true, email: false, password: false, password_match: false
            })
        }
        else if (!IsValidEmail()) {
            SetErrorData({
                name: false, email: true, password: false, password_match: false
            })
        }
        else if (!IsValidPassword()) {
            SetErrorData({
                name: false, email: false, password: true, password_match: false
            })
        }
        else if (!PasswordsMatch()) {
            SetErrorData({
                name: false, email: false, password: false, password_match: true
            })
        }
        else {
            SetErrorData({
                name: false, email: false, password: false, password_match: false
            })
        }

    }




    return (
        <div className="signup">
            <Link to='/'><button>IMDb</button></Link>
            {ErrorData.name && <p className='error'>Please enter a valid name</p>}
            {ErrorData.email && <p className='error'>Please enter a valid email </p>}
            {ErrorData.password && <p className='error'>Please enter a valid password</p>}
            {ErrorData.password_match && <p className='error'>Please make sure passwords match</p>}
            <div className='signup-container'>
                <form onSubmit={handleCreation}>
                    <h1>Create an account</h1>
                    <div className='signup-div'>
                        <label>Your name <br />
                            <input type="text"
                                value={name}
                                onChange={(e) => SetName(e.target.value)}
                                placeholder="First and last name" /></label>
                    </div>
                    <div className='signup-div'>
                        <label>Email <br />
                            <input type="text"
                                value={email}
                                onChange={(e) => SetEmail(e.target.value)}
                            /></label>

                    </div>
                    <div className='signup-div'>
                        <label>Password <br />
                            <input type="password"
                                value={password}
                                onChange={(e) => SetPassword(e.target.value)}
                            /></label>

                    </div>
                    <div className='signup-div'>
                        <label>Re-enter Password<br />
                            <input type="password"
                                value={retypepassword}
                                onChange={(e) => SetRetypePassword(e.target.value)}
                            /></label>
                    </div>

                    <div className='createacc-div'>
                        <button>Create your IMDb account</button>
                    </div>
                    <div className='signup-div'>
                        <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default SignUp;