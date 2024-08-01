import { faCakeCandles, faLocation, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tweetcard from "../components/Tweets/tweetcard";
import { useParams } from "react-router-dom";
import { Getsingleuser, Getusertweet ,setbtnedit, setbtnphoto, Userfollow, Userunfollow } from "../redux/slice/userslice";
import { showtoast } from "../redux/slice/toastslice";
import Edituserdetail from "../components/Profile/editdialog";
import Profilephoto from "../components/Profile/photodialog";

const Profile = () => {

    const {id} =useParams(); 
    
    const dispatch = useDispatch();
    const {user, token} = useSelector((state) => state.auth);
    const otheruser = useSelector((state) => state.user.singleuser);
    const {usertweet} = useSelector((state) => state.tweet);
    const {changetweet } = useSelector((state) => state.tweet);

    // Fetch single user details on component mount or when token/id changes
    useEffect(() =>{        
        if(token && id){
        dispatch(Getsingleuser(token, id, showtoast));
        }
        
    },[token, id, dispatch ]);

    // Fetch tweets of the user when user details change or new tweets are available
    useEffect(() => {
        if(token && otheruser && !changetweet){
        dispatch(Getusertweet(token, otheruser._id));       
        }   
    },[otheruser,token, dispatch, changetweet]);

    // Format date to IST and return as a readable string
    const formatdate = (createdate) => {
        
        const date = new Date(createdate);        
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const tweetdate = date.toLocaleDateString('en-US', options);
        return tweetdate;
    };

    // Handle follow action
    const handlefollow = () => {
        dispatch(Userfollow(token, otheruser._id, user._id, showtoast));
    }

    // Handle unfollow action
    const handleunfollow = () => {
        dispatch(Userunfollow(token, otheruser._id, user._id, showtoast));
    }

    // Show edit user details modal
    const editmodalshow = () => {
        dispatch(setbtnedit(true));
    }

    // Show profile photo update modal
    const photomodalshow = () => {
        dispatch(setbtnphoto(true));
    }

    
    return (
        <div className="mx-2">
        <h1 className="my-2"> Profile</h1>
        <div className="bg-primary-subtle mt-3 position-relative d-inline-block w-100" style={{height:"200px"}}>
            <div className="d-flex align-items-end position-absolute w-100" style={{bottom:"-70px"}} >
                <div className="ratio bg-white ms-2 w-25 ratio-1x1 rounded-circle overflow-hidden">
                    {otheruser?.profile_picurl ? (
                        <img src={otheruser?.profile_picurl} alt={otheruser?.username} />
                    ) : (
                        <FontAwesomeIcon className="text-dark" icon={faUserCircle} />
                    )}                    
                </div>
                <div className="ms-auto mb-3">
                    {otheruser?._id === user?._id ? (
                    <>
                    <button className="btn me-2 px-4 btn-primary" onClick={photomodalshow}>Update Profile Photo</button>
                    <button className="btn px-4  btn-primary" onClick={editmodalshow}>Edit</button>
                    </>
                    ) : (
                        <>
                        {otheruser?.followers?.includes(user?._id) ? (
                            <button className="btn px-4  btn-primary" onClick={handleunfollow}>UnFollow</button>    
                        ) : (
                        <button className="btn px-4  btn-primary" onClick={handlefollow}>Follow</button>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
        
        <div className="mt-5 ms-3 pt-4 ">
        <p className="fw-bold fs-4 mb-0 mt-2">{otheruser.name}</p>
            <p className="text-secondary">@{otheruser.username}</p>
        </div>
        <div className="ms-2">
            {otheruser.dateofbirth && <span className="ms-2"><FontAwesomeIcon className="me-2" icon={faCakeCandles} />DOB:- {formatdate(otheruser.dateofbirth)}</span>}
            {otheruser.location && <span className="ms-5 ps-5"><FontAwesomeIcon className="me-2" icon={faLocation} />{otheruser.location}</span>}
            {otheruser.createdAt && <p className="ms-2"><FontAwesomeIcon className="me-2" icon={faCalendar} />Joining:- {formatdate(otheruser.createdAt)} </p>}
        </div>
        <div className="ms-3 mt-4">
            <span className="fw-bold me-3">{otheruser?.following?.length} Following</span>
            <span className="fw-bold ms-3">{otheruser?.followers?.length} Followers</span>
        </div>
        <div className="text-center mt-5 mb-3">
            <h3>Tweets and Replies</h3>
        </div>
        <div className="mx-2">
            {usertweet.map((tweet, index) => (
                <Tweetcard key={index} tweet={tweet} />
            ))}
        </div>
        <Edituserdetail user={otheruser}/>
        <Profilephoto />
        </div>

        
    );
};

export default Profile;