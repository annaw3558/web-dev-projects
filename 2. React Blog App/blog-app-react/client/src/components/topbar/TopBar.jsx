import './topbar.css'
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context"
import { useContext } from 'react';

export default function TopBar() {
  const {user, dispatch } = useContext(Context);
  const imgPath = "http://localhost:8080/img/";

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }

  return (
    <div className='top'>
      <div className='topCenter'>
          <ul className='topList'>
                <li className='topListItem'>
                  <Link to='/' style={{textDecoration:'none', color:"inherit"}}>Home</Link>
                </li>
                <li className='topListItem'>
                  <Link to='/about' style={{textDecoration:'none', color:"inherit"}}>About</Link>
                </li>
                <li className='topListItem'>
                  <Link to='/contact' style={{textDecoration:'none', color:"inherit"}}>Contact</Link>
                </li>
                <li className='topListItem'>
                  <Link to='/write' style={{textDecoration:'none', color:"inherit"}}>Write</Link>
                </li>
          </ul>
      </div>
      <div className='topRight'>
          <i className="topSearchIcon fas fa-search"></i>
           <p className='topListItem' onClick={handleLogout}>{user && 'Logout'}</p>
          {
          user ? (
            <Link to="/settings">
              <img
                className="topImg"
                src={imgPath + user.profilePic}
                alt=""
              />
            </Link>
          ) : (
              <ul className='topList'>
                <li className='topListItem'>
                  <Link to='/login' style={{textDecoration:'none', color:"inherit"}}>Login</Link>
                </li>
                <li className='topListItem'>
                  <Link to='/register' style={{textDecoration:'none', color:"inherit"}}>Register</Link>
                </li>
              </ul>
          )
          }

      </div>
    </div>
  )
}

