import React , {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from "../loading/loading";
import { forgotpassword } from '../../redux/slice/authslice';
import { showtoast } from '../../redux/slice/toastslice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments} from '@fortawesome/free-regular-svg-icons';


const Forgotpassword = () => {

    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const [formdata, setformdata] = useState({
        email:''        
    });

    const handlechange = (e) => {
        setformdata({
            ...formdata, [e.target.name]:e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();       
        dispatch(forgotpassword(formdata, navigate, showtoast ));        
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
                        <h1 className='fw-bold display-4 py-3'>Forgot Password</h1>
                        <form id='loginform' onSubmit={handlesubmit} className='my-4 d-flex flex-column justify-content-center align-items-center'>
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='email' name="email" id="email" placeholder='Enter Your Emai ID' value={formdata.email} onChange={handlechange} />                           
                            <button className='btn btn-primary w-50 fw-bold fs-4 mt-3 rounded-5'>Send Email</button>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
        </>
    )
};

export default Forgotpassword;