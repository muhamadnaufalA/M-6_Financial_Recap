import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiSolidHelpCircle } from "react-icons/bi";

export default function OutcomeTable() {
    const UserId = Cookies.get("userId");
    const [outcomes, setOutcome] = useState([]);
    const [budgetRules, setBudgetRule] = useState([]);
    const [categories, setCategory] = useState([]);

    useEffect(()=>{
        getListOutcomeFunc();
        getListBudgetRuleFunc();
        getListCategoryFunc(); 
    }, []);

    const getListOutcomeFunc = async () => {
        const response = await axios.get(`http://localhost:5000/users/${UserId}/outcomes`);
        setOutcome(response.data);
    }

    const getListBudgetRuleFunc = async () => {
        const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`)
        setBudgetRule(response.data);
    }

    const getListCategoryFunc = async () => {
        const response = await axios.get(`http://localhost:5000/users/${UserId}/category`)
        setCategory(response.data);
    }

    const deleteOutcome = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/Outcomes/${id}`);
            getListOutcomeFunc();
        } catch (error) {
            console.log(error);
        }
    }

    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID");
        return `Rp${numberFormat.format(angka)}`;
    };

    // Filter and Pagination
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedBudgetRule, setSelectedBudgetRule] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = outcomes
        .filter((outcome) => {
            const categoryMatch = selectedCategory === "All" || outcome.category?.name === selectedCategory;
            const budgetRuleMatch = selectedBudgetRule === "All" || outcome.budgetrule?.name === selectedBudgetRule;
            return categoryMatch && budgetRuleMatch;
        })
        .slice(indexOfFirstItem, indexOfLastItem);

    const filteredOutcomes = outcomes.filter((outcome) => {
        const categoryMatch = selectedCategory === "All" || outcome.category?.name === selectedCategory;
        const budgetRuleMatch = selectedBudgetRule === "All" || outcome.budgetrule?.name === selectedBudgetRule;
        return categoryMatch && budgetRuleMatch;
    });
    
    const totalPages = Math.ceil(filteredOutcomes.length / itemsPerPage);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <section className="card flex-fill">
  <div className="card-header">
    <h5 className="card-title mb-0">Outcome Table</h5>
  </div>
  {/* Tabel Start */}
  <div className="card-body">

    {/* Filter Start */}
    <div className="d-flex mb-5" style={{ width: "50%" }}>
      <div className="col-6 px-1">
        <select
          className="form-select mr-2 cursor-pointer"
          value={selectedBudgetRule}
          onChange={(e) => setSelectedBudgetRule(e.target.value)}
          disabled={currentPage !== 1}
          title={currentPage !== 1 ? "Kembali ke page pertama untuk memilih budget rule" : ""}
        >
          <option value="All">All Budget Rules</option>
          {budgetRules.map((budgetRule) => (
            <option key={budgetRule.id} value={budgetRule.name}>
              {budgetRule.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6 px-1">
        <select
          className="form-select cursor-pointer"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={currentPage !== 1}
          title={currentPage !== 1 ? "Kembali ke page pertama untuk memilih category" : ""}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    {/* Filter End */}

    <table className="table table-hover my-0">
      <thead>
        <tr>
          <th style={{ width: '12%' }}>Tanggal</th>
          <th style={{ width: '15%' }}>Keterangan</th>
          <th style={{ width: '15%' }}>Nominal</th>
          <th style={{ width: '15%' }}>Budget Rule</th>
          <th style={{ width: '15%' }}>Category</th>
          <th style={{ width: '12%' }}>Wallet</th>
          <th className="text-center" style={{ width: '12%' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((outcome) => (
          <tr key={outcome.id}>
            <td>{moment(outcome.tanggal_pengeluaran).format('DD-MM-YYYY')}</td>
            <td>{outcome.name}</td>
            <td>{formatRupiah(outcome.nominal)}</td>
            <td>{outcome.budgetrule ? outcome.budgetrule.name : 'Belum ditentukan'}</td>
            <td>{outcome.category ? outcome.category.name : 'Belum ditentukan'}</td>
            <td>{outcome.wallet ? outcome.wallet.name : 'Belum ditentukan'}</td>
            <td className="text-center">
              <Link to={`edit-outcome/${outcome.id}`} className="btn btn-sm btn-info me-2">
                <BiEdit style={{ fontSize: '20px', verticalAlign: 'middle' }} />
              </Link>
              <button onClick={() => deleteOutcome(outcome.id)} className="btn btn-sm btn-danger">
                <BiTrash style={{ fontSize: '20px', verticalAlign: 'middle' }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* Pagination buttons */}
    <div className="d-flex justify-content-between align-items-center mt-5">
      <button
        className="btn btn-primary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <div>
        Page {currentPage} of {totalPages} Total Pages ({(itemsPerPage * (currentPage - 1)) + 1} - {(itemsPerPage * (currentPage - 1)) + 5 > filteredOutcomes.length ? filteredOutcomes.length : (itemsPerPage * (currentPage - 1)) + 5} of {filteredOutcomes.length})
      </div>
      <button
        className="btn btn-primary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  {/* Tabel End */}
</section>

    )
}
