import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams, Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { BiSolidHelpCircle } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";

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
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/users/${UserId}/budgetrule`);
    setBudgetRules(response.data);
  }

  const getBudgetRuleById = async () => {
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/budgetrule/${id}`);
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
        await axios.put(`https://api-nabugyuk.agilearn.id/budgetrule/${id}`, {
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
        <div className="d-flex justify-content-start m-2">
          <Link to={`/budgetrule`} className="btn btn-sm btn-info">
              <BiArrowBack style={{ fontSize: '20px', verticalAlign: 'middle' }} /> Back
          </Link>
        </div>
        <h1 className="h2 text-center">
            <strong>Edit Budget Rule</strong>
        </h1>
        <div className="row justify-content-center">
            <div className="col-md-5 p-5">
                <form onSubmit={updateBudgetRule} className="box">
                    <p className="text-center text-danger">{message}</p>
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Budget Rule Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e)=>
                                setName(e.target.value)}
                                placeholder="Budget Rule Name"
                                />
                            </div>
                        </div>
                        <div className="col-md-7 row">
                            <div className="form-group col-9">
                                <label htmlFor="percentage" className="form-label">Percentage</label>
                                <input type="number" className="form-control" id="percentage" value={percentage}
                                    onChange={(e)=> setPercentage(e.target.value)}
                                placeholder="Percentage"
                                />
                            </div>
                            <div className="col-2 d-flex align-items-center">
                                <BiSolidHelpCircle style={{ marginLeft: -10 }} title="Persentase dari Total Pemasukan" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3 d-flex justify-content-start">
                        <button className="btn btn-lg btn-success">Tambahkan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditBudgetRule;