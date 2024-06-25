import './login.css';
import {Link} from 'react-router-dom';

export default function Login() {
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm">
            <label>Email</label>
            <input type='text' className='loginInput' placeholder='Enter your email...'/>
            <label>Password</label>
            <input type='password' className='loginInput' placeholder='Enter your password...'/>
            <button className="loginButton">Login</button>
        </form>
        <form className="registerForm">
            <label>Don't Have an Account?</label>
            <button className="registerButton">
              <Link to='/register'>Register Here</Link>
            </button>
        </form>
    </div>
  )
}
