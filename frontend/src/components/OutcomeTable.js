import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

export default function OutcomeTable() {
    const UserId = Cookies.get("userId");
    const [outcomes, setOutcome] = useState([]);

    useEffect(()=>{
        getListOutcomeFunc(); 
    }, []);

    const getListOutcomeFunc = async () =>{
        const response = await axios.get(`http://localhost:5000/users/${UserId}/Outcomes`);
        setOutcome(response.data);
    }

    const deleteOutcome = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/Outcomes/${id}`);
            getListOutcomeFunc();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="card flex-fill">
            <div className="card-header">
                <h5 className="card-title mb-0">Outcome Table</h5>
            </div>
            {/* TABEL */}
            <div className="box">
                <table className="table table-hover my-0">
                    <thead>
                        <tr>
                            <th style={{ width: '12%' }}>Tanggal</th>
                            <th style={{ width: '15%' }}>Keterangan</th>
                            <th style={{ width: '15%' }}>Nominal</th>
                            <th style={{ width: '15%' }}>Budget Rule</th>
                            <th style={{ width: '15%' }}>Category</th>
                            <th style={{ width: '12%' }}>Wallet</th>
                            <th className="text-center" style={{ width: '12%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outcomes.map((outcome, index) => (
                            <tr key={outcome.id}>
                                <td>{outcome.tanggal_pengeluaran}</td>
                                <td>{outcome.name}</td>
                                <td>Rp {outcome.nominal.toLocaleString()}</td>
                                <td>{outcome.budgetrule ? outcome.budgetrule.name : 'Belum ditentukan'}</td>
                                <td>{outcome.category ? outcome.category.name : 'Belum ditentukan'}</td>
                                <td>{outcome.wallet ? outcome.wallet.name : 'Belum ditentukan'}</td>
                                <td className="text-center">
                                    <Link to={`edit-outcome/${outcome.id}`} className="button is-small is-info">
                                    <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                                    </Link>
                                    <button onClick={() => deleteOutcome(outcome.id)} className="button is-small is-danger">
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
