import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";

export default function OutcomeForm() {
    const UserId = Cookies.get("userId");
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        budgetRuleName: '',
        percentage: ''
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
            await axios.post(`http://localhost:5000/users/${UserId}/budgetrule`,{
                name: formData.budgetRuleName,
                percentage: parseInt(formData.percentage)
            });
            window.location.reload();
        } catch (error) {
            if(error.response.status == 422) {
                setMessage(error.response.data.message);
            } else if(error.response.status == 400) {
                setMessage(error.response.data.message);
            } else if (error.response.status == 401){
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div className="col-md-4">
            <form onSubmit={handleSubmit} className="box">
                <p className="text-center text-danger">{message}</p>
                <div className="mb-3">
                    <input
                        className="form-control"
                        style={{ backgroundColor: '#f7f7f7' }}
                        id="budgetRuleName"
                        type="text"
                        name="budgetRuleName"
                        placeholder="Nama"
                        value={formData.budgetRuleName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="row mb-3">
                    <div>
                        <input
                            className="form-control"
                            style={{ backgroundColor: '#f7f7f7' }}
                            id="percentage"
                            type="number"
                            name="percentage"
                            placeholder="Budget (%)"
                            value={formData.percentage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <button className="btn btn-lg btn-success">Tambahkan</button>
                </div>
            </form>
        </div>
    
    )
}
