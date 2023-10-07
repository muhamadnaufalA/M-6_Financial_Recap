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

        // const { userId } = response.data; // Assuming the API returns the user ID
        // setUserId(userId);
        // Jika login berhasil, simpan user id ke dalam cookie
        // console.log(userId);
        Cookies.set("userId", response.data.userId);
        history.push("/dashboard");
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    // <>
    //     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //             <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //             Login Your Account
    //             </h2>
    //         </div>

    //         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //             <form onSubmit={LoginFunc} className="space-y-6">
    //                 <p className='has-text-centered'>{msg}</p>
    //                 <div>
    //                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    //                     Username
    //                     </label>
    //                     <div className="mt-2">
    //                     <input
    //                         value={username} onChange={(e) => setUsername(e.target.value)}
    //                         name="username"
    //                         type="text"
    //                         placeholder='username'
    //                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                     />
    //                     </div>
    //                 </div>

    //                 <div>
    //                     <div className="flex items-center justify-between">
    //                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    //                         Password
    //                     </label>
    //                     </div>
    //                     <div className="mt-2">
    //                     <input
    //                         value={password} onChange={(e) => setPassword(e.target.value)}
    //                         name="password"
    //                         type="password"
    //                         placeholder='**********'
    //                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                     />
    //                     </div>
    //                 </div>

    //                 <div>
    //                     <button
    //                     type="submit"
    //                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                     >
    //                     Login
    //                     </button>
    //                 </div>
    //             </form>

    //             <p className="mt-10 text-center text-sm text-gray-500">
    //                 Don't have an account? {' '}
    //                 <Link to="/register">Register here</Link>
    //             </p>
    //         </div>
    //     </div>
    // </>
    <section className="hero has-background-grey-light is-fullheight">
        <div className="hero-body">
            <div className="container">
            <div className="columns is-centered">
                <div className="column is-10-mobile is-6-tablet is-4-desktop">
                <form onSubmit={LoginFunc} className="box">
                    <p className="has-text-centered">{msg}</p>
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
