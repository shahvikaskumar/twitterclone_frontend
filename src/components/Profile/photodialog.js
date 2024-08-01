import { Modal, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Profilepicupdate, setbtnphoto } from "../../redux/slice/userslice";
import { useState } from "react";
import { showtoast } from "../../redux/slice/toastslice";
import Loading from "../loading/loading";

const Profilephoto = () => {

    const dispatch = useDispatch()
    const showmodal = useSelector((state) => state.user.btnphoto);
    const {token, loading, user} = useSelector((state) => state.auth); 

    // State for image preview and form data
    const [imgpre, setimgpre] = useState(null);  
    const [formdata, setformdata] = useState({userid:'', image:''});

    // Handle file input change and update image preview
    const handlechange = (e) => {
        const {type, files} =e.target;
        if(type === "file"){
            const file = files[0];

            if(file){
                setformdata({userid:user._id, image:file});
                setimgpre(URL.createObjectURL(file));
            }
        }
    };

    // Close modal and reset image preview
    const handleclose = () => {
        setimgpre(null);
        dispatch(setbtnphoto(false));
    };

    // Submit image update to the server
    const handlesubmit = () => {
        if(formdata.image !== ''){
        dispatch(Profilepicupdate(token, formdata, showtoast));
        handleclose();
        }else {
            dispatch(showtoast({message:"Please Select Image", type:"error"}));
        }
    };

    return (
        <>
        {loading && <Loading />}
        <Modal  className='modal'  scrollable show={showmodal} onHide={handleclose}>
      
            <Modal.Header closeButton >
            <Modal.Title>Upload Profile Pic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="p-4 rounded-3 text-primary fw-bold fs-5 bg-primary-subtle">Note: The image should be square in shape</p>
                <input type="file" id="image"  className="form-control" onChange={handlechange} accept="image/*" />
                {imgpre && <img src={imgpre} className="img-fluid mt-4" alt="" />}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className='fs-5 px-5' onClick={handleclose}>Close</Button>          
            <Button className='fs-5 px-5' onClick={handlesubmit}>Save Profile Pic</Button>          
            </Modal.Footer>      
        </Modal>
        </>
    )
};

export default Profilephoto;