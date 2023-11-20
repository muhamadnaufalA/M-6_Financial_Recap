import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditOutcome = () => {
    const [name, setName] = useState("");
    const [nominal, setNominal] = useState("");
    const [tanggal_pengeluaran, setTanggalPengeluaran] = useState("");
    const {id} = useParams();
    const history = useHistory();
    const [wallets, setListWallet] = useState([]);
    const [budgetRules, setListBudgetRule] = useState([]);
    const [categories, setListCategory] = useState([]);
    const UserId = Cookies.get("userId");
    const [msg, setMsg] = useState('');

    let [idBudgetRule, setBudgetRuleId] = useState('');
    let [idCategory, setCategoryId] = useState('');
    let [idWallet, setWalletId] = useState('');
  
    var temp1;
    var temp2;
    var temp3;
  
    useEffect(() => {
      getIncomeById();
      getListWalletFunc();
      getListBudgetRuleFunc();
      getListCategoryFunc();
    }, []);
  
    const getListWalletFunc = async () =>{
      const response = await axios.get(`http://localhost:5000/users/${UserId}/wallets`);
      setListWallet(response.data);
    }

    const getListBudgetRuleFunc = async () =>{
      const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`);
      setListBudgetRule(response.data);
    }

    const getListCategoryFunc = async () =>{
      const response = await axios.get(`http://localhost:5000/users/${UserId}/category`);
      setListCategory(response.data);
    }
  
    const UpdateOutcome = async (e) =>{
      e.preventDefault();
      if (idWallet == null) {
        idWallet = temp1;
      }
      if (idBudgetRule == null) {
        idBudgetRule = temp2;
      }
      if (idCategory == null) {
        idCategory = temp3
      }
      try{
          await axios.put(`http://localhost:5000/Outcomes/${id}`, {
              name,
              nominal: parseInt(nominal),
              tanggal_pengeluaran,
              walletId: parseInt(idWallet),
              budgetruleId: parseInt(idBudgetRule),
              categoryId: parseInt(idCategory)
          });
          history.push("/outcome");
      } catch(error) {
        setMsg(error.response.data.message);
      }
    };
  
    const getIncomeById = async () => {
      const response = await axios.get(`http://localhost:5000/Outcomes/${id}`);
      setName(response.data.name);
      setNominal(response.data.nominal);
      setTanggalPengeluaran(response.data.tanggal_pengeluaran);
    //   setWalletName(response.data.wallet.name);
  
      temp1 = setWalletId(response.data.walletId);
      temp2 = setBudgetRuleId(response.data.budgetruleId);
      temp3 = setCategoryId(response.data.categoryId);
    }

    const formatRupiah = (angka) => {
      const numberFormat = new Intl.NumberFormat("id-ID");
      return `Rp${numberFormat.format(angka)}`;
    };
  
    return (
      <div className="container">
        <h1 className="h2 mb-3 text-center">
          <strong>Edit Outcome</strong>
        </h1>
        <div className="hero-body">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={UpdateOutcome} className="card p-4">
                <p className="text-center text-danger">{msg}</p>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nama atau Keterangan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Contoh: Gaji Pokok'
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nominal" className="form-label">Nominal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nominal"
                    value={formatRupiah(nominal)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setNominal(value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tanggalPengeluaran" className="form-label">Tanggal Pengeluaran</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tanggalPengeluaran"
                    value={tanggal_pengeluaran}
                    onChange={(e) => setTanggalPengeluaran(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="budgetrule" className="form-label">Budget Rule</label>
                  <select
                    className="form-select cursor-pointer"
                    id="budgetrule"
                    name="budgetrule"
                    value={idBudgetRule}
                    onChange={(e) => setBudgetRuleId(e.target.value)}
                  >
                    {budgetRules.map((br) => (
                      <option key={br.id} value={br.id}>
                        {br.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-select cursor-pointer"
                    id="category"
                    name="category"
                    value={idCategory}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="wallet" className="form-label">Jenis Wallet</label>
                  <select
                    className="form-select cursor-pointer"
                    id="wallet"
                    name="wallet"
                    value={idWallet}
                    onChange={(e) => setWalletId(e.target.value)}
                  >
                    {wallets.map((wallet) => (
                      <option key={wallet.id} value={wallet.id}>
                        {wallet.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 text-end">
                  <button type='submit' className='btn btn-success'>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default EditOutcome;