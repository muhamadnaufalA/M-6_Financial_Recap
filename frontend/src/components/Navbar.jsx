import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { BiLogOutCircle } from "react-icons/bi";

function Navbar() {
  const [NameUser, setName] = useState('');

  const UserId = Cookies.get('userId');

  useEffect(() => {
    const getIncomeById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${UserId}`);
        setName(response.data.username);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (UserId) {
      getIncomeById();
    }
  }, [UserId]);

  //On click Logout
  const logout = () => {
    Cookies.remove("userId");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
    <a className="sidebar-toggle js-sidebar-toggle">
      <i className="hamburger align-self-center"></i>
    </a>

    <div className="navbar-collapse collapse">
      <ul className="navbar-nav navbar-align">

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
            <span className="text-dark mx-3" style={{ textTransform: 'uppercase' }}>{NameUser}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a className="dropdown-item" onClick={logout}>Log out</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar