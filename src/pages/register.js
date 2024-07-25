import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments} from '@fortawesome/free-regular-svg-icons';
import {Base_URL} from '../Utility/config';
import { useToast } from '../context/toastcontext';
import { useState } from 'react';
import axios from 'axios';


const Register = () => {
    
    const showToast = useToast();

    const navigate = useNavigate();

    const [formdata,setformdata] = useState({
        fname:'',
        email:'',
        uname:'',
        password:''

    });

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        try{
            const response=await axios.post(`${Base_URL}auth/register`,formdata);
            showToast(response.data.success,"success");
            navigate("/login");
        }
        catch(err){
            showToast(err.response?.data?.error || 'An error occurred', 'error');
        }
    };
    

    
    return (
        <div className="row align-items-center justify-content-center min-vh-100  bg-body-secondary m-0">
            <div className='col-11 col-lg-10 col-xl-8 col-xxl-6 shadow rounded-4 bg-primary p-0 my-4'>
                <div className='row m-0'>
                    <div className='col-12 col-md-5 text-center align-content-center p-0'>
                        <h2 className='text-white display-6 fw-bold mt-5 mb-3'>Join Us</h2>
                        <FontAwesomeIcon className='mt-3 mb-5 text-white' icon={faComments} size='8x' /> 
                    </div>
                    <div className='col-12 col-md-7 text-center bg-white rounded-4 py-2'>
                        <h1 className='fw-bold display-4 py-3'>Register</h1>
                        <form id="registerform" onSubmit={handlesubmit}  className='my-4 d-flex flex-column justify-content-center align-items-center'>
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='text' name="fname" id="fname" placeholder='Full Name' value={formdata.fname} onChange={handlechange} />
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='email' name="email" id="email" placeholder='Email' value={formdata.email} onChange={handlechange} />
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='text' name="uname" id="uname" placeholder='Username' value={formdata.uname} onChange={handlechange} />
                            <input className='form-control mb-3 rounded-5 px-4 py-2 w-75' type='password' name="password" id="password" placeholder='Password' value={formdata.password} onChange={handlechange} />
                            <button className='btn btn-primary w-50 fw-bold fs-4 mt-3 rounded-5'>Register</button>
                            <p className='mt-3'>Already Registered? <Link to='/login'>Login here</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;