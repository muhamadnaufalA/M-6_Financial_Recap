import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function Dashboard() {

	const [recap, setRecap] = useState([]);
	const UserId = Cookies.get("userId");

	useEffect(()=>{
		getListRecapFunc();
		getReportFunc(); 
	}, []);

	const getListRecapFunc = async () =>{
		const response = await axios.get(`http://localhost:5000/users/${UserId}/recap`);
		setRecap(response.data);
	}

    const [reports, setReport] = useState([]);

    const getReportFunc = async () =>{
        const response = await axios.get(`http://localhost:5000/users/${UserId}/report`);
        setReport(response.data);
    }

  return (
    <>
	<h1 className="h3 mb-3">
		Dashboard
	</h1>

	<div className="row">
		<div className="col-12 col-lg-12 col-xxl-12 d-flex">
			<div className="card flex-fill">
				<div className="card-header">

					<h5 className="card-title mb-0">Daily Recap</h5>
				</div>
				<table className="table table-hover my-0">
					<thead>
						<tr>
							<th>Tanggal</th>
							<th>Keterangan</th>
							<th>Nominal</th>
							<th>Wallet</th>
						</tr>
					</thead>
					<tbody>
						{recap.income && recap.income.map((recap, index) => (
							<tr key={recap.id}>
								<td>{recap.tanggal_pemasukan}</td>
								<td>{recap.name}</td>
								<td><span className="badge bg-success">Rp {recap.balance.toLocaleString()}</span></td>
								<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
							</tr>
						))}
						{recap.outcome && recap.outcome.map((recap, index) => (
							<tr key={recap.id}>
								<td>{recap.tanggal_pengeluaran}</td>
								<td>{recap.name}</td>
								<td><span className="badge bg-danger">Rp {recap.nominal.toLocaleString()}</span></td>
								<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
		<div className="col-12 col-lg-12 col-xxl-12 d-flex">
			<div className="card flex-fill">
				<div className="card-header">

					<h5 className="card-title mb-0">Monthly Report</h5>
				</div>
				<table className="table table-hover my-0">
					<thead>
						<tr>
							<th className="d-none d-xl-table-cell">Tanggal</th>
							<th>Keterangan</th>
							<th>Nominal</th>
							<th>Wallet</th>
						</tr>
					</thead>
					<tbody>
						{reports.map((l, index) => (
							<tr key={l.id}>
								<td className="d-none d-xl-table-cell">{l.tanggal}</td>
								<td className="d-none d-xl-table-cell">{l.keterangan}</td>
								<td className="d-none d-xl-table-cell"><span className={l.id_income != "-" ? "badge bg-success" : "badge bg-danger"}>Rp{l.balance ? l.balance.toLocaleString() : l.nominal.toLocaleString()}</span></td>
								<td className="d-none d-md-table-cell">{l.wallet ? l.wallet : 'Belum ditentukan'}</td>
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
