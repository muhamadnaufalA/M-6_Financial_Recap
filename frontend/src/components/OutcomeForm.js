import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";
import Swal from "sweetalert2";

export default function OutcomeForm() {
    const UserId = Cookies.get("userId");
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
            const response = await axios.post(`http://localhost:5000/users/${UserId}/outcomes`,{
                name: formData.outcomeName,
                nominal: formData.amount,
                tanggal_pengeluaran: formData.date,
                budgetruleId: formData.outcomeType,
                categoryId: formData.category,
                walletId: formData.wallet,
            });

            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Outcome Added!',
                    text: response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: 'OK',
                });
            } 

            window.location.reload();
        } catch (error) {
            if(error.response.data.status == 422) {
                Swal.fire({
                    icon: 'error',
                    title: 'Input Failed',
                    text:error.response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: 'OK',
                });
                setMsg(error.response.data.message);
            } else if(error.response.data.status == 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Input Failed',
                    text:error.response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: 'OK',
                });
                setMsg(error.response.data.message);
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

    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID");
        return `Rp${numberFormat.format(angka)}`;
    };

    return (
        <div className="card flex-fill">
            <div className="card-header">
                <h5 className="card-title mb-0">Outcome</h5>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={handleSubmit} className="box">
                        <p className="has-text-center has-text-danger">{msg}</p>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="control">
                                    <input
                                        className="input"
                                        style={{ backgroundColor: '#f7f7f7' }}
                                        id="outcomeName"
                                        type="text"
                                        name="outcomeName"
                                        placeholder="Nama atau Keterangan Pengeluaran"
                                        value={formData.outcomeName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="control">
                                    <input
                                        className="input"
                                        style={{ backgroundColor: '#f7f7f7' }}
                                        id="amount"
                                        type="text"
                                        name="amount"
                                        placeholder="Nominal Pengeluaran"
                                        value={formatRupiah(formData.amount)}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setFormData({
                                                ...formData,
                                                amount: value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="control row">
                                    <div className="col-10">
                                        <input
                                            className="input"
                                            id="date"
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-2 d-flex align-items-center">
                                        <BiSolidHelpCircle 
                                            style={{ marginLeft: -10 }}
                                            title="Tanggal Pengeluaran"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-4">
                                <div className="control">
                                    <select
                                        className="input"
                                        id="outcomeType"
                                        name="outcomeType"
                                        value={formData.outcomeType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={""}>Pilih Budget Rule</option>
                                        {budgetRules.map((budgetRule) => (
                                            <option key={budgetRule.id} value={budgetRule.id}>
                                                {budgetRule.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="control">
                                    <select
                                        className="input"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={""}>Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="control">
                                    <select
                                        className="input"
                                        id="wallet"
                                        name="wallet"
                                        value={formData.wallet}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={""}>Pilih Wallet</option>
                                        {wallets.map((wallet) => (
                                            <option key={wallet.id} value={wallet.id}>
                                                {wallet.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field mt-5 d-flex justify-content-end">
                            <button className="btn btn-lg btn-success">Tambahkan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
