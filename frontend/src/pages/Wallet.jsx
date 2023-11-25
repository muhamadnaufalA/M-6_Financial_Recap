import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

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
    if (name === '') {
      Swal.fire({
        icon: 'error',
        title: 'Input Failed',
        text: 'Please fill in all fields',
        allowOutsideClick: false, // Prevent closing Swal on outside click
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
        const respon = await axios.post(`http://localhost:5000/users/${UserId}/wallets`,{
            name: name,
            balance: 0,
        });
        if (respon.status === 201) {
          await Swal.fire({
            icon: 'success',
            title: 'Wallet Added!',
            text: respon.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
        } 
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
        const respon = await axios.delete(`http://localhost:5000/wallets/${id}`);
        listWallet();
        if (respon.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Wallet Deleted!',
            text: respon.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
        }
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }
  const formatRupiah = (angka) => {
    const numberFormat = new Intl.NumberFormat("id-ID");
    return `Rp. ${numberFormat.format(angka)}`;
  };
    return (
    <section className="container-fluid bg-white p-5">
      <h1 className="h2 mt-3 mb-3 text-center">
          <strong>Wallet</strong>
      </h1>
      <div className="hero-body">
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col">
                      <form onSubmit={addWallet} className="border rounded p-4">
                          <p className="text-center text-danger">{msg}</p>
                          <div className="form-group">
                              <div className="control">
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      placeholder="Nama Wallet"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className="form-group mt-4">
                              <button className="btn btn-success d-flex justify-content-center align-items-center">Tambahkan</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  
      {/* TABEL */}
      <div className="hero has-background-white is-fullwidth mt-3">
          <div className="row justify-content-center">
              <div className="col-md-8 table-responsive card border">
                  <table className="table table-striped table-fullwidth table-hover text-center">
                      <thead>
                          <tr>
                              <th>No.</th>
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
                                  <td>{formatRupiah(wallet.balance)}</td>
                                  <td>
                                      <div className="btn-group">
                                          <Link to={`editWallet/${wallet.id}`} className="btn btn-info btn-sm mx-1">
                                              <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                          </Link>
                                          <button onClick={() => deleteWallet(wallet.id)} className="btn btn-danger btn-sm mx-1">
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