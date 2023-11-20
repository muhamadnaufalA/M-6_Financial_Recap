import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
//   const [userId, setUserId] = useState('null');
  const history = useHistory();
  
  const LoginFunc = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login', {
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
<section className="hero" style={{ background: 'linear-gradient(to right, #8e9eab, #eef2f3)' }}>
    <div className="container  align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6" style={{paddingTop:'180px'}}>
                <form onSubmit={LoginFunc} className="card p-4">
                    <h1 className="h2 mb-3 text-center">
                        <strong>Login</strong>
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
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-success rounded-pill">Login</button>
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
</section>


  )
}

export default Login
