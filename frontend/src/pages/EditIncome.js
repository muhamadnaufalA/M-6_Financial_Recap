import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';

const EditIncome = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [tanggal_pemasukan, setTanggalPemasukan] = useState("");
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    getIncomeById();
  }, []);

  const UpdateIncome = async (e) =>{
    e.preventDefault();
    try{
        await axios.patch(`http://localhost:5000/incomes/${id}`, {
            name,
            balance: parseInt(balance),
            tanggal_pemasukan
        });
        history.push("/dashboard");
    }catch (error){
        console.log(error);
    }
  };

  const getIncomeById = async () => {
    const response = await axios.get(`http://localhost:5000/incomes/${id}`);
    setName(response.data.name);
    setBalance(response.data.balance);
    setTanggalPemasukan(response.data.tanggal_pemasukan);
  }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={UpdateIncome}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Contoh: Gaji Pokok'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Balance</label>
                    <div className="control">
                        <input 
                        type="number" 
                        className="input"                         
                        value={balance} 
                        onChange={(e)=> setBalance(e.target.value)}
                        placeholder='Contoh: 100000'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tanggal Pemasukan</label>
                    <div className="control">
                        <input 
                        type="date" 
                        className="input"                         
                        value={tanggal_pemasukan} 
                        onChange={(e)=> setTanggalPemasukan(e.target.value)}
                        />
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

export default EditIncome;
