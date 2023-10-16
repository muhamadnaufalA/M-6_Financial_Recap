import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

function Dashboard() {
	const [recap, setRecap] = useState([]);

	const UserId = Cookies.get("userId");


	useEffect(()=>{
		getListRecapFunc();
	  }, []);

	const getListRecapFunc = async () =>{
		const response = await axios.get(`http://localhost:5000/users/${UserId}/report`);
		setRecap(response.data);
	}
  return (
    <>
	<h1 className="h3 mb-3">
		Dashboard
	</h1>

	<div className="row">
		<div className="col-12 col-lg-8 col-xxl-12 d-flex">
			<div className="card flex-fill">
				<div className="card-header">

					<h5 className="card-title mb-0">Recap</h5>
				</div>
				<table className="table table-hover my-0">
					<thead>
						<tr>
							<th>Tanggal Pemasukan</th>
							<th>Keterangan</th>
							<th>Name</th>
							<th>Balance</th>
							<th>Wallet</th>
						</tr>
					</thead>
					<tbody>
						{recap.income && recap.income.map((recap, index) => (
							<tr key={recap.id}>
								<td>{recap.tanggal_pemasukan}</td>
								<td>Income{index + 1}</td>
								<td>{recap.name}</td>
								<td><span className="badge bg-success">Rp {recap.balance.toLocaleString()}</span></td>
								<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
							</tr>
						))}
						{recap.outcome && recap.outcome.map((recap, index) => (
							<tr key={recap.id}>
								<td>{recap.tanggal_pemasukan}</td>
								<td>Outcome{index + 1}</td>
								<td>{recap.name}</td>
								<td><span className="badge bg-danger">Rp {recap.nominal.toLocaleString()}</span></td>
								<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
    </>


    
  )
}

export default Dashboard
