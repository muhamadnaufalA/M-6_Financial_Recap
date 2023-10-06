import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  
  const LoginFunc = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/login',{
            username: username,
            password: password
        });
        history.push("/dashboard");
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-4">
                    <form onSubmit={LoginFunc} className="box"> 
                        <p className='has-text-centered'>{msg}</p>
                        <div className="field mt-5">
                            <div className="label">Username</div>
                            <div className="controls">
                                <input type="text" className='input' placeholder='username'
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <div className="label">Password</div>
                            <div className="controls">
                                <input type="password" className='input' placeholder='**********'
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className='button is-success is-fullwidth'>Login</button>
                        </div>
                        <div className="field mt-3">
                            <p className="has-text-centered">
                                Don't have an account? {' '}
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
