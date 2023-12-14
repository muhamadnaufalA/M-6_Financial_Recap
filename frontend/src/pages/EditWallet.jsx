import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";

const EditWallet = () => {
  const [name, setName] = useState('');
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    getWalletById();

  }, []);

  const getWalletById = async () => {
    const response = await axios.get(`https://api-nabugyuk.agilearn.id/wallets/${id}`);
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
        const respon = await axios.patch(`https://api-nabugyuk.agilearn.id/wallets/${id}`, {
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
    <div className="container">
      <div className="d-flex justify-content-start m-2">
        <Link to={`/wallet`} className="btn btn-sm btn-info">
            <BiArrowBack style={{ fontSize: '20px', verticalAlign: 'middle' }} /> Back
        </Link>
      </div>
        <h1 className="h2 mb-3 text-center">
            <strong>Edit Wallet</strong>
        </h1>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={UpdateWallet} className="card p-4">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e)=>
                        setName(e.target.value)}
                        placeholder='Contoh: BRI'
                        />
                    </div>
                    <div className="mb-3 text-end">
                        <button type='submit' className='btn btn-success'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditWallet;