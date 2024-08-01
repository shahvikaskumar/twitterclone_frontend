import { useDispatch, useSelector } from "react-redux";
import { settweetdialog } from "../../redux/slice/tweetslice";
import Tweetcard from "../Tweets/tweetcard";
import { Getalltweet } from "../../redux/slice/tweetslice";
import { useEffect } from "react";


const Tweetlist = () => {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {alltweet} = useSelector((state) => state.tweet);
    
    // Function to show the tweet dialog
    const handleshow = () => {
        dispatch(settweetdialog(true));

    }
    
    // Fetch all tweets when the component mounts or token changes
    useEffect(() => {
        if(token){
        dispatch(Getalltweet(token));
        
        }
        // eslint-disable-next-line
    },[token]);    

    return (

        <>
            {/* Header with buttons for Home and Tweet */}
            <div className="d-none bg-dark d-sm-flex sticky-top m-0 p-3  justify-content-between overflow-hidden">
                <button className="btn btn-warning fw-bold px-4">Home</button>
                <button className="btn btn-warning fw-bold px-4" onClick={handleshow}>Tweet</button>
            </div>
            
            {/* Map through all tweets and render Tweetcard components */}
            {alltweet.map((tweet, index) => (
                <Tweetcard key={index} tweet={tweet} />
            ))}
            
            
        </>
    )
};

export default Tweetlist;