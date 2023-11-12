import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";
import { BiWallet } from 'react-icons/bi';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';
import { GiPayMoney } from "react-icons/gi";
import moment from 'moment';

function Dashboard() {

	const UserId = Cookies.get("userId");
	const [recap, setRecap] = useState([]);
	const [budgetRules, setBudgetRules] = useState([]);
	const [budgetRulesActual, setBudgetRulesActual] = useState([]);
	const [budgetRuleList, setBudgetRuleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
	const [wallets, setWallets] = useState([]);
	const [incomes, setIncomes] = useState([]);
	const [outcomes, setOutcomes] = useState([]);

	useEffect(()=>{
		getRecap(); 
		getBudgetRulesTarget();
		getBudgetRulesActual();
		getListBudgetRuleFunc();
    getListCategoryFunc();
		getWalletsFunc();
		getIncomesFunc();
		getOutcomesFunc();
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

	const getWalletsFunc = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/wallets`)
		setWallets(response.data)
	}

	const getIncomesFunc = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/incomes`)
		setIncomes(response.data)
	}

	const getOutcomesFunc = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/outcomes`)
		setOutcomes(response.data)
	}

	const formatRupiah = (angka) => {
		const numberFormat = new Intl.NumberFormat("id-ID");
		return `Rp${numberFormat.format(angka)},00`;
  };
	
	const today = new Date();
	const date = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	console.log(budgetRulesActual)

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
	const currentItemsMonthly = recap
		.filter((recap) => {
			const transactionMatchMonthly = selectedTransactionMonthly === "All" || recap.transaction_type === selectedTransactionMonthly;
			const categoryMatchMonthly = selectedCategoryMonthly === "All" || recap.category === selectedCategoryMonthly;
			const budgetRuleMatchMonthly = selectedBudgetRuleMonthly === "All" || recap.budgetrule === selectedBudgetRuleMonthly;
			const monthMatchMonthly = selectedMonthMonthly === "All" || parseInt(new Date(recap.tanggal).getMonth() + 1, 10) === parseInt(selectedMonthMonthly, 10);
      const yearMatchMonthly = selectedYearMonthly === "All" || parseInt(new Date(recap.tanggal).getFullYear(), 10) === parseInt(selectedYearMonthly, 10);
			return transactionMatchMonthly && categoryMatchMonthly && budgetRuleMatchMonthly && monthMatchMonthly && yearMatchMonthly;
		})
		.slice(indexOfFirstItemMonthly, indexOfLastItemMonthly);

	const filteredMonthlyRecap = recap.filter((recap) => {
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
	// Filter and Pagination Monthly Recap End //

	// Card Saldo Start
	const [selectedWallet, setSelectedWallet] = useState("All");
	const [isShown, setIsShown] = useState(true);
  const handleClick = () => {
    setIsShown(!isShown);
  };

	const filteredWallet = wallets
		.filter((wallet) => {
			const walletMatch = selectedWallet === "All" || wallet.name === selectedWallet;
			return walletMatch;
		})

	let totalSaldo = 0;
	filteredWallet.forEach((wallet) => {
		totalSaldo += wallet.balance;
	});
	// Card Saldo End

	// Catatan Keuangan Start
	const [selectedBudgetRule, setSelectedBudgetRule] = useState("All");
	const [selectedCategory, setSelectedCategory] = useState("All");
	
	const filteredOutcomes = recap.filter((r) => {
		let tanggal = new Date(r.tanggal);
		const monthMatch = tanggal.getMonth() + 1 === month;
		const budgetRuleMatch = selectedBudgetRule === "All" || r.budgetrule === selectedBudgetRule;
		const categoryMatch = selectedCategory === "All" || r.category === selectedCategory;
		const transactionMatch = r.transaction_type === "Outcome";
		return monthMatch && budgetRuleMatch && categoryMatch && transactionMatch;
	})

	let totalOutcome = 0;
	filteredOutcomes.forEach((outcome) => {
		totalOutcome += outcome.nominal;
	});	

	// Catatan Keuangan End

	// Outcome Target and Actual
	const filteredIncomes = incomes.filter((income) => {
		let tanggal = new Date(income.tanggal_pemasukan);
		const monthMatch = tanggal.getMonth() + 1 === month;
		return monthMatch;
	})

	let totalIncome = 0;
	filteredIncomes.forEach((income) => {
		totalIncome += income.balance;
	});

	let nominalBudgetList = []
	budgetRules.map((br) => {
		let nominal = (br.percentage / 100) * totalIncome;
		let newItem = { budgetRule: br.name, nominal: nominal };
  	nominalBudgetList.push(newItem);
	})

	let nominalBudget = 0
	if( selectedCategory === "All" ) {
		if( selectedBudgetRule !== "All" ) {
			nominalBudgetList.map((n) => {
				if( n.budgetRule === selectedBudgetRule ) {
					nominalBudget = n.nominal
				}
			})
		} else {
			nominalBudget = totalIncome
		}
	} else {
		categoryList.map((c) => {
			if( c.name === selectedCategory ) {
				nominalBudget = c.budget
			}
		})
	}

	let percentageOutcome = totalOutcome/totalIncome*100;

	const filteredCategory = categoryList.filter((c) => {
		const categoryMatch = selectedCategory === "All" || c.name === selectedCategory;
		return categoryMatch;
	})

	console.log(filteredCategory)

	
  return (
    <>
			<h1 className="h3 mb-3">
				Dashboard
			</h1>
			<div className="row">
				{/* Saldo Start */}
				<div className="col-6 col-lg-6 col-xxl-6 d-flex">
					<div className="card flex-fill">
						<div className="card-header">
							<h5 className="card-title mb-0">Saldo</h5>
						</div>
						<div>
							<div className="col-4 p-3">
								<select
									className="form-control mr-2"
									value={selectedWallet}
									onChange={(e) => setSelectedWallet(e.target.value)}
								>
									<option value="All">All Wallets</option>
									{wallets.map((wallet) => (
										<option key={wallet.id} value={wallet.name}>
												{wallet.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="d-flex align-items-center justify-content-center my-3">
							<BiWallet className="mx-3" style={{ fontSize: '45px' }} />
							{isShown ? (
								<span className="fs-2 fw-bold font-monospace">{formatRupiah(totalSaldo)}</span>
							) : (
								<span className="fs-2 fw-bold font-monospace">Rp **********</span>
							)}
							
							{isShown ? (
								<BiSolidShow className="fs-1 mx-3" onClick={handleClick} />
							) : (
								<BiSolidHide className="fs-1 mx-3" onClick={handleClick} />
							)}
						</div>
					</div>
				</div>
				{/* Saldo End */}
				{/* Catatan Keuangan Start */}
				<div className="col-6 col-lg-6 col-xxl-6 d-flex">
					<div className="card flex-fill">
						<div className="card-header">
							<h5 className="card-title mb-0">Catatan Keuangan</h5>
						</div>
						<div className="row p-3">
							<div className="col-6">
								<select
									className="form-control mr-2"
									value={selectedBudgetRule}
									onChange={(e) => setSelectedBudgetRule(e.target.value)}
								>
									<option value="All">All Budget Rule</option>
									{budgetRuleList.map((budget) => (
										<option key={budget.id} value={budget.name}>
												{budget.name}
										</option>
									))}
								</select>
							</div>
							<div className="col-6">
								<select
									className="form-control mr-2"
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
								>
									<option value="All">All Categories</option>
									{categoryList.map((category) => (
										<option key={category.id} value={category.name}>
												{category.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="d-flex align-items-center justify-content-center my-3 row text-center">
							<div>
								<GiPayMoney className="fs-1 mx-3" />
								<span className="fs-3 fw-bold font-monospace">{formatRupiah(totalOutcome)} [{percentageOutcome.toFixed(2)} %]</span>
							</div>
							<div>
								<GiPayMoney className="fs-1 mx-3" />
								<span className="fs-3 fw-bold font-monospace">HEMAT {formatRupiah(nominalBudget - totalOutcome)}</span>
							</div>
						</div>
					</div>
				</div>
				{/* Catatan Keuangan End */}
				{/* Outcome Target */}
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
									<th>Nominal</th>
								</tr>
							</thead>
							<tbody>
								{budgetRules.map((budgetRule) => (
									<tr key={budgetRule.id}>
										<td className="d-none d-md-table-cell">{budgetRule.name}</td>
										<td className="d-none d-md-table-cell">{budgetRule.percentage}%</td>
										<td className="d-none d-md-table-cell">{formatRupiah(budgetRule.percentage/100*totalIncome)}</td>
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
								{budgetRulesActual.map((budgetRuleActual, i) => (
									<tr key={budgetRuleActual.id}>
										<td className="d-none d-md-table-cell">{budgetRuleActual.name}</td>
										<td className="d-none d-md-table-cell">{formatRupiah(budgetRuleActual.totalPengeluaran)}</td>
										<td className="d-none d-md-table-cell">{(budgetRuleActual.totalPengeluaran / totalIncome * 100).toFixed(2)}%</td>
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
