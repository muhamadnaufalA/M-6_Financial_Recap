import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

export default function BudgetRuleTable() {
    const UserId = Cookies.get("userId");
    const [message, setMessage] = useState('');
    const [budgetRules, setBudgetRuleList] = useState([]);

    useEffect(()=>{
        getListBudgetRuleFunc(); 
    }, []);

    const getListBudgetRuleFunc = async () =>{
        const response = await axios.get(`https://api-nabugyuk.agilearn.id/users/${UserId}/budgetrule`);
        setBudgetRuleList(response.data);
    }

    const deleteBudgetRule = async (id) => {
        try{
            await axios.delete(`https://api-nabugyuk.agilearn.id/budgetrule/${id}`);
            getListBudgetRuleFunc();
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    return (
        <section className="col-md-8">
        <div className="box">
            <p className="text-center text-danger">{message}</p>
            <div className='table-responsive'>
                <table className="table table-hover table-striped border">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>No.</th>
                            <th style={{ width: '30%' }}>Budget Name</th>
                            <th style={{ width: '10%' }}>Percent</th>
                            <th className="text-center" style={{ width: '30%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetRules.map((budgetRule, index) => (
                            <tr key={budgetRule.id}>
                                <td>{index + 1}</td>
                                <td>{budgetRule.name}</td>
                                <td>{budgetRule.percentage} %</td>
                                <td className="text-center">
                                    <div className="btn-group">
                                        <Link to={`edit-budget-rule/${budgetRule.id}`} className="btn btn-sm btn-info me-2">
                                            <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                        </Link>
                                        <button onClick={() => deleteBudgetRule(budgetRule.id)} className="btn btn-sm btn-danger">
                                            <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    
  )
}
