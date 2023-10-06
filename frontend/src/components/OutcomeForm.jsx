import React from 'react'
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function OutcomeForm() {
    const [formData, setFormData] = useState({
        outcomeName: '',
        amount: '',
        date: '',
        outcomeType: '',
        category: '',
        wallet: '',
    });

    // const navigate = useNavigate();

    
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
            await axios.post(`http://localhost:5000/users/${1}/outcomes`,{
                name: formData.outcomeName,
                nominal: formData.amount,
                tanggal_pengeluaran: formData.date,
                jenisPengeluaranId: formData.outcomeType,
                categoryId: formData.category,
                walletId: formData.wallet,
            });
            // navigate('/');
            window.location.reload();
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };
    
    return (
        <div className="">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="outcomeName">
                    Nama Pengeluaran
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="outcomeName"
                    type="text"
                    name="outcomeName"
                    placeholder="Masukkan nama pengeluaran Anda"
                    value={formData.outcomeName}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Nominal
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="number"
                name="amount"
                placeholder="Masukkan nominal pengeluaran"
                value={formData.amount}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Tanggal Pengeluaran
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="outcomeType">
                Jenis Pengeluaran
            </label>
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="outcomeType"
                name="outcomeType"
                value={formData.outcomeType}
                onChange={handleChange}
            >
                <option value="Pilih jenis pengeluaran">Pilih jenis pengeluaran</option>
                <option value="1">Savings</option>
                <option value="2">Wants</option>
                <option value="3">Needs</option>
            </select>
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Kategori
            </label>
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wallet">
                Wallet
            </label>
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="flex items-center justify-between">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Kirim
                </button>
            </div>
            </form>
        </div>
    );
}
