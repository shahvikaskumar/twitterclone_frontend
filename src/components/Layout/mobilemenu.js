import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faBars, faComment, faHome, faRightFromBracket, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setmenucanvas, settweetdialog } from '../../redux/slice/tweetslice';
import { logout } from '../../redux/slice/authslice';
import { showtoast } from '../../redux/slice/toastslice';

const Mobilemenu = () => {
    const {user} = useSelector((state) => state.auth);
    const {menucanvas} = useSelector((state) => state.tweet);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleshow = () => {
        dispatch(settweetdialog(true));    
    };

    const handlelogout = () => {
        dispatch(logout(navigate, showtoast));
    };

    const handlemenulogout = () => {
        dispatch(logout(navigate, showtoast));
        dispatch(setmenucanvas(false));
    }

    const handlemenushow = () => {
        dispatch(setmenucanvas(true));
    }

    const handlemenuclose = () => {
        dispatch(setmenucanvas(false));
    }

    return (
        <>
            <Navbar className=' d-sm-none bg-dark justify-content-around py-1 sticky-top'>                
                <NavLink className='m-0 px-3 p-1 text-warning fs-2 btn border-0' onClick={handlemenushow} >
                        <FontAwesomeIcon icon={faBars}  />    
                </NavLink>                    
                <Navbar.Brand className='m-0 px-3 p-1 text-warning fs-2' href='/'>
                        <FontAwesomeIcon  icon={faComments}  />    
                </Navbar.Brand>
                <NavLink className='m-0 px-3 p-1 text-warning fs-2' onClick={handlelogout}>
                        <FontAwesomeIcon  icon={faRightFromBracket}  />    
                </NavLink>                                        
            </Navbar>


            <Navbar className='justify-content-around d-sm-none bg-dark py-1 fixed-bottom'>
                <NavLink className="fs-2 p-1 text-warning" to="/home">
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink className="fs-2 p-1 border-0 btn text-warning"  onClick={handleshow}>
                    <FontAwesomeIcon icon={faComment} />
                </NavLink>
                <NavLink className="fs-2 p-1 text-warning" to={`/profile/${user?._id}`}>
                    {user!==null ? (
                        <div className='ratio ratio-1x1 rounded-circle overflow-hidden' style={{width:"35px", height:"35px"}}>
                            <img src={user.profile_picurl} alt={user.username} />
                        </div>
                    ) : (
                    <FontAwesomeIcon icon={faUser} />
                    )}
                </NavLink>                
            </Navbar>

            <Offcanvas show={menucanvas} className="bg-body-secondary" onHide={handlemenuclose} style={{width:"280px"}} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link as={NavLink} className='text-black py-1 my-2' to="/home" onClick={handlemenuclose} >
                            <FontAwesomeIcon className='me-3 fs-3' icon={faHome} />
                            <span className='fs-2'>Home</span>
                        </Nav.Link>
                        <Nav.Link as={NavLink} className='text-black py-1 my-2' to={`/profile/${user?._id}`} onClick={handlemenuclose} >
                            <FontAwesomeIcon className='me-3 fs-3' icon={faUserCircle} />
                            <span className='fs-2'>Profile</span>
                        </Nav.Link>
                        <Nav.Link as={NavLink} className='text-black py-1 my-2' onClick={handlemenulogout} >
                            <FontAwesomeIcon className='me-3 fs-3' icon={faRightFromBracket} />
                            <span className='fs-2'>Logout</span>
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            </>
    )
};

export default Mobilemenu;