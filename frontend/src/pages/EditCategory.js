import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditCategory = () => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    
    const [budgetruleid, setBudgetRuleId] = useState('');
    const [budgetruleName, setBudgetRuleName] = useState('');
    const [budgetRules, setListBudgetRule] = useState([]);

    const {id} = useParams();
    const UserId = Cookies.get("userId");
    const history = useHistory();

    var temp;

    useEffect(() => {
        getCatById();
        getListBudgetRuleFunc();
    }, []);
    
    const UpdateCategory = async (e) =>{
        e.preventDefault();
        if (budgetruleid == null){
            budgetruleid = temp;
        }
        try{
            await axios.put(`http://localhost:5000/category/${id}`, {
                name: name,
                budget: parseInt(budget),
                budgetruleId: parseInt(budgetruleid),
                
            });
            history.push("/dashboard");
        }catch (error){
            console.log(error);
        }
    };

    const getCatById = async () => {
        const response = await axios.get(`http://localhost:5000/category/${id}`);
        setName(response.data.name);
        setBudget(response.data.budget);
        setBudgetRuleName(response.data.budgetrule.name);

        temp = setBudgetRuleId(response.data.budgetruleId);
    }

    const getListBudgetRuleFunc = async () =>{
        const response = await axios.get(`http://localhost:5000/users/${UserId}/budgetrule`);
        setListBudgetRule(response.data);
    }

    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID");
        return `Rp. ${numberFormat.format(angka)}`;
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={UpdateCategory}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value={name} 
                            onChange={(e)=> setName(e.target.value)}
                            placeholder='Contoh: Kebutuhan Pribadi'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Budget</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input"                         
                            value={formatRupiah(budget)}
                            onChange={(e) => setBudget(e.target.value.replace(/\D/g, ''))}/>
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
                            {/* <option value="">Pilih budget rule</option> */}
                            {budgetRules.map((budgetRule) => (
                                <option key={budgetRule.id} value={budgetRule.id}>
                                {budgetRule.name}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <button type='submit' className='button is-success'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory;