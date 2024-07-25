import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {useAuth} from '../context/authcontext';
import axios from 'axios';
import { Base_URL } from "../Utility/config";
import { useToast } from '../context/toastcontext';

const Tweetpost = ({showmodal, closemodal}) => {
    const {auth} = useAuth();
    const showToast = useToast();
    
    const [formdata, setformdata] = useState({ content: '', image: null });

    const handlechange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                setformdata({
                    ...formdata,
                    image: URL.createObjectURL(file)
                });
            }
        } else {
            setformdata({
                ...formdata,
                [name]: value
            });
        }
    };


    const handleclosemodal = () => {
        setformdata({content:'', image:null});
        closemodal();
        
    };

    

    const handlesubmit = async () => {
        const data = {
            content: formdata.content,
            userid:auth.user._id,
            image: formdata.image ? formdata.image : null                    
        };
        
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${auth.token}`
                }
            };
            const response = await axios.post(`${Base_URL}tweet`,data,config);
            showToast(response.data.success,"success"); 
            handleclosemodal();
        }
        catch (err){
            showToast(err.response?.data?.error || 'An error occurred', 'error');
        }
    };



    return(
        <>
            <div className="modal fade" id="tweetmodal" tabIndex="-1" 
                aria-labelledby="tweetmodal" aria-hidden="true"  >
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="tweettitle">New Tweet</h5>
                                <button type="button" className="btn-close" onClick={handleclosemodal} data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <div className="modal-body">
                                
                                <textarea id="content" name="content" rows="4" className="rounded-2 p-2 form-control w-100" placeholder="What is happening?" onChange={handlechange} value={formdata.content} >
                                </textarea>
                            
                            <input type="file" id="imgupload" onChange={handlechange}  className="form-control d-none" accept="image/*" />
                            <label htmlFor="imgupload" className="m-2 fs-4 fw-bold pointer-event">
                                <FontAwesomeIcon role="button" icon={faImage}  />
                            </label>
                            {formdata.image && (
                                <div className="mt-2 w-100 text-center" >
                                    <img src={formdata.image} alt="Selected" style={{maxWidth:"100%" , maxHeight:"300px"}} className="img-fluid" />
                                </div>
                            )}
                            
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleclosemodal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handlesubmit} >Tweet</button>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
};

export default Tweetpost;