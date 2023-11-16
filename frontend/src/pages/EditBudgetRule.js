import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";

const EditBudgetRule = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [budgetRules, setBudgetRules] = useState([]);
  const UserId = Cookies.get("userId");
  const {id} = useParams();
  let [budgetRuleId, setBudgetRuleId] = useState('');
  let temp;

  useEffect(() => {
    getBudgetRuleById();
    getBudgetRulesFunc();
  }, []);

  const getBudgetRulesFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`);
    setBudgetRules(response.data);
  }

  const getBudgetRuleById = async () => {
    const response = await axios.get(`http://localhost:5000/budgetrule/${id}`);
    setName(response.data.name);
    setPercentage(response.data.percentage);

    temp = setBudgetRuleId(response.data.budgetruleId);
  }

  const updateBudgetRule = async (e) =>{
    e.preventDefault();
    if (budgetRuleId == null) {
      budgetRuleId = temp;
    }

    try {
        await axios.put(`http://localhost:5000/budgetrule/${id}`, {
          name,
          percentage: parseInt(percentage)
        });
        history.push("/budgetrule");
    } catch(error) {
      setMessage(error.response.data.message);
    }
    // history.push("/budgetrule");
  };

  return (
    <div className="card flex-fill">
      <div className="card-header">
        <h5 className="card-title mb-0">Edit Budget Rule</h5>
      </div>
      <div className="row justify-content-center">
        <div className="col-5 p-5">
          <form onSubmit={updateBudgetRule} className="box">
            <p className="has-text-center has-text-danger">{message}</p>
            <div className="row">
              <div className="col-md-5">
                <div className="control">
                  <input 
                    type="text" 
                    className="input" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)}
                    placeholder='Budget Rule Name'
                  />
                </div>
              </div>
              <div className="col-md-7 row">
                <div className="control col-9">
                  <input 
                    type="number" 
                    className="input" 
                    value={percentage} 
                    onChange={(e)=> setPercentage(e.target.value)}
                    placeholder='Percentage'
                  />
                </div>
                <div className="col-2 d-flex align-items-center">
                  <BiSolidHelpCircle 
                    style={{ marginLeft: -10 }}
                    title="Persentase dari Total Pemasukan"
                  />
                </div>
              </div>
            </div>
            <div className="field mt-3 d-flex justify-content-start">
              <button className="btn btn-lg btn-success">Tambahkan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBudgetRule;