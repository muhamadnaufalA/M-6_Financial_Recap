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
    <section className="hero has-background-grey-light is-fullheight">
        <div className="hero-body">
            <div className="container">
            <div className="columns is-centered">
                <div className="column is-10-mobile is-6-tablet is-4-desktop">
                <form onSubmit={LoginFunc} className="box">
                    <h1 className="h2 mb-3 text-center">
                        <strong>Login</strong>
                    </h1>
                    <p className="has-text-centered has-text-danger">{msg}</p>
                    <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                        type="text"
                        className="input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                        type="password"
                        className="input"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="field">
                    <button className="button is-success is-fullwidth">Login</button>
                    </div>
                    <div className="field">
                    <p className="has-text-centered">
                        Don't have an account?{' '}
                        <Link to="/register">Register here</Link>
                    </p>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Login
