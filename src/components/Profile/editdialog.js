import { Modal, Button, Form} from "react-bootstrap";
import { Profileedit, setbtnedit } from "../../redux/slice/userslice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { showtoast } from "../../redux/slice/toastslice";
import Loading from "../loading/loading";

const Edituserdetail = (props) => {

    const dispatch = useDispatch()
    const showmodal = useSelector((state) => state.user.btnedit); 
    const {token, user, loading} = useSelector((state) => state.auth);
    
    // Initial state for form data
    const initialdata = {
        name:'',
        dateofbirth:'',
        location:'',
    };


    const [formdata, setformdata] = useState(initialdata);

    // Update form data when props.user or showmodal changes
    useEffect(() => {
        if(props.user){

            const formatteddob = props.user.dateofbirth
                ? new Date(props.user.dateofbirth).toISOString().split('T')[0]
                : '';

            setformdata({
                name: props.user.name || '',
                dateofbirth:formatteddob,
                location:props.user.location || ''
            });
        }
            
        
    },[props.user, showmodal]);

    // Close the modal and reset form data
    const handleclose = () => {
        setformdata(initialdata);
        dispatch(setbtnedit(false));
    };

    // Update form data on input change
    const handlechange = (e) => {
        setformdata({...formdata, [e.target.name]:e.target.value});
    };
    
    // Submit form data to update profile
    const handlesubmit = async(e) => {
        e.preventDefault();                
        dispatch(Profileedit(token, formdata, user._id, showtoast));
        handleclose();
    }

    return (
        <>
        {loading && <Loading />}
        <Modal  className='modal'  scrollable show={showmodal} onHide={handleclose}>
      
            <Modal.Header closeButton >
            <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type="text" id="name" name="name" placeholder="Enter your Name" onChange={handlechange} value={formdata.name} />

                <Form.Label htmlFor="location" className="mt-3">Location</Form.Label>
                <Form.Control type="text" id="location" name="location" placeholder="Enter your Location" onChange={handlechange} value={formdata.location} />

                <Form.Label htmlFor="dateofbirth" className="mt-3">Date of Birth</Form.Label>
                <Form.Control type="date" id="dateofbirth" name="dateofbirth" placeholder="Enter your Date of Birth" onChange={handlechange} value={formdata.dateofbirth} />

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className='fs-5 px-5' onClick={handleclose}>Close</Button>          
            <Button className='fs-5 px-5' onClick={handlesubmit}>Edit</Button>          
            </Modal.Footer>      
        </Modal>
        </>
    )
};

export default Edituserdetail;