import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiWallet } from 'react-icons/bi';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';
import { GiPayMoney } from "react-icons/gi";

function Dashboard() {

	const UserId = Cookies.get("userId");
	const [recap, setRecap] = useState([]);
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
	const month = today.getMonth() + 1;

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

	console.log(totalIncome)

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

	let percentageOutcome = 0;
	if( totalIncome > 0 && totalOutcome > 0 ) {
		percentageOutcome = totalOutcome/totalIncome*100;
	}

	let selectedBudgetRuleId = 0
	budgetRuleList.map((b) => {
		if( b.name === selectedBudgetRule ) {
			selectedBudgetRuleId = b.id
		}
	})

	const filteredCategory = categoryList.filter((c) => {
		const budgetRuleMatch = selectedBudgetRule === "All" || c.budgetruleId === selectedBudgetRuleId;
		return budgetRuleMatch;
	})
	
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
									{filteredCategory.map((category) => (
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
							<div className="py-3">
								{totalOutcome === 0 ? (
									<span className="fs-4 fw-bold font-monospace">
										Belum ada pengeluaran bulan ini
									</span>
								) : (
									totalOutcome > nominalBudget ? (
										<span className="fs-4 fw-bold font-monospace">
											Bulan ini kamu boros sebesar {formatRupiah(totalOutcome - nominalBudget)}
										</span>
									) : (
										<span className="fs-4 fw-bold font-monospace">
											Bulan ini kamu hemat sebesar {formatRupiah(nominalBudget - totalOutcome)}
										</span>
									)
								)}
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
			</div>
    </>
  )
}

export default Dashboard