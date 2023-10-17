import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditOutcome = () => {
    const [name, setName] = useState("");
    const [nominal, setNominal] = useState("");
    const [tanggal_pengeluaran, setTanggalPengeluaran] = useState("");
    let [idBudgetRule, setBudgetRuleId] = useState('');
    const [nameBudgetRule, setBudgetRuleName] = useState('');
    let [idCategory, setCategoryId] = useState('');
    const [nameCategory, setCategoryName] = useState('');
    let [idWallet, setWalletId] = useState('');
    const [walletName, setWalletName] = useState('');
    const {id} = useParams();
    const history = useHistory();
    const [wallets, setListWallet] = useState([]);
    const [budgetRules, setListBudgetRule] = useState([]);
    const [categories, setListCategory] = useState([]);
    const UserId = Cookies.get("userId");
  
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
      }catch (error){
          console.log(error);
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
  
    return (
      <section className="hero has-background-white  is-fullwidth">
          <h1 className="h2 mb-3 text-center">
              <strong>Edit Outcome</strong>
          </h1>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column">
                 <form onSubmit={UpdateOutcome}>
                      <div className="field">
                          <label className="label">Name</label>
                          <div className="control">
                              <input 
                              type="text" 
                              className="input" 
                              value={name} 
                              onChange={(e)=> setName(e.target.value)}
                              placeholder='Contoh: Gaji Pokok'/>
                          </div>
                      </div>
                      <div className="field">
                          <label className="label">Nominal</label>
                          <div className="control">
                              <input 
                              type="number" 
                              className="input"                         
                              value={nominal} 
                              onChange={(e)=> setNominal(e.target.value)}
                              placeholder='Contoh: 100000'/>
                          </div>
                      </div>
                      <div className="field">
                          <label className="label">Tanggal Pengeluaran</label>
                          <div className="control">
                              <input 
                              type="date" 
                              className="input"                         
                              value={tanggal_pengeluaran} 
                              onChange={(e)=> setTanggalPengeluaran(e.target.value)}
                              />
                          </div>
                      </div>

                      <div className="field mt-5">
                        <label className="label">Budget Rule</label>
                        <div className="control">
                            <select
                            className="input"
                            id="budgetrule"
                            name="budgetrule"
                            value={idBudgetRule} 
                            onChange={(e) => setBudgetRuleId(e.target.value)}
                            >
                            {/* <option value="Pilih wallet">Pilih wallet</option> */}
                            {budgetRules.map((br) => (
                                <option key={br.id} value={br.id}>
                                {br.name}
                                </option>
                            ))}
                            </select>
                        </div>
                      </div>

                      <div className="field mt-5">
                        <label className="label">Category</label>
                        <div className="control">
                            <select
                            className="input"
                            id="category"
                            name="category"
                            value={idCategory} 
                            onChange={(e) => setCategoryId(e.target.value)}
                            >
                            {/* <option value="Pilih wallet">Pilih wallet</option> */}
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                {c.name}
                                </option>
                            ))}
                            </select>
                        </div>
                      </div>

                      <div className="field mt-5">
                        <label className="label">Jenis Wallet</label>
                        <div className="control">
                            <select
                            className="input"
                            id="wallet"
                            name="wallet"
                            value={idWallet} 
                            onChange={(e) => setWalletId(e.target.value)}
                            >
                            {/* <option value="Pilih wallet">Pilih wallet</option> */}
                            {wallets.map((wallet) => (
                                <option key={wallet.id} value={wallet.id}>
                                {wallet.name}
                                </option>
                            ))}
                            </select>
                        </div>
                      </div>
  
                      <div className="field">
                          <button type='submit' className='button is-success'>
                              Update
                          </button>
                      </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default EditOutcome;