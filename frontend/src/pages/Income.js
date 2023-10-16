import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

const Income = () => {
  const [incomes, setIncome] = useState([]);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [tanggalPemasukan, setTanggalPemasukan] = useState('');

  const [idWallet, setWalletId] = useState('');
  const [wallets, setListWallet] = useState([]);

  const [msg, setMsg] = useState(''); 
  const history = useHistory();

  // Get UserId with Cookie
  const UserId = Cookies.get("userId");

  useEffect(()=>{
    getListIncomeFunc();
    getListWalletFunc(); 
  }, []);

  const getListWalletFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/wallets`);
    setListWallet(response.data);
  }

  const getListIncomeFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/incomes`);
    setIncome(response.data);
  }

  const addIncomeFunc = async(e) => {
    e.preventDefault();
    try {
        console.log(idWallet)
        await axios.post(`http://localhost:5000/users/${UserId}/incomes`,{
            name: name,
            balance: parseInt(balance),
            tanggal_pemasukan: tanggalPemasukan,
            walletId: parseInt(idWallet)
        });
        window.location.reload();
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  const deleteIncome = async (id) => {
    try{
        await axios.delete(`http://localhost:5000/incomes/${id}`);
        getListIncomeFunc();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <section className="hero has-background-white is-fullheight is-fullwidth">
      <h1 className="h2 mb-3 text-center">
          <strong>Income</strong>
      </h1>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <form onSubmit={addIncomeFunc} className="box">
                <p className="has-text-center">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Contoh: Gaji Pokok"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Balance</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      placeholder="Contoh: 100000"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Tanggal Pemasukan</label>
                  <div className="control">
                    <input
                      type="date"
                      className="input"
                      value={tanggalPemasukan}
                      onChange={(e) => setTanggalPemasukan(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <label className="label">Jenis Wallet</label>
                  <div className="control">
                    <select
                      className="input"
                      id="wallet"
                      name="wallet"
                      value={idWallet} // Ini harus menjadi nilai yang sesuai dengan wallet yang dipilih
                      onChange={(e) => setWalletId(e.target.value)}
                    >
                      <option value="Pilih wallet">Pilih wallet</option>
                      {wallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id}>
                          {wallet.name}
                        </option>
                      ))}
                    </select>
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
          <div className="columns mt-5 is-centered">
            <div className="column">
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Balance</th>
                    <th>Tanggal Pemasukan</th>
                    <th>Wallet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map((income, index) => (
                    <tr key={income.id}>
                      <td>{index + 1}</td>
                      <td>{income.name}</td>
                      <td>Rp {income.balance.toLocaleString()}</td>
                      <td>{income.tanggal_pemasukan}</td>
                      <td>{income.wallet ? income.wallet.name : 'Belum ditentukan'}</td>
                      <td>
                        <div className="buttons">
                          <Link to={`editIncome/${income.id}`} className="button is-small is-info">
                            <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                          </Link>
                          <button onClick={() => deleteIncome(income.id)} className="button is-small is-danger">
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
      {/* <div className="hero has-background-white is-fullwidth">
        <div className="columns mt-5 is-centered">
          <div className="column is-three-quarters">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Balance</th>
                  <th>Tanggal Pemasukan</th>
                  <th>Wallet</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income, index) => (
                  <tr key={income.id}>
                    <td>{index + 1}</td>
                    <td>{income.name}</td>
                    <td>Rp {income.balance.toLocaleString()}</td>
                    <td>{income.tanggal_pemasukan}</td>
                    <td>{income.wallet ? income.wallet.name : 'Belum ditentukan'}</td>
                    <td>
                      <div className="buttons">
                        <Link to={`editIncome/${income.id}`} className="button is-small is-info">
                          <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                        </Link>
                        <button onClick={() => deleteIncome(income.id)} className="button is-small is-danger">
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
      </div> */}
    </section>
  );
  
}

export default Income