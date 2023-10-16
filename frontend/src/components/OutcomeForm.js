import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

export default function OutcomeForm() {
    const UserId = Cookies.get("userId");
    const history = useHistory();
    const [wallets, setListWallet] = useState([]);
    const [budgetRules, setListBudgetRule] = useState([]);
    const [categories, setListCategory] = useState([]);
    const [msg, setMsg] = useState('');

    const [formData, setFormData] = useState({
        outcomeName: '',
        amount: '',
        date: '',
        outcomeType: '',
        category: '',
        wallet: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await axios.post(`http://localhost:5000/users/${UserId}/outcomes`,{
                name: formData.outcomeName,
                nominal: formData.amount,
                tanggal_pengeluaran: formData.date,
                budgetruleId: formData.outcomeType,
                categoryId: formData.category,
                walletId: formData.wallet,
            });
            // history.push("/dashboard");
            window.location.reload();
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };

    useEffect(()=>{
        getListWalletFunc();
        getListCategoryFunc();
        getListBudgetRuleFunc();
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

    return (
        <section className="hero has-background-white is-fullwidth">
            <h1 className="h2 mt-3 mb-3 text-center">
                <strong>Outcome</strong>
            </h1>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <form onSubmit={handleSubmit} className="box">
                                <p className="has-text-center">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Outcome Name</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            id="outcomeName"
                                            type="text"
                                            name="outcomeName"
                                            placeholder="Masukkan nama pengeluaran Anda"
                                            value={formData.outcomeName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Nominal</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            id="amount"
                                            type="number"
                                            name="amount"
                                            placeholder="Masukkan nominal pengeluaran"
                                            value={formData.amount}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Tanggal Pengeluaran</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            id="date"
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Budget Rule</label>
                                    <div className="control">
                                        <select
                                            className="input"
                                            id="outcomeType"
                                            name="outcomeType"
                                            value={formData.outcomeType}
                                            onChange={handleChange}
                                        >
                                            <option value="Pilih budget rule">Pilih budget rule</option>
                                            {budgetRules.map((budgetRule) => (
                                                <option key={budgetRule.id} value={budgetRule.id}>
                                                    {budgetRule.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Kategori</label>
                                    <div className="control">
                                        <select
                                            className="input"
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option value="Pilih kategori">Pilih kategori</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Wallet</label>
                                    <div className="control">
                                        <select
                                            className="input"
                                            id="wallet"
                                            name="wallet"
                                            value={formData.wallet}
                                            onChange={handleChange}
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
        </section>
    )
}
