import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tweetcard from "../components/Tweets/tweetcard";
import { Getsingletweet } from "../redux/slice/tweetslice";

const Tweetdetails = () => {
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [tweet] = useSelector((state) => state.tweet.singletweet);
    const {changetweet } = useSelector((state) => state.tweet);

    useEffect(() => {
        if(token && id && !changetweet){
            dispatch(Getsingletweet(token, id));
            }
    },[token, dispatch, id, changetweet]);

    

    return (
        <>
        <div className="mx-2">
            <h1 className="my-2"> Tweet Details</h1>
            {tweet && <Tweetcard tweet={tweet} />}
        </div>
        <div className="mx-2">
            <h2 className="my-3">Replies</h2>
            {tweet?.replies?.map((tweet, index) => (
                <Tweetcard key={index} tweet={tweet} />
            ))}
            
        </div>
        </>
    )
};

export default Tweetdetails;