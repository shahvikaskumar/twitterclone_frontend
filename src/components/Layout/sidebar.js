import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faRightFromBracket, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { faComments } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/authslice';
import { showtoast } from "../../redux/slice/toastslice";
import { Nav, Navbar } from 'react-bootstrap';

const Sidebar = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const isactive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    const handlelogout = () => dispatch(logout(navigate, showtoast));

    return (
        <>

            <div className='row sticky-top m-0 vh-100 bg-dark'>
                <Navbar className='flex-column align-items-md-start'>
                    <Navbar.Brand className='m-0 px-3' href='/'>
                        <FontAwesomeIcon className='text-warning fs-1 p-1' icon={faComments} />
                    </Navbar.Brand>
                    <Nav className='flex-column w-100 h-100 text-md-start text-center justify-content-between'>
                        <Nav className='flex-column w-100'>
                            <NavLink className={`linkhover mt-4 fs-2 py-2 px-4 ${isactive('/home')}`} to="/home">
                                <FontAwesomeIcon className='me-md-3' icon={faHome} />
                                <span className='d-sm-none d-md-inline'>Home</span>
                            </NavLink>
                            <NavLink className={`linkhover  mt-4 fs-2 py-2 px-4 ${isactive(`/profile/${user?._id}`)}`} to={`/profile/${user?._id}`}>
                                <FontAwesomeIcon className='me-md-3 pe-md-1' icon={faUser} />
                                <span className='d-sm-none d-md-inline'>Profile</span>
                            </NavLink>
                            <NavLink className='linkhover mt-4 fs-2 py-2 px-4' onClick={handlelogout}>
                                <FontAwesomeIcon className='me-md-3' icon={faRightFromBracket} />
                                <span className='d-sm-none d-md-inline'>Logout</span>
                            </NavLink>
                        </Nav>

                        <NavLink className='linkhover d-flex justify-content-center align-items-center my-1 px-md-3 mb-md-0 mb-3 py-md-3 ' to="/home">
                            <div className='ratio ratio-1x1  rounded-circle overflow-hidden me-1' style={{width:"55px" , height:"55px"}} >
                               {user?.profile_picurl ? (
                                <img src={user?.profile_picurl} className='img-fluid' alt={user?.username} />
                               ) : (
                                <FontAwesomeIcon icon={faUserCircle} />
                            )} 
                            </div>
                            <div className='ps-2 d-none d-md-inline flex-grow-1 col-md-9' >
                                <span className='d-sm-none d-md-inline text-white fs-4'>{user?.name}</span>
                                <p className='mb-0 text-truncate'>@{user?.username}</p>
                            </div>
                        </NavLink>
                    </Nav>
                </Navbar>
            </div>



            
        </>
    );
};

export default Sidebar;
