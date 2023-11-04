import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";
import moment from 'moment';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

function Dashboard() {

	const UserId = Cookies.get("userId");
	const [recap, setRecap] = useState([]);
	const [monthlyRecap, setMonthlyRecap] = useState([]);
	const [budgetRules, setBudgetRules] = useState([]);
	const [budgetRulesActual, setBudgetRulesActual] = useState([]);
	const [budgetRuleList, setBudgetRuleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

	useEffect(()=>{
		getListRecapFunc();
		getRecapByMonth(); 
		getBudgetRulesTarget();
		getBudgetRulesActual();
		getListBudgetRuleFunc();
    getListCategoryFunc(); 
	}, []);

	const getListRecapFunc = async () =>{
		const response = await axios.get(`http://localhost:5000/users/${UserId}/recap`);
		setRecap(response.data);
	}

    const getRecapByMonth = async () => {
        const response = await axios.get(`http://localhost:5000/users/${UserId}/recap/month`);
        setMonthlyRecap(response.data);
    }

	const getBudgetRulesTarget = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`);
		setBudgetRules(response.data);
	}

	const getBudgetRulesActual = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/report`);
		setBudgetRulesActual(response.data);
	}

	const getListBudgetRuleFunc = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`)
		setBudgetRuleList(response.data);
	}

	const getListCategoryFunc = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/category`)
		setCategoryList(response.data);
	}

	const formatRupiah = (angka) => {
		const numberFormat = new Intl.NumberFormat("id-ID");
		return `Rp. ${numberFormat.format(angka)}`;
  };
	
	// Filter and Pagination Monthly Recap Start //
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedBudgetRule, setSelectedBudgetRule] = useState("All");
	const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
	const [selectedTransaction, setSelectedTransaction] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = monthlyRecap
		.filter((recap) => {
			const transactionMatch = selectedTransaction === "All" || recap.transaction_type === selectedTransaction;
			const categoryMatch = selectedCategory === "All" || recap.category === selectedCategory;
			const budgetRuleMatch = selectedBudgetRule === "All" || recap.budgetrule === selectedBudgetRule;
			const monthMatch = selectedMonth === "All" || parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(selectedMonth, 10);
      const yearMatch = selectedYear === "All" || parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(selectedYear, 10);
			return transactionMatch && categoryMatch && budgetRuleMatch && monthMatch && yearMatch;
		})
		.slice(indexOfFirstItem, indexOfLastItem);

	const filteredMonthlyRecap = monthlyRecap.filter((recap) => {
		const transactionMatch = selectedTransaction === "All" || recap.transaction_type === selectedTransaction;
		const categoryMatch = selectedCategory === "All" || recap.category === selectedCategory;
		const budgetRuleMatch = selectedBudgetRule === "All" || recap.budgetrule === selectedBudgetRule;
		const monthMatch = selectedMonth === "All" || parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(selectedMonth, 10);
    const yearMatch = selectedYear === "All" || parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(selectedYear, 10);
		return transactionMatch && categoryMatch && budgetRuleMatch && monthMatch && yearMatch;
	});
	
	const totalPages = Math.ceil(filteredMonthlyRecap.length / itemsPerPage);
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
				setCurrentPage(newPage);
		}
	};
	// Filter and Pagination Monthly Recap End //

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
			{/* Outcome Target */}
			<div className="row">
				<div className="col-6 col-lg-6 col-xxl-6 d-flex">
					<div className="card flex-fill">
						<div className="card-header">
							<h5 className="card-title mb-0">Outcome Target</h5>
						</div>
						<table className="table table-hover my-0">
							<thead>
								<tr>
									<th>Budget Rule</th>
									<th>Percentage</th>
								</tr>
							</thead>
							<tbody>
								{budgetRules.map((budgetRule) => (
									<tr key={budgetRule.id}>
										<td className="d-none d-md-table-cell">{budgetRule.name}</td>
										<td className="d-none d-md-table-cell">{budgetRule.percentage}%</td>
									</tr>
														))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Outcome Report */}
				<div className="col-6 col-lg-6 col-xxl-6 d-flex">
					<div className="card flex-fill">
						<div className="card-header">
							<h5 className="card-title mb-0">Outcome Report</h5>
						</div>
						<table className="table table-hover my-0">
							<thead>
								<tr>
									<th>Budget Rule</th>
									<th>Total Pengeluaran</th>
									<th>Percentage</th>
								</tr>
							</thead>
							<tbody>
								{budgetRulesActual.map((budgetRuleActual) => (
									<tr key={budgetRuleActual.id}>
										<td className="d-none d-md-table-cell">{budgetRuleActual.name}</td>
										<td className="d-none d-md-table-cell">{formatRupiah(budgetRuleActual.totalPengeluaran)}</td>
										{/* <td className="d-none d-md-table-cell">{(budgetRuleActual.totalPengeluaran / totalSaldoWallet * 100).toFixed(2)}%</td> */}
										<td className="d-none d-md-table-cell">... %</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Daily Recap */}
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
										<td><span className="badge bg-success">{formatRupiah(recap.balance)}</span></td>
										<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
									</tr>
								))}
								{recap.outcome && recap.outcome.map((recap, index) => (
									<tr key={recap.id}>
										<td>{recap.tanggal_pengeluaran}</td>
										<td>{recap.name}</td>
										<td><span className="badge bg-danger">{formatRupiah(recap.nominal)}</span></td>
										<td>{recap.wallet ? recap.wallet.name : 'Belum ditentukan'}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Monthly Recap Table Start */}
				<div className="col-12 col-lg-12 col-xxl-12 d-flex">
					<div className="card flex-fill">
						<div className="card-header">
							<h5 className="card-title mb-0">Monthly Recap</h5>
						</div>
						<div className="box">
							{/* Filter Start */}
							<div className="d-flex mb-5" style={{ width: "100%" }}>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedTransaction}
										onChange={(e) => setSelectedTransaction(e.target.value)}
										disabled={currentPage !== 1}
										title={currentPage !== 1 ? "Kembali ke page awal untuk memilih jenis transaksi" : ""}
									>
										<option value="All">All Transactions</option>
										<option value="Income">Income</option>
										<option value="Outcome">Outcome</option>
									</select>
								</div>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedBudgetRule}
										onChange={(e) => setSelectedBudgetRule(e.target.value)}
										disabled={currentPage !== 1}
										title={currentPage !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
									>
										<option value="All">All Budget Rules</option>
										{budgetRuleList.map((budgetRule) => (
												<option key={budgetRule.id} value={budgetRule.name}>
														{budgetRule.name}
												</option>
										))}
									</select>
								</div>
								<div className="col-2 px-1">
									<select
										className="form-control"
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
										disabled={currentPage !== 1}
										title={currentPage !== 1 ? "Kembali ke page awal untuk memilih category" : ""}
									>
										<option value="All">All Categories</option>
										{categoryList.map((category) => (
												<option key={category.id} value={category.name}>
														{category.name}
												</option>
										))}
									</select>
								</div>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedMonth}
										onChange={(e) => setSelectedMonth(e.target.value)}
										disabled={currentPage !== 1}
										title={currentPage !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
									>
										<option value="All">All Months</option>
										<option value="01">January</option>
										<option value="02">February</option>
										<option value="03">March</option>
										<option value="04">April</option>
										<option value="05">May</option>
										<option value="06">June</option>
										<option value="07">July</option>
										<option value="08">August</option>
										<option value="09">September</option>
										<option value="10">October</option>
										<option value="11">November</option>
										<option value="12">December</option>
									</select>
								</div>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedYear}
										onChange={(e) => setSelectedYear(e.target.value)}
										disabled={currentPage !== 1}
										title={currentPage !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
									>
										<option value="All">All Years</option>
										<option value="2023">2023</option>
										<option value="2024">2024</option>
										<option value="2025">2025</option>
									</select>
								</div>
								<div className="col-1 px-1">
									<BiSolidHelpCircle 
										style={{  }}
										title="Filter hanya aktif ketika berada di page 1"
									/>
								</div>
							</div>
							{/* Filter End */}

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
									{currentItems.map((l) => (
										<tr key={l.id}>
											<td className="d-none d-md-table-cell">{moment(l.tanggal).format('DD-MM-YYYY')}</td>
											<td className="d-none d-xl-table-cell">{l.keterangan}</td>
											<td className="d-none d-md-table-cell">{l.budgetrule}</td>
											<td className="d-none d-md-table-cell">{l.category}</td>
											<td className="d-none d-xl-table-cell"><span className={l.transaction_type !== "Outcome" ? "badge bg-success" : "badge bg-danger"}>{formatRupiah(l.balance ? l.balance : l.nominal)}</span></td>
											<td className="d-none d-md-table-cell">{l.wallet ? l.wallet : 'Belum ditentukan'}</td>
										</tr>
									))}
								</tbody>
							</table>
							{/* Pagination buttons */}
							<div className="pagination mt-5">
								<button
									className="button"
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
								>
									Prev
								</button>
								<div>
									Page { currentPage } of { totalPages } Total Pages ({(itemsPerPage * (currentPage-1)) + 1} - {(itemsPerPage * (currentPage-1)) + 5 > filteredMonthlyRecap.length ? filteredMonthlyRecap.length : (itemsPerPage * (currentPage-1)) + 5} of {filteredMonthlyRecap.length})
								</div>
								<button
									className="button"
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Monthly Recap Table End */}
			</div>
    </>
  )
}

export default Dashboard
