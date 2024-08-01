import React , {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../loading/loading";
import { Resetpassword } from '../../redux/slice/authslice';
import { showtoast } from '../../redux/slice/toastslice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments} from '@fortawesome/free-regular-svg-icons';


const Resetpasswordform = () => {
    const {token} = useParams();
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const [formdata, setformdata] = useState({
        password:'',
        cpassword:''        
    });

    // Update form data state when input changes
    const handlechange = (e) => {
        setformdata({
            ...formdata, [e.target.name]:e.target.value
        });
    };

    // Handle form submission
    const handlesubmit = async (e) => {
        e.preventDefault();  
        
        // Check if passwords match
        if(formdata.password !== formdata.cpassword){
            dispatch(showtoast({message:"Password do not match"}));
            return;
        }

        const data ={
            token:token,
            password: formdata.password,
        };

        dispatch(Resetpassword(data, navigate, showtoast ));        
    };


    return (
        <>
        {loading && <Loading />}
        <div className="row align-items-center justify-content-center min-vh-100  bg-body-secondary m-0">
            <div className='col-11 col-lg-10 col-xl-8 col-xxl-6 shadow rounded-4 bg-primary p-0 my-4'>
                <div className='row m-0'>
                    <div className='col-12 col-md-5 text-center align-content-center p-0'>
                        <h2 className='text-white display-6 fw-bold mt-5 mb-3'>Welcome Back</h2>
                        <FontAwesomeIcon className='mt-3 mb-5 text-white' icon={faComments} size='8x' /> 
                    </div>
                    <div className='col-12 col-md-7 text-center bg-white rounded-4 py-2'>
                        <h1 className='fw-bold display-4 py-3'>Reset Password</h1>
                        <form id='loginform' onSubmit={handlesubmit} className='my-4 d-flex flex-column justify-content-center align-items-center'>
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='password' name="password" id="password" placeholder='Password' value={formdata.password} onChange={handlechange} />                           
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='password' name="cpassword" id="cpassword" placeholder='Confirm Password' value={formdata.cpassword} onChange={handlechange} />                           
                            <button className='btn btn-primary w-50 fw-bold fs-4 mt-3 rounded-5'>Reset</button>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
        </>
 
    )
};

export default Resetpasswordform;