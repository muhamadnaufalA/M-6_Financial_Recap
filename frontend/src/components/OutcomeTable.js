import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';
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
        <section className="hero has-background-white is-fullwidth">
            {/* TABEL */}
            <div className="columns mt-5 is-centered">
                <div className="column">
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Nominal</th>
                                <th>Tanggal Pengeluaran</th>
                                <th>Budget Rule</th>
                                <th>Category</th>
                                <th>Wallet</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outcomes.map((outcome, index) => (
                                <tr key={outcome.id}>
                                    <td>{index + 1}</td>
                                    <td>{outcome.name}</td>
                                    <td>{outcome.nominal}</td>
                                    <td>{outcome.tanggal_pengeluaran}</td>
                                    <td>{outcome.budgetrule ? outcome.budgetrule.name : 'Belum ditentukan'}</td>
                                    <td>{outcome.category ? outcome.category.name : 'Belum ditentukan'}</td>
                                    <td>{outcome.wallet ? outcome.wallet.name : 'Belum ditentukan'}</td>
                                    <td>
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
            </div>
        </section>
    )
}
