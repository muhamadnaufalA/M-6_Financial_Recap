import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import { FaMoneyBillTransfer } from "react-icons/fa6";

const Login = () => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
//   const [userId, setUserId] = useState('null');
  const history = useHistory();
  
  const LoginFunc = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://api-nabugyuk.agilearn.id/login', {
            username: username,
            password: password
          });

        Cookies.set("userId", response.data.userId);
        history.push("/dashboard");
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    <div style={{ background: 'linear-gradient(to bottom right, #222e3c, #0a3944)' }}>
        <div className="container d-flex align-items-center min-vh-100">
            <div className="row justify-content-center w-100">
                <div className="col-lg-5 col-md-5 col-xxl-5 mx-auto">
                    <form onSubmit={LoginFunc} className="card p-4">
                        <div class="d-flex justify-content-center align-items-center pb-3">
                            <FaMoneyBillTransfer className="display-4" style={{ color: '#222e3c' }}/>
                        </div>
                        <h1 className="h2 mb-2">
                            <strong>Login to NabungYuk Finance App</strong>
                        </h1>
                        <p className="text-center text-danger">{msg}</p>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-center col-lg-12 col-md-12 col-xxl-12 ">
                            <button type="submit" className="btn btn-primary rounded-pill btn-lg px-7 py-2">Login</button>
                        </div>
                        <div className="mb-3 text-center">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register">Register here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
