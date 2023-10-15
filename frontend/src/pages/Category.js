import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link} from 'react-router-dom';

const Category = () => {
  const [categories, setCategory] = useState([]);
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [budgetruleid, setBudgetRuleId] = useState('');
  const [budgetRules, setListBudgetRule] = useState([]);

  const [msg, setMsg] = useState('');
  const history = useHistory();

  // Get UserId with Cookie
  const UserId = Cookies.get("userId");

  useEffect(()=>{
    getListCatFunc();
    getListBudgetRuleFunc();
  }, []);

  const getListCatFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/category`);
    setCategory(response.data);
  }

  const getListBudgetRuleFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`);
    setListBudgetRule(response.data);
  }

  const addCatFunc = async(e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:5000/users/${UserId}/category`,{
            name: name,
            budget: parseInt(budget),
            budgetruleId: parseInt(budgetruleid)
        });

        history.push("/dashboard");
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  const deleteCategory = async (id) => {
    try{
        await axios.delete(`http://localhost:5000/category/${id}`);
        getListCatFunc();
    } catch (error) {
        console.log(error);
    }
  }

  const formatRupiah = (angka) => {
    const numberFormat = new Intl.NumberFormat("id-ID");
    return `Rp. ${numberFormat.format(angka)}`;
  };

  return (
    <section className="hero has-background-white is-fullheight is-fullwidth">
      <h1 className="h2 mb-3 text-center">
          <strong>Category</strong>
      </h1>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <form onSubmit={addCatFunc} className="box">
                <p className="has-text-center">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Contoh: Kebutuhan Pribadi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Budget</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      placeholder="Contoh: 100000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Budget Rule</label>
                  <div className="control">
                    <select
                      className="input"
                      value={budgetruleid}
                      onChange={(e) => setBudgetRuleId(e.target.value)}
                    >
                      <option value="">Pilih budget rule</option>
                      {budgetRules.map((budgetRule) => (
                        <option key={budgetRule.id} value={budgetRule.id}>
                          {budgetRule.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">Tambahkan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL */}
      <div className="columns mt-5 is-centered">
        <div className="column">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Budget</th>
                <th>Budget Rule</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{formatRupiah(category.budget)}</td>
                  <td>{category.budgetrule.name}</td>
                  <td>
                    <Link to={`editCategory/${category.id}`} className="button is-small is-info">Edit</Link>
                    <button onClick={() => deleteCategory(category.id)} className="button is-small is-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
  
}

export default Category