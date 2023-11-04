import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

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
        const respon = await axios.post(`http://localhost:5000/users/${UserId}/incomes`,{
            name: name,
            balance: parseInt(balance),
            tanggal_pemasukan: tanggalPemasukan,
            walletId: parseInt(idWallet)
        });

        if (respon.status === 201) {
          await Swal.fire({
            icon: 'success',
            title: 'Income Added!',
            text: respon.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
  
        } 
        window.location.reload();
    } catch (error) {
        if(error.response.status === 400){
            Swal.fire({
              icon: 'error',
              title: 'Input Failed',
              text:error.response.data.message,
              allowOutsideClick: false, // Prevent closing Swal on outside click
              confirmButtonText: 'OK',
            });
            setMsg(error.response.data.msg);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Input Failed!',
            text:error.response.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
          setMsg(error.response.data.msg);
        }
    }
  }

  const deleteIncome = async (id) => {
    try{
        const respon = await axios.delete(`http://localhost:5000/incomes/${id}`);

        if (respon.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Income Deleted!',
            text: respon.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
  
        }
        getListIncomeFunc();
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Income Failed Deleted!',
          allowOutsideClick: false, // Prevent closing Swal on outside click
          confirmButtonText: 'OK',
        });
        console.log(error);
    }
  }

  const formatRupiah = (angka) => {
    const numberFormat = new Intl.NumberFormat("id-ID");
    return `Rp. ${numberFormat.format(angka)}`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(incomes.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section>
      <div className="hero has-background-white is-fullwidth">
        <h1 className="h2 mb-3 mt-3 text-center">
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
                        type="text"
                        className="input"
                        value={formatRupiah(balance)}
                        onChange={(e) => setBalance(e.target.value.replace(/\D/g, ''))}
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
                    <button className="container button is-success d-flex justify-content-center align-items-center">Tambahkan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>                    
      {/* TABEL */}
      <div className="card flex-fill">
          <div className="card-header">
              <h5 className="card-title mb-0">Income Table</h5>
          </div>
          <div className="box">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Tanggal Pemasukan</th>
                    <th style={{ width: '20%' }}>Name</th>
                    <th style={{ width: '20%' }}>Balance</th>
                    <th style={{ width: '20%' }}>Wallet</th>
                    <th style={{ width: '20%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((income) => (
                    <tr key={income.id}>
                      <td>{income.tanggal_pemasukan}</td>
                      <td>{income.name}</td>
                      <td>{formatRupiah(income.balance)}</td>
                      <td>{income.wallet ? income.wallet.name : 'Belum ditentukan'}</td>
                      <td style={{paddingLeft:'60px'}}>
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
              {/* Pagination buttons */}
              <div className="pagination mt-5">
                <button
                  className="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
        </div>
      </div>
    </section>
  );
  
}

export default Income