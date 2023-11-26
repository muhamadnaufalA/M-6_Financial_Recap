import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";

const EditIncome = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [tanggal_pemasukan, setTanggalPemasukan] = useState("");
  var [idWallet, setWalletId] = useState('');
  const [walletName, setWalletName] = useState('');
  const {id} = useParams();
  const history = useHistory();
  const [wallets, setListWallet] = useState([]);
  const UserId = Cookies.get("userId");

  var temp;

  useEffect(() => {
    getIncomeById();
    getListWalletFunc();
  }, []);

  const getListWalletFunc = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${UserId}/wallets`);
    setListWallet(response.data);
  }

  const UpdateIncome = async (e) =>{
    e.preventDefault();
    if (idWallet == null){
      idWallet = temp;
    }
    try{
        const respon = await axios.patch(`http://localhost:5000/incomes/${id}`, {
            name,
            balance: parseInt(balance),
            tanggal_pemasukan,
            walletId: parseInt(idWallet),
        });
        history.push("/income");
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
          title: 'Income Failed Updated!',
          allowOutsideClick: false, // Prevent closing Swal on outside click
          confirmButtonText: 'OK',
        });
        console.log(error);
      }
    }
  };

  const getIncomeById = async () => {
    const response = await axios.get(`http://localhost:5000/incomes/${id}`);
    setName(response.data.name);
    setBalance(response.data.balance);
    setTanggalPemasukan(response.data.tanggal_pemasukan);
    setWalletName(response.data.wallet.name);

    temp = setWalletId(response.data.walletId);
  }

  const formatRupiah = (angka) => {
    const numberFormat = new Intl.NumberFormat("id-ID");
    return `Rp. ${numberFormat.format(angka)}`;
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-start m-2">
        <Link to={`/income`} className="btn btn-sm btn-info">
            <BiArrowBack style={{ fontSize: '20px', verticalAlign: 'middle' }} /> Back
        </Link>
      </div>
        <h1 className="h2 mb-3 text-center">
            <strong>Edit Income</strong>
        </h1>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={UpdateIncome} className="card p-4">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text"  style={{ backgroundColor: '#f7f7f7' }}
                        className="form-control" id="name" value={name} onChange={(e)=>
                        setName(e.target.value)}
                        placeholder='Contoh: Gaji Pokok'
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="balance" className="form-label">Balance</label>
                        <input type="text" style={{ backgroundColor: '#f7f7f7' }}
                            className="form-control" id="balance" value={formatRupiah(balance)}
                            onChange={(e)=> setBalance(e.target.value.replace(/\D/g, ''))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tanggalPemasukan" className="form-label">Tanggal Pemasukan</label>
                        <input type="date" className="form-control" id="tanggalPemasukan" value={tanggal_pemasukan}
                            onChange={(e)=> setTanggalPemasukan(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wallet" className="form-label">Jenis Wallet</label>
                        <select className="form-select" id="wallet" name="wallet" value={idWallet} onChange={(e)=>
                            setWalletId(e.target.value)}
                            >
                            {wallets.map((wallet) => (
                            <option key={wallet.id} value={wallet.id}>
                                {wallet.name}
                            </option>
                            ))}
                        </select>
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

export default EditIncome;
