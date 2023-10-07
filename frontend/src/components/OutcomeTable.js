import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';

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
        <section className="hero has-background-white is-fullheight is-fullwidth">
            {/* TABEL */}
            <div className="columns ml-5 mr-5 is-centered">
                <div className="column">
                    <table className="table is-striped is-fullwidth box">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Nominal</th>
                                <th>Tanggal Pengeluaran</th>
                                <th>Jenis Pengeluaran</th>
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
                                    <td>{outcome.jenisPengeluaranId}</td>
                                    <td>{outcome.categoryId}</td>
                                    <td>{outcome.walletId}</td>
                                    <td>
                                        {/* <Link to={`editIncome/${outcome.id}`} className="button is-small is-info">Edit</Link> */}
                                        <button onClick={() => deleteOutcome(outcome.id)} className="button is-small is-danger">Delete</button>
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
