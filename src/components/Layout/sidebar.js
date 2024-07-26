import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { faComments } from '@fortawesome/free-regular-svg-icons';
import imgt from '../../../css/vvv.jpg';
import React from 'react';
import { useAuth } from '../../../context/authcontext';

const Sidebar = () => {
    const {auth, logout } = useAuth();
    const user=auth.user;

    const NavItem = ({ to, icon, text, onClick, offcanvas }) => (
        <li className="nav-item">
            <NavLink className="nav-link text-dark fs-3 fw-bold text-sm-center text-md-start rounded-5 px-4" activeClassName="active-link" to={to} onClick={onClick}>
                <FontAwesomeIcon icon={icon} />
                <span className={`ms-3 ${offcanvas? '' : 'd-none'} d-md-inline`}>{text}</span>
            </NavLink>
        </li>
    );

    const ProfileCard = ({ email, offcanvas }) => (
        <div className='card border-0 bg-transparent'>
            <div className='row g-0 justify-content-center'>
                <div className='col-8 col-sm-6 col-md-2 px-1 d-flex align-items-center justify-content-center'>
                   {user.profile ? (
                    <img className='img-fluid rounded-circle' src={imgt} alt="profile" />
                   ): (

                   <FontAwesomeIcon className='text-secondary' icon={faCircleUser} size='3x'/>
                   
                )}
                </div>
                <div className={`col-8 col-md-10 ${offcanvas ? '' : 'd-none'} d-md-block`}>
                    <div className='card-body'>
                        <p className='card-title fs-4 fw-bold m-0'>{user.name}</p>
                        {email && <p className='card-text text-truncate mb-0 fs-6 fw-bold'>{email}</p>}
                        <p className='card-text fs-6 text-truncate'>@{user.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
        
            <nav className='navbar mx-2 navbar-expand-sm navbar-light flex-sm-column justify-content-sm-between justify-content-around  custom-min-vh-100 py-0'>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon fs-6"></span>
                </button>
                <div className='col-2 col-sm-12 d-sm-block text-center text-md-start px-0 mx-0 my-2'>
                    <NavLink className="fs-1 fw-bold" activeClassName="active-link" to="/">
                        <FontAwesomeIcon className='text-primary px-4 py-2' icon={faComments} />
                    </NavLink>
                </div>
                <div className='collapse navbar-collapse flex-column my-2 p-0 w-100' id="navbarsupportedcontent">
                    <ul className='navbar-nav text-start flex-column w-100'>
                        <NavItem to="/home" icon={faHouse} text="Home" offcanvas={false}/>
                        <NavItem to="/profile" icon={faUser} text="Profile" />
                        <NavItem to="/" icon={faRightFromBracket} text="Logout" onClick={logout} />
                    </ul>
                </div>
                <NavLink className="nav-link col-2 col-sm-12 text-truncate text-sm-start mb-sm-3 rounded-5 text-md-start ps-md-3 pe-0">
                    <ProfileCard />
                </NavLink>
            </nav>
            <div className="offcanvas  offcanvas-start" style={{width:"350px"}} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header justify-content-center align-items-start">
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="nav-link col-12 text-truncate rounded-5 pe-0">
                    <ProfileCard email="vikasshah508@gmail.com" offcanvas={true}/>
                </div>
                <div className='row m-0'>
                    <span className='text-center col-6 m-0 p-2 fs-6 fw-bold'>0 Following</span>
                    <span className='text-center col-6 m-0 p-2 fs-6 fw-bold'>0 Followers</span>
                </div>
                <hr />
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <NavItem to="/home" icon={faHouse} text="Home" offcanvas={true} />
                        <NavItem to="/profile" icon={faUser} text="Profile" offcanvas={true} />
                        <NavItem to="/" icon={faRightFromBracket} text="Logout" onClick={logout} offcanvas={true} />
                    </ul>
                </div>
                
            </div>

            <div className='fixed-bottom start-0 bottom-0 w-100 d-sm-none'>
                <ul className="navbar-nav justify-content-around flex-row flex-grow-1 pe-3">
                        <NavItem to="/home" icon={faHouse} text="Home"  />
                        <NavItem to="/profile" icon={faUser} text="Profile"  />
                        <NavItem to="/" icon={faRightFromBracket} text="Logout" onClick={logout}  />
                    </ul>
                </div>
        </>
    );
};

export default Sidebar;
