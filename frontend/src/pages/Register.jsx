import React, { useState } from 'react'
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  
  const RegisterFunc = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/users',{
            username: username,
            password: password,
            confPassword: confPassword
        });
        history.push("/");
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    <section className="hero bg-light is-fullheight is-fullwidth">
    <div className="hero-body">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6" style={{paddingTop:'150px'}}>
                    <form onSubmit={RegisterFunc} className="card p-4">
                        <h1 className="h2 mb-3 text-center">
                            <strong>Register</strong>
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
                        <div className="mb-3">
                            <label htmlFor="confPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confPassword"
                                placeholder="**********"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-success rounded-pill">Register</button>
                        </div>
                        <div className="mb-3 text-center">
                            <p>
                                Already Have an Account?{' '}
                                <Link to="/">Login here</Link>
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

export default Register
