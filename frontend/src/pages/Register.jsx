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
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-4">
                    <form onSubmit={ RegisterFunc } className="box"> 
                    <h1 className="h2 mb-3 text-center">
                        <strong>Register</strong>
                    </h1>
                    <p className='has-text-center has-text-danger'>{msg}</p>
                        <div className="field mt-5">
                            <div className="label">Username</div>
                            <div className="controls">
                                <input type="text" className='input' placeholder='Username'
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
                            <div className="label">Confirm Password</div>
                            <div className="controls">
                                <input type="password" className='input' placeholder='**********'
                                value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <p className='has-text-centered'>
                                <button className='button is-success is-rounded'>Register</button>
                            </p>
                        </div>
                        <div className="field">
                        <p className="has-text-centered">
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
