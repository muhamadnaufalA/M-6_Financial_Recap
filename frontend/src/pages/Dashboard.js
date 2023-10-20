import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

function Dashboard() {

	const UserId = Cookies.get("userId");
	const [recap, setRecap] = useState([]);
	const [monthlyRecap, setMonthlyRecap] = useState([]);

	useEffect(()=>{
		getListRecapFunc();
		getRecapByMonth(); 
	}, []);

	const getListRecapFunc = async () =>{
		const response = await axios.get(`http://localhost:5000/users/${UserId}/recap`);
		setRecap(response.data);
	}

    const getRecapByMonth = async () =>{
        const response = await axios.get(`http://localhost:5000/users/${UserId}/recap/month`);
        setMonthlyRecap(response.data);
    }

	// // Konfigurasi grafik
	// const optionsTarget = {
	// 	chart: {
	// 	type: 'pie', // Jenis grafik, misalnya, bar, line, pie, dll.
	// 	},
	// 	title: {
	// 	text: 'Budget Rule Target',
	// 	},
	// 	series: [
	// 	{
	// 		name: 'Data',
	// 		data: [
	// 		{ name: 'Needs', y: 60 }, // 60% untuk "needs"
	// 		{ name: 'Wants', y: 30 }, // 30% untuk "wants"
	// 		{ name: 'Savings', y: 10 }, // 10% untuk "savings"
	// 		],
	// 	},
	// 	],
	// };

	// const optionsActual = {
	// 	chart: {
	// 	  type: 'pie',
	// 	},
	// 	title: {
	// 	  text: 'Budget Rule Actual',
	// 	},
	// 	series: [
	// 	  {
	// 		name: 'Data',
	// 		data: [
	// 		  { name: 'Needs', y: 60 }, // 60% untuk "needs"
	// 		  { name: 'Wants', y: 30 }, // 30% untuk "wants"
	// 		  { name: 'Savings', y: 10 }, // 10% untuk "savings"
	// 		],
	// 	  },
	// 	],
	//   };
	  
	
	// const ChartTarget = () => (
	// 	<HighchartsReact
	// 	highcharts={Highcharts}
	// 	options={optionsTarget}
	// 	/>
	// );

	// const ChartActual = () => (
	// 	<HighchartsReact
	// 	highcharts={Highcharts}
	// 	options={optionsActual}
	// 	/>
	// );
	
// 	<div className="col-12 col-lg-12 col-xxl-12 d-flex">
// 	<div className="card flex-fill">
// 		<div className="card-header">
// 			<ChartTarget /> {/* Gunakan komponen Chart di sini */}
// 			<ChartActual /> {/* Gunakan komponen Chart di sini */}
// 		</div>
// 	</div>
// </div>

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
								<td><span className="badge bg-success">Rp{recap.balance.toLocaleString('id-ID')}</span></td>
								<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
							</tr>
						))}
						{recap.outcome && recap.outcome.map((recap, index) => (
							<tr key={recap.id}>
								<td>{recap.tanggal_pengeluaran}</td>
								<td>{recap.name}</td>
								<td><span className="badge bg-danger">Rp{recap.nominal.toLocaleString('id-ID')}</span></td>
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
					<h5 className="card-title mb-0">Monthly Recap</h5>
				</div>
				<table className="table table-hover my-0">
					<thead>
						<tr>
							<th className="d-none d-md-table-cell">Tanggal</th>
							<th>Keterangan</th>
							<th>Budget Rule</th>
							<th>Kategori</th>
							<th>Nominal</th>
							<th>Wallet</th>
						</tr>
					</thead>
					<tbody>
						{monthlyRecap.map((l) => (
							<tr key={l.id}>
								<td className="d-none d-md-table-cell">{l.tanggal}</td>
								<td className="d-none d-xl-table-cell">{l.keterangan}</td>
								<td className="d-none d-md-table-cell">{l.budgetrule}</td>
								<td className="d-none d-md-table-cell">{l.category}</td>
								<td className="d-none d-xl-table-cell"><span className={l.id_income != "-" ? "badge bg-success" : "badge bg-danger"}>Rp{l.balance ? l.balance.toLocaleString('id-ID') : l.nominal.toLocaleString('id-ID')}</span></td>
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
