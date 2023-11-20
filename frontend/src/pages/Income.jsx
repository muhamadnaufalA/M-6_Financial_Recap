import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
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
              allowOutsideClick: false,
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
      <div className="container-fluid bg-white p-5">
          <h1 className="h2 mb-3 mt-3 text-center">
              <strong>Income</strong>
          </h1>
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <form onSubmit={addIncomeFunc} className="border rounded p-4">
                      <p className="text-center text-danger">{msg}</p>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text" className="form-control" id="name" placeholder="Contoh: Gaji Pokok"
                              value={name} onChange={(e)=> setName(e.target.value)}
                          required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="balance" className="form-label">Balance</label>
                          <input type="text" className="form-control" id="balance" value={formatRupiah(balance)}
                              onChange={(e)=> setBalance(e.target.value.replace(/\D/g, ''))}
                          required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="tanggalPemasukan" className="form-label">Tanggal Pemasukan</label>
                          <input type="date" className="form-control" id="tanggalPemasukan" value={tanggalPemasukan}
                              onChange={(e)=> setTanggalPemasukan(e.target.value)}
                          required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="wallet" className="form-label">Jenis Wallet</label>
                          <select className="form-control" id="wallet" name="wallet" value={idWallet} onChange={(e)=>
                              setWalletId(e.target.value)}
                              required
                              >
                              <option value={""}>Pilih wallet</option>
                              {wallets.map((wallet) => (
                              <option key={wallet.id} value={wallet.id}>
                                  {wallet.name}
                              </option>
                              ))}
                          </select>
                      </div>
                      <div className="mb-3">
                          <button type="submit" className="btn btn-success w-100">Tambahkan</button>
                      </div>
                  </form>
              </div>
          </div>

      </div>
      {/* TABEL */}
      <div className="card flex-fill">
          <div className="card-header">
              <h5 className="card-title mb-0">Income Table</h5>
          </div>

          <div className="card-body">
              <div className="d-flex mb-5" style={{ width: "40%" }}>
                  <div className="col-5 px-1">
                      <select className="form-select mr-2" value={selectedWallet} onChange={(e)=>
                          setSelectedWallet(e.target.value)}
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
                      <BiSolidHelpCircle style={{}} title="Filter hanya aktif ketika berada di page 1" />
                  </div>
              </div>

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
                          <td className="text-center">
                              <div className="btn-group">
                                  <Link to={`editIncome/${income.id}`} className="btn btn-sm btn-info me-2">
                                  <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                  </Link>
                                  <button onClick={()=> deleteIncome(income.id)} className="btn btn-sm btn-danger">
                                      <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                  </button>
                              </div>
                          </td>
                      </tr>
                      ))}
                  </tbody>
              </table>

              <div className="d-flex justify-content-between align-items-center mt-5">
                  <button className="btn btn-primary" onClick={()=> handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      >
                      Prev
                  </button>
                  <div>
                      Page {currentPage} of {totalPages} Total Pages (
                      {(itemsPerPage * (currentPage - 1)) + 1} -{' '}
                      {(itemsPerPage * (currentPage - 1)) + 5 > filteredIncomes.length
                      ? filteredIncomes.length
                      : (itemsPerPage * (currentPage - 1)) + 5}{' '}
                      of {filteredIncomes.length})
                  </div>
                  <button className="btn btn-primary" onClick={()=> handlePageChange(currentPage + 1)}
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