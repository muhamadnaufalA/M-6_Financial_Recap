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
        const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`);
        setBudgetRuleList(response.data);
    }

    const deleteBudgetRule = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/budgetrule/${id}`);
            getListBudgetRuleFunc();
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    return (
      <section className="col-7">
        <div className="box">
          <p className="has-text-center has-text-danger">{message}</p>
          <table className="table table-hover my-0">
            <thead>
                <tr>
                    <th style={{ width: '5%' }}>No.</th>
                    <th style={{ width: '30%' }}>Budget Name</th>
                    <th style={{ width: '25%' }}>Nominal</th>
                    <th style={{ width: '10%' }}>Percent</th>
                    <th className="text-center" style={{ width: '30%' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {budgetRules.map((budgetRule, index) => (
                    <tr key={budgetRule.id}>
                        <td>{index + 1}</td>
                        <td>{budgetRule.name}</td>
                        <td>Nominal</td>
                        <td>{budgetRule.percentage} %</td>
                        <td className="text-center">
                            <Link to={`edit-budget-rule/${budgetRule.id}`} className="button is-small is-info">
                            <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                            </Link>
                            <button onClick={() => deleteBudgetRule(budgetRule.id)} className="button is-small is-danger">
                                <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    </section>
  )
}
