import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function Dashboard() {

	const UserId = Cookies.get("userId");
    const [reports, setReport] = useState([]);
	let lap = [];

	useEffect(()=>{
        getReportFunc(); 
    }, []);

    const getReportFunc = async () =>{
        const response = await axios.get(`http://localhost:5000/users/${UserId}/report`);
        setReport(response.data);
    }

	lap = reports.income && reports.outcome ? reports.income.concat(reports.outcome) : [];

	// Mengubah variabel tanggal_pemasukan atau tanggal_pengeluaran menjadi tanggal
	const laporan = lap.map(item => {
		const laporan = { ...item }; // Buat objek baru dengan salinan item asli
		laporan.tanggal = laporan.tanggal_pemasukan || laporan.tanggal_pengeluaran;
		delete laporan.tanggal_pemasukan;
		delete laporan.tanggal_pengeluaran;
		return laporan;
	});

	laporan.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  return (
    <>
	<h1 className="h3 mb-3">
		Dashboard
	</h1>

	<div className="row">
		<div className="col-12 col-lg-8 col-xxl-12 d-flex">
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
						{laporan.map((l, index) => (
							<tr key={l.id}>
								<td className="d-none d-xl-table-cell">{l.tanggal}</td>
								<td className="d-none d-xl-table-cell">{l.name}</td>
								<td className="d-none d-xl-table-cell"><span className={l.balance ? "badge bg-success" : "badge bg-danger"}>Rp{l.balance ? l.balance.toLocaleString() : l.nominal.toLocaleString()}</span></td>
								<td className="d-none d-md-table-cell">{l.wallet ? l.wallet.name : 'Belum ditentukan'}</td>
							</tr>
                        ))}
					</tbody>
				</table>
			</div>
		</div>
		<div className="col-12 col-lg-4 col-xxl-3 d-flex">
			<div className="card flex-fill w-100">
				<div className="card-header">
					<h5 className="card-title mb-0">Monthly Summary</h5>
				</div>
				<div className="card-body d-flex w-100">
					<div className="align-self-center chart chart-lg">
					<table className="table table-hover my-0">
					<thead>
						<tr>
							<th>Pemasukan</th>
							<th>Pengeluaran</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>


    
  )
}

export default Dashboard
