import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import moment from "moment";
import { BiSolidHelpCircle } from "react-icons/bi";

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
    let response = await axios.get(`http://localhost:5000/users/${UserId}/incomes`);
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
        await axios.delete(`http://localhost:5000/incomes/${id}`);
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

  // Filter and Pagination
  const [selectedWallet, setSelectedWallet] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomes
      .filter((incomes) => {
          const walletMatch = selectedWallet === "All" || incomes.wallet?.name === selectedWallet;
          return walletMatch;
      })
      .slice(indexOfFirstItem, indexOfLastItem);

  const filteredIncomes = incomes.filter((incomes) => {
      const walletMatch = selectedWallet === "All" || incomes.wallet?.name === selectedWallet;
      return walletMatch;
  });
  
  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage);
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
            {/* Filter Start */}
            <div className="d-flex mb-5" style={{ width: "40%" }}>
              <div className="col-5 px-1">
                  <select
                      className="form-control mr-2"
                      value={selectedWallet}
                      onChange={(e) => setSelectedWallet(e.target.value)}
                      disabled={currentPage !== 1}
                      title={currentPage !== 1 ? "Kembali ke page awal untuk memilih wallet " : ""}
                  >
                      <option value="All">All Wallets</option>
                      {wallets.map((wallet) => (
                          <option key={wallet.id} value={wallet.name}>
                              {wallet.name}
                          </option>
                      ))}
                  </select>
              </div>
              
              <div className="col-2 px-1">
                  <BiSolidHelpCircle 
                      style={{  }}
                      title="Filter hanya aktif ketika berada di page 1"
                  />
              </div>
          </div>
          {/* Filter End */}
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
                      <td>{moment(income.tanggal_pemasukan).format('DD-MM-YYYY')}</td>
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
                <div>
                    Page { currentPage } of { totalPages } Total Pages ({(itemsPerPage * (currentPage-1)) + 1} - {(itemsPerPage * (currentPage-1)) + 5 > filteredIncomes.length ? filteredIncomes.length : (itemsPerPage * (currentPage-1)) + 5} of {filteredIncomes.length})
                </div>
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