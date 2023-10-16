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
		<strong>Analytics</strong> Dashboard
	</h1>

	<div className="row">
		<div className="col-xl-6 col-xxl-5 d-flex">
			<div className="w-100">
				<div className="row">
					<div className="col-sm-6">
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col mt-0">
										<h5 className="card-title">Sales</h5>
									</div>

									<div className="col-auto">
										<div className="stat text-primary">
											<i className="align-middle" data-feather="truck"></i>
										</div>
									</div>
								</div>
								<h1 className="mt-1 mb-3">2.382</h1>
								<div className="mb-0">
									<span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i> -3.65% </span>
									<span className="text-muted">Since last week</span>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col mt-0">
										<h5 className="card-title">Visitors</h5>
									</div>

									<div className="col-auto">
										<div className="stat text-primary">
											<i className="align-middle" data-feather="users"></i>
										</div>
									</div>
								</div>
								<h1 className="mt-1 mb-3">14.212</h1>
								<div className="mb-0">
									<span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
									<span className="text-muted">Since last week</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col mt-0">
										<h5 className="card-title">Earnings</h5>
									</div>

									<div className="col-auto">
										<div className="stat text-primary">
											<i className="align-middle" data-feather="dollar-sign"></i>
										</div>
									</div>
								</div>
								<h1 className="mt-1 mb-3">$21.300</h1>
								<div className="mb-0">
									<span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
									<span className="text-muted">Since last week</span>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col mt-0">
										<h5 className="card-title">Orders</h5>
									</div>

									<div className="col-auto">
										<div className="stat text-primary">
											<i className="align-middle" data-feather="shopping-cart"></i>
										</div>
									</div>
								</div>
								<h1 className="mt-1 mb-3">64</h1>
								<div className="mb-0">
									<span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i> -2.25% </span>
									<span className="text-muted">Since last week</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="col-xl-6 col-xxl-7">
			<div className="card flex-fill w-100">
				<div className="card-header">
					<h5 className="card-title mb-0">Recent Movement</h5>
				</div>
				<div className="card-body py-3">
					<div className="chart chart-sm">
						<canvas id="chartjs-dashboard-line"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="row">
		<div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
			<div className="card flex-fill w-100">
				<div className="card-header">

					<h5 className="card-title mb-0">Browser Usage</h5>
				</div>
				<div className="card-body d-flex">
					<div className="align-self-center w-100">
						<div className="py-3">
							<div className="chart chart-xs">
								<canvas id="chartjs-dashboard-pie"></canvas>
							</div>
						</div>

						<table className="table mb-0">
							<tbody>
								<tr>
									<td>Chrome</td>
									<td className="text-end">4306</td>
								</tr>
								<tr>
									<td>Firefox</td>
									<td className="text-end">3801</td>
								</tr>
								<tr>
									<td>IE</td>
									<td className="text-end">1689</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
			<div className="card flex-fill w-100">
				<div className="card-header">

					<h5 className="card-title mb-0">Real-Time</h5>
				</div>
				<div className="card-body px-4">
					<div id="world_map" style={{height:350}}></div>
				</div>
			</div>
		</div>
		<div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
			<div className="card flex-fill">
				<div className="card-header">

					<h5 className="card-title mb-0">Calendar</h5>
				</div>
				<div className="card-body d-flex">
					<div className="align-self-center w-100">
						<div className="chart">
							<div id="datetimepicker-dashboard"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="row">
		<div className="col-12 col-lg-8 col-xxl-9 d-flex">
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
