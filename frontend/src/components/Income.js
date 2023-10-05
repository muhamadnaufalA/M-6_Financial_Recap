import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';

const Income = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [tanggalPemasukan, setTanggalPemasukan] = useState('');
  const [msg, setMsg] = useState('');
  const [incomes, setIncome] = useState([]);
  const history = useHistory();

  // Get UserId with Cookie
  const UserId = Cookies.get("userId");

  useEffect(()=>{
    getListIncomeFunc(); 
  }, []);

  const getListIncomeFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/incomes`);
    setIncome(response.data);
  }

  const addIncomeFunc = async(e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:5000/users/${UserId}/incomes`,{
            name: name,
            balance: parseInt(balance),
            tanggalPemasukan: tanggalPemasukan
            
        });

        history.push("/dashboard");
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
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
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
                  <button className="button is-success is-fullwidth">Tambahkan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* TABEL */}
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Tanggal Pemasukan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income, index) => (
                <tr key={income.id}>
                  <td>{index + 1}</td>
                  <td>{income.name}</td>
                  <td>{income.balance}</td>
                  <td>{income.tanggal_pemasukan}</td>
                   <td>
                    <Link to={`editIncome/${income.id}`} className="button is-small is-info">Edit</Link>
                    <button onClick={() => deleteIncome(income.id)} className="button is-small is-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
  
}

export default Income