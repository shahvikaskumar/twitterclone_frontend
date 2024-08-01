import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Createtweet, setreplytweet, settweetdialog, Tweetreply } from '../../redux/slice/tweetslice';
import { useEffect, useState } from 'react';
import {showtoast} from '../../redux/slice/toastslice';
import Loading from '../loading/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const Tweetdialog = (props) => {

    const dispatch = useDispatch();
    const dialogshow = useSelector((state) => state.tweet.tweetdialog);
    const {token, user, loading} = useSelector((state) => state.auth);
    const initialdata = {
        content:'',
    };

    const [formdata, setformdata] = useState(initialdata);
    const [imgpre, setimgpre] = useState(null);
    

    useEffect(() => {
    
            setformdata(initialdata);
            setimgpre(null);
        
        // eslint-disable-next-line
    },[props.tweet]);

    
    const handleclose = () => {
        setformdata(initialdata);
        setimgpre(null);
        dispatch(setreplytweet(null))
        dispatch(settweetdialog(false));
    };

    const handlechange = (e) => {
        const {name, value, type, files} = e.target;
        if(type === 'file'){
            const file = files[0];

            if(file){
                setformdata({
                    ...formdata,
                    image:file,
                });
                setimgpre(URL.createObjectURL(file));
            }
        }else {
            setformdata({
                ...formdata,
                [name]:value
            });
        }
    };


    const handlesubmit = async () => {
        if(formdata.content !== null && formdata.content !== ''){
            const data = {...formdata, userid:user._id};
            if(props.tweet){                
                dispatch(Tweetreply({data:data, token:token,  showtoast:showtoast, tweetid:props.tweet._id ,  modalclose:handleclose}));
            }else{
                dispatch(Createtweet({data:data, token:token, showtoast:showtoast, modalclose:handleclose }));
            }
        }else {
            alert("The content field is empty. Please enter some content.");
        }
    };

    return (
        <>
        {loading && <Loading />}
        <Modal className='modal' scrollable show={dialogshow} onHide={handleclose} >
            <Modal.Header closeButton>
                <Modal.Title>{props.tweet ? 'Tweet your Reply' : 'New Tweet'} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control as="textarea" rows={4} className="rounded-4 py-2 px-3" type="text" id="content" name="content" placeholder="Write your Tweet" onChange={handlechange} value={formdata.content} />
                <Form.Group>
                <Form.Label htmlFor='image'  className="mt-1 mb-0 btn p-1 fs-4 fw-bold pointer-event">
                    <FontAwesomeIcon icon={faImage} />
                    <input type="file" id="image"  onChange={handlechange} className="form-control d-none" accept="image/*" />
                  </Form.Label>
                  {imgpre && 
                  
                  <img src={imgpre} alt={formdata.content} className="img-fluid object-fit-contain"/>
                  
                  }
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className='fs-5 px-4' onClick={handleclose}>
            Close
          </Button>       
          <Button variant="primary" className='fs-5 px-4' onClick={handlesubmit}>
            {props.tweet ? 'Reply' : 'Tweet'}
          </Button>         
            </Modal.Footer>
        </Modal>
        </>
    )
};

export default Tweetdialog;