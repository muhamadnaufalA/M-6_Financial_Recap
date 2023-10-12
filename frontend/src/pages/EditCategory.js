import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';

const EditCategory = () => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        getCatById();
    }, []);
    
    const UpdateCategory = async (e) =>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:5000/category/${id}`, {
                name: name,
                budget: parseInt(budget)
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
    }

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
                            type="number" 
                            className="input"                         
                            value={budget} 
                            onChange={(e)=> setBudget(e.target.value)}
                            placeholder='Contoh: 100000'/>
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