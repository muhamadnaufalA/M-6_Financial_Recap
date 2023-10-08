import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

export default function OutcomeForm() {
    const UserId = Cookies.get("userId");
    const history = useHistory();
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
                jenisPengeluaranId: formData.outcomeType,
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

    return (
        <section className="hero has-background-white is-fullheight is-fullwidth">
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
                                    <label className="label">Jenis Pengeluaran</label>
                                    <div className="control">
                                        <select
                                            className="input"
                                            id="outcomeType"
                                            name="outcomeType"
                                            value={formData.outcomeType}
                                            onChange={handleChange}
                                        >
                                            <option value="Pilih jenis pengeluaran">Pilih jenis pengeluaran</option>
                                            <option value="3">Needs</option>
                                            <option value="4">Wants</option>
                                            <option value="5">Savings</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Jenis Pengeluaran</label>
                                    <div className="control">
                                        <select
                                            className="input"
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option value="Pilih kategori">Pilih kategori</option>
                                            <option value="1">Groceries</option>
                                            <option value="2">Transportation</option>
                                            <option value="3">Games</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Jenis Pengeluaran</label>
                                    <div className="control">
                                        <select
                                            className="input"
                                            id="wallet"
                                            name="wallet"
                                            value={formData.wallet}
                                            onChange={handleChange}
                                        >
                                            <option value="Pilih wallet">Pilih wallet</option>
                                            <option value="1">Dompet</option>
                                            <option value="2">Kartu Kredit</option>
                                            <option value="3">BCA</option>
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
        </section>
    )
}
