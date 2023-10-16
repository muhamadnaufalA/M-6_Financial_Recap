import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

const Wallet = ()=> {
  const [wallets, setWallet] = useState([]);
  const [name, setName] = useState(''); 
  const UserId = Cookies.get("userId");
  const [msg, setMsg] = useState('');
  useEffect(()=>{
    listWallet(); 
  }, []);
  const addWallet = async(e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:5000/users/${UserId}/wallets`,{
            name: name,
            balance: 0,
        });
        window.location.reload()
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }
  const listWallet = async() => {
    try {
        const response = await axios.get(`http://localhost:5000/users/${UserId}/wallets`);
        setWallet(response.data);
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }
  const deleteWallet = async(id) => {
    try {
        await axios.delete(`http://localhost:5000/wallets/${id}`);
        listWallet();
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }
    return (
        <section className="hero has-background-white is-fullwidth">
        <h1 className="h2 mt-3 mb-3 text-center">
            <strong>Wallet</strong>
        </h1>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column">
                <form onSubmit={addWallet} className="box">
                  <p className="has-text-center">{msg}</p>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Contoh: BCA/BRI"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
  
  
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">Tambahkan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* TABEL */}
        <div className="hero has-background-white is-fullwidth">
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Balance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((wallet, index) => (
                    <tr key={wallet.id}>
                      <td>{index + 1}</td>
                      <td>{wallet.name}</td>
                      <td>Rp {wallet.balance.toLocaleString()}</td>
                      <td>
                        <div className="buttons">
                          <Link to={`editWallet/${wallet.id}`} className="button is-small is-info">
                            <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                          </Link>
                          <button onClick={() => deleteWallet(wallet.id)} className="button is-small is-danger">
                            <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </section>
  )
}

export default Wallet