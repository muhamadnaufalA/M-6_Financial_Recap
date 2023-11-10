import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";
import moment from 'moment';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

function Dashboard() {

	const UserId = Cookies.get("userId");
	const [Recap, setRecap] = useState([]);
	const [budgetRules, setBudgetRules] = useState([]);
	const [budgetRulesActual, setBudgetRulesActual] = useState([]);
	const [budgetRuleList, setBudgetRuleList] = useState([]);
  	const [categoryList, setCategoryList] = useState([]);

	useEffect(()=>{
		getRecap(); 
		getBudgetRulesTarget();
		getBudgetRulesActual();
		getListBudgetRuleFunc();
    getListCategoryFunc(); 
	}, []);

    const getRecap = async () => {
        const response = await axios.get(`http://localhost:5000/users/${UserId}/recap`);
        setRecap(response.data);
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
	
	const today = new Date();
	const date = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
  	let formattedDate;
	if (date < 10){
		 formattedDate = `${year}-${month}-0${date}`;
	}else{
		formattedDate = `${year}-${month}-${date}`;
	}

	// Filter and Pagination Daily Recap Start //
	const [selectedCategoryDaily, setselectedCategoryDaily] = useState("All");
	const [selectedBudgetRuleDaily, setselectedBudgetRuleDaily] = useState("All");
	const [selectedDate, setSelectedDate] = useState(formattedDate);
	const [selectedTransactionDaily, setselectedTransactionDaily] = useState("All");
	const [currentPageDaily, setcurrentPageDaily] = useState(1);
	const itemsPerPageDaily = 5;

	let parts = selectedDate.split('-');

	const indexOfLastItemDaily = currentPageDaily * itemsPerPageDaily;
	const indexOfFirstItemDaily = indexOfLastItemDaily - itemsPerPageDaily;
	const currentItemsDaily = Recap
		.filter((recap) => {
			const transactionMatchDaily = selectedTransactionDaily === "All" || recap.transaction_type === selectedTransactionDaily;
			const categoryMatchDaily = selectedCategoryDaily === "All" || recap.category === selectedCategoryDaily;
			const budgetRuleMatchDaily = selectedBudgetRuleDaily === "All" || recap.budgetrule === selectedBudgetRuleDaily;
			const dateMatchDaily = parseInt(new Date(recap.tanggal).getDate(), 10) === parseInt(parts[2], 10);
			const monthMatchDaily = parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(parts[1], 10);
      		const yearMatchDaily = parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(parts[0], 10);
			return transactionMatchDaily && categoryMatchDaily && budgetRuleMatchDaily && dateMatchDaily && monthMatchDaily && yearMatchDaily;
		})
		.slice(indexOfFirstItemDaily, indexOfLastItemDaily);

	const filteredDailyRecap = Recap.filter((recap) => {
		const transactionMatchDaily = selectedTransactionDaily === "All" || recap.transaction_type === selectedTransactionDaily;
		const categoryMatchDaily = selectedCategoryDaily === "All" || recap.category === selectedCategoryDaily;
		const budgetRuleMatchDaily = selectedBudgetRuleDaily === "All" || recap.budgetrule === selectedBudgetRuleDaily;
		const dateMatchDaily = parseInt(new Date(recap.tanggal).getDate(), 10) === parseInt(parts[2], 10);
		const monthMatchDaily = parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(parts[1], 10);
		const yearMatchDaily = parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(parts[0], 10);
		return transactionMatchDaily && categoryMatchDaily && budgetRuleMatchDaily && dateMatchDaily && monthMatchDaily && yearMatchDaily;
	});
	
	const totalPagesDaily = Math.ceil(filteredDailyRecap.length / itemsPerPageDaily);
	const handlePageChangeDaily = (newPage) => {
		if (newPage >= 1 && newPage <= totalPagesDaily) {
				setcurrentPageDaily(newPage);
		}
	};

	// Filter and Pagination Monthly Recap Start //
	const [selectedCategoryMonthly, setSelectedCategoryMonthly] = useState("All");
	const [selectedBudgetRuleMonthly, setSelectedBudgetRuleMonthly] = useState("All");
	const [selectedMonthMonthly, setSelectedMonthMonthly] = useState(month);
  	const [selectedYearMonthly, setSelectedYearMonthly] = useState(year);
	const [selectedTransactionMonthly, setSelectedTransactionMonthly] = useState("All");
	const [currentPageMonthly, setCurrentPageMonthly] = useState(1);
	const itemsPerPageMonthly = 5;

	const indexOfLastItemMonthly = currentPageMonthly * itemsPerPageMonthly;
	const indexOfFirstItemMonthly = indexOfLastItemMonthly - itemsPerPageMonthly;
	const currentItemsMonthly = Recap
		.filter((recap) => {
			const transactionMatchMonthly = selectedTransactionMonthly === "All" || recap.transaction_type === selectedTransactionMonthly;
			const categoryMatchMonthly = selectedCategoryMonthly === "All" || recap.category === selectedCategoryMonthly;
			const budgetRuleMatchMonthly = selectedBudgetRuleMonthly === "All" || recap.budgetrule === selectedBudgetRuleMonthly;
			const monthMatchMonthly = selectedMonthMonthly === "All" || parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(selectedMonthMonthly, 10);
      		const yearMatchMonthly = selectedYearMonthly === "All" || parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(selectedYearMonthly, 10);
			return transactionMatchMonthly && categoryMatchMonthly && budgetRuleMatchMonthly && monthMatchMonthly && yearMatchMonthly;
		})
		.slice(indexOfFirstItemMonthly, indexOfLastItemMonthly);

	const filteredMonthlyRecap = Recap.filter((recap) => {
		const transactionMatchMonthly = selectedTransactionMonthly === "All" || recap.transaction_type === selectedTransactionMonthly;
		const categoryMatchMonthly = selectedCategoryMonthly === "All" || recap.category === selectedCategoryMonthly;
		const budgetRuleMatchMonthly = selectedBudgetRuleMonthly === "All" || recap.budgetrule === selectedBudgetRuleMonthly;
		const monthMatchMonthly = selectedMonthMonthly === "All" || parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(selectedMonthMonthly, 10);
    	const yearMatchMonthly = selectedYearMonthly === "All" || parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(selectedYearMonthly, 10);
		return transactionMatchMonthly && categoryMatchMonthly && budgetRuleMatchMonthly && monthMatchMonthly && yearMatchMonthly;
	});
	
	const totalPagesMonthly = Math.ceil(filteredMonthlyRecap.length / itemsPerPageMonthly);
	const handlePageChangeMonthly = (newPage) => {
		if (newPage >= 1 && newPage <= totalPagesMonthly) {
				setCurrentPageMonthly(newPage);
		}
	};

	function getDaysInMonth(year, month) {
		const daysInMonth = new Date(year, month, 0).getDate();
		const daysArray = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
		return daysArray;
	}
	  
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
						<div className="box">
							{/* Filter Start */}
							<div className="d-flex mb-5" style={{ width: "100%" }}>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedTransactionDaily}
										onChange={(e) => setselectedTransactionDaily(e.target.value)}
										disabled={currentPageDaily !== 1}
										title={currentPageDaily !== 1 ? "Kembali ke page awal untuk memilih jenis transaksi" : ""}
									>
										<option value="All">All Transactions</option>
										<option value="Income">Income</option>
										<option value="Outcome">Outcome</option>
									</select>
								</div>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedBudgetRuleDaily}
										onChange={(e) => setselectedBudgetRuleDaily(e.target.value)}
										disabled={currentPageDaily !== 1}
										title={currentPageDaily !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
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
										value={selectedCategoryDaily}
										onChange={(e) => setselectedCategoryDaily(e.target.value)}
										disabled={currentPageDaily !== 1}
										title={currentPageDaily !== 1 ? "Kembali ke page awal untuk memilih category" : ""}
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
									<input
										type="date"
										className="input"
										value={selectedDate}
										onChange={(e) => setSelectedDate(e.target.value)}
										disabled={currentPageDaily !== 1}
										title={currentPageDaily !== 1 ? "Kembali ke page awal untuk memilih jenis transaksi" : ""}
									/>
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
									{currentItemsDaily.map((l) => (
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
									onClick={() => handlePageChangeDaily(currentPageDaily - 1)}
									disabled={currentPageDaily === 1}
								>
									Prev
								</button>
								<div>
									Page { currentPageDaily } of { totalPagesDaily } Total Pages ({(itemsPerPageDaily * (currentPageDaily-1)) + 1} - {(itemsPerPageDaily * (currentPageDaily-1)) + 5 > filteredDailyRecap.length ? filteredDailyRecap.length : (itemsPerPageDaily * (currentPageDaily-1)) + 5} of {filteredDailyRecap.length})
								</div>
								<button
									className="button"
									onClick={() => handlePageChangeDaily(currentPageDaily + 1)}
									disabled={currentPageDaily === totalPagesDaily}
								>
									Next
								</button>
							</div>
						</div>
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
										value={selectedTransactionMonthly}
										onChange={(e) => setSelectedTransactionMonthly(e.target.value)}
										disabled={currentPageMonthly !== 1}
										title={currentPageMonthly !== 1 ? "Kembali ke page awal untuk memilih jenis transaksi" : ""}
									>
										<option value="All">All Transactions</option>
										<option value="Income">Income</option>
										<option value="Outcome">Outcome</option>
									</select>
								</div>
								<div className="col-2 px-1">
									<select
										className="form-control mr-2"
										value={selectedBudgetRuleMonthly}
										onChange={(e) => setSelectedBudgetRuleMonthly(e.target.value)}
										disabled={currentPageMonthly !== 1}
										title={currentPageMonthly !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
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
										value={selectedCategoryMonthly}
										onChange={(e) => setSelectedCategoryMonthly(e.target.value)}
										disabled={currentPageMonthly !== 1}
										title={currentPageMonthly !== 1 ? "Kembali ke page awal untuk memilih category" : ""}
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
										value={selectedMonthMonthly}
										onChange={(e) => setSelectedMonthMonthly(e.target.value)}
										disabled={currentPageMonthly !== 1}
										title={currentPageMonthly !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
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
										value={selectedYearMonthly}
										onChange={(e) => setSelectedYearMonthly(e.target.value)}
										disabled={currentPageMonthly !== 1}
										title={currentPageMonthly !== 1 ? "Kembali ke page awal untuk memilih budget rule" : ""}
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
									{currentItemsMonthly.map((l) => (
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
									onClick={() => handlePageChangeMonthly(currentPageMonthly - 1)}
									disabled={currentPageMonthly === 1}
								>
									Prev
								</button>
								<div>
									Page { currentPageMonthly } of { totalPagesMonthly } Total Pages ({(itemsPerPageMonthly * (currentPageMonthly-1)) + 1} - {(itemsPerPageMonthly * (currentPageMonthly-1)) + 5 > filteredMonthlyRecap.length ? filteredMonthlyRecap.length : (itemsPerPageMonthly * (currentPageMonthly-1)) + 5} of {filteredMonthlyRecap.length})
								</div>
								<button
									className="button"
									onClick={() => handlePageChangeMonthly(currentPageMonthly + 1)}
									disabled={currentPageMonthly === totalPagesMonthly}
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
