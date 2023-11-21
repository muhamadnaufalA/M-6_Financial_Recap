import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";

const EditCategory = () => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    
    var [budgetruleid, setBudgetRuleId] = useState('');
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
        if (name.trim() === '' || budget === '' || budgetruleid === '') {
            Swal.fire({
              icon: 'error',
              title: 'Input Failed',
              text: 'Please fill in all fields',
              allowOutsideClick: false, // Prevent closing Swal on outside click
              confirmButtonText: 'OK',
            });
            return;
          }
        if (budgetruleid == null){
            budgetruleid = temp;
        }
        try{
            const respon = await axios.put(`http://localhost:5000/category/${id}`, {
                name: name,
                budget: parseInt(budget),
                budgetruleId: parseInt(budgetruleid),
                
            });
            if (respon.status === 200) {
                await Swal.fire({
                  icon: 'success',
                  title: 'Category Updated!',
                  text: respon.data.message,
                  allowOutsideClick: false, // Prevent closing Swal on outside click
                  confirmButtonText: 'OK',
                });
            } 
            history.push("/category");
        }catch (error){
            if(error.response.status === 400){
                Swal.fire({
                  icon: 'error',
                  title: 'Invalid Input!',
                  allowOutsideClick: false, // Prevent closing Swal on outside click
                  confirmButtonText: 'OK',
                });
                console.log(error);
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Category Failed Updated!',
                  allowOutsideClick: false, // Prevent closing Swal on outside click
                  confirmButtonText: 'OK',
                });
                console.log(error);
              }
            
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
    <section>
        <div className="card flex-fill">
            <div className="d-flex justify-content-start m-2">
                <Link to={`/category`} className="btn btn-sm btn-info">
                    <BiArrowBack style={{ fontSize: '20px', verticalAlign: 'middle' }} /> Back
                </Link>
            </div>
            <h1 className="h2 mb-3 text-center">
                <strong>Edit Category</strong>
            </h1>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <form onSubmit={UpdateCategory} className="box">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Nama atau Keterangan Category</label>
                                    <input
                                        className="form-control"
                                        style={{ backgroundColor: '#f7f7f7' }}
                                        type="text"
                                        placeholder="Nama atau Keterangan Category"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="budget">Budget</label>
                                    <input
                                        className="form-control"
                                        style={{ backgroundColor: '#f7f7f7' }}
                                        type="text"
                                        placeholder="Budget"
                                        value={formatRupiah(budget)}
                                        onChange={(e) => setBudget(e.target.value.replace(/\D/g, ''))}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="budgetruleid">Budget Rule</label>
                            <select
                                className="form-control"
                                style={{ backgroundColor: '#f7f7f7' }}
                                value={budgetruleid}
                                onChange={(e) => setBudgetRuleId(e.target.value)}
                                required
                            >
                                <option value={""}>Pilih budget rule</option>
                                {budgetRules.map((budgetRule) => (
                                    <option key={budgetRule.id} value={budgetRule.id}>
                                        {budgetRule.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mt-5 mb-3">
                            <button className="btn btn-success btn-block">Tambahkan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

        
    )
}

export default EditCategory;