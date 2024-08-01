import { faComment, faHeart as heart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRetweet, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setreplytweet, settweetdialog, Tweetdelete, Tweetdislike, Tweetlike, Tweetretweet } from '../../redux/slice/tweetslice';
import { showtoast } from '../../redux/slice/toastslice';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';


const Tweetcard = (props) => {

    const navigate =useNavigate();
    const [tweet , settweet] = useState([]);
    const {user, token, loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if(props){
        settweet(props.tweet);        
        }else {
            settweet(null);
        }
        // eslint-disable-next-line
    },[props.tweet]);
    
    const handlelike = (tweetid) => {
        if(tweet?.likes?.includes(user._id)){
            dispatch(Tweetdislike(token, tweetid, user._id, showtoast));
        }
        else {
            dispatch(Tweetlike(token, tweetid, user._id, showtoast));
        }
    }

    const handledelete = (tweetid) => {
        const confirmed = window.confirm("Are you sure you want to delete this tweet?");
        if(confirmed){
            dispatch(Tweetdelete(token, tweetid, user._id, showtoast));
        }
    }

    const retweet = (tweetid) => {
        dispatch(Tweetretweet(token, tweetid, user._id, showtoast));
    }
    
    const formatdate = (createdate) => {
        
        const date = new Date(createdate);
        const istDate = new Date(date.getTime() - 5.5 * 60 * 60 * 1000);    
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const tweetdate = istDate.toLocaleDateString('en-IN', options);
        return tweetdate;
    };
    
    const handleprofile = (id) => {
        navigate(`/profile/${id}`);
    }

    const gototweetdetails = (id) => {
        navigate(`/tweet/${id}`);
    }

    const replytweet = (tweet) => {
        dispatch(setreplytweet(tweet));
        dispatch(settweetdialog(true));
    }
      
    return (
        <>
        {loading && <Loading />}
        <div key={tweet?._id} className="mx-1 pt-2 border">
            {tweet?.retweetedby && <span className='ms-4 mt-2 ps-4 text-secondary mb-0'><FontAwesomeIcon className='me-1' icon={faRetweet} /> Retweet by {tweet?.retweetedby}</span>}
            <div className="d-flex mx-2 ">
                <div className='ratio flex-shrink-0 ratio-1x1  rounded-circle overflow-hidden' style={{width:"40px" , height:"40px"}}>
                    {tweet?.tweetedby?.profile_picurl  ? (
                    <img className='img-fluid' src={tweet?.tweetedby?.profile_picurl}  alt=""  />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} />
                    )}
                </div>
                <div className='flex-grow-1'>
                    <div className='d-flex'>
                        <span className='fs-6 ms-2 fw-bold btn p-0 border-0' onClick={() => handleprofile(tweet?.tweetedby?._id) }>@{tweet?.tweetedby?.username}</span>
                        <span className='text-secondary fs-6 ms-2'>{formatdate(tweet?.createdAt)} </span>
                        {tweet?.tweetedby?._id === user?._id && 
                        <span className='ms-auto btn border-0 py-0'><FontAwesomeIcon icon={faTrash} onClick={() => handledelete(tweet?._id)} /></span>
                        }
                    </div>
                    <div className='btn border-0 w-100 text-start'  onClick={() => gototweetdetails(tweet?._id)}>
                    <p className='ms-2  text-wrap'>{tweet?.content}
                    </p>
                    {tweet?.imageurl && 
                    <img className='img-fluid' src={tweet?.imageurl} alt="" />
                    }
                    </div>
                    <div className='d-flex justify-content-around'>
                        <div className='fs-6 btn' onClick={() => handlelike(tweet?._id)}>
                            {tweet?.likes?.includes(user?._id) ? (
                                <FontAwesomeIcon className='me-1 text-danger' icon={faHeart} />    
                            ) : (
                            <FontAwesomeIcon className='me-1' icon={heart} />
                            )}
                           {tweet?.likes?.length > 0 && <span>{tweet?.likes?.length}</span>}
                        </div>
                        <div className='fs-6 btn' onClick={() => replytweet(tweet)}>
                            <FontAwesomeIcon className='me-1' icon={faComment} />
                            {tweet?.replies?.length > 0 && <span>{tweet?.replies?.length}</span>}
                        </div>
                        <div className='fs-6 btn' onClick={() => retweet(tweet?._id) }>
                            <FontAwesomeIcon className='me-1' icon={faRetweet} />
                            {tweet?.retweetby?.length > 0 && <span>{tweet?.retweetby?.length}</span>}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Tweetcard;