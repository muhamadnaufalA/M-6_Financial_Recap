import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";
import moment from 'moment';

function Recap() {
    const UserId = Cookies.get("userId");
    const [recap, setRecap] = useState([]);
    const [budgetRuleList, setBudgetRuleList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(()=>{
        getRecap(); 
        getListBudgetRuleFunc();
    	getListCategoryFunc();
    }, [])

    const getRecap = async () => {
		const response = await axios.get(`http://localhost:5000/users/${UserId}/recap`);
		setRecap(response.data);
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
		return `Rp${numberFormat.format(angka)},00`;
    }

    const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

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

    return (
        <>
            <h1 className="h3 mb-3">
                Recap
            </h1>
            <div className="row">
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
            </div>
        </>
        
    )
}

export default Recap