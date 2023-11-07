import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Swal from "sweetalert2";

const EditWallet = () => {
  const [name, setName] = useState('');
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    getWalletById();

  }, []);

  const getWalletById = async () => {
    const response = await axios.get(`http://localhost:5000/wallets/${id}`);
    setName(response.data.name);
  }

  const UpdateWallet = async (e) =>{
    e.preventDefault();
    if (name === '') {
      Swal.fire({
        icon: 'error',
        title: 'Input Failed',
        text: 'Please fill in all fields',
        allowOutsideClick: false, // Prevent closing Swal on outside click
        confirmButtonText: 'OK',
      });
      return;
    }
    try{
        const respon = await axios.patch(`http://localhost:5000/wallets/${id}`, {
            name
        });
        if (respon.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Wallet Updated!',
            text: respon.data.message,
            allowOutsideClick: false, // Prevent closing Swal on outside click
            confirmButtonText: 'OK',
          });
      } 
        history.push("/wallet");
    }catch (error){
        console.log(error);
    }
  };

  return (
    <section className="hero has-background-white  is-fullwidth">
        <h1 className="h2 mb-5 text-center">
            <strong>Edit Wallet</strong>
        </h1>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column">
               <form onSubmit={UpdateWallet}>
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
                        <button type='submit' className='button is-success '>
                            Update
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditWallet;