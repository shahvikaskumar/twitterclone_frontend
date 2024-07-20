import React, { useEffect, useState } from 'react';
import Tweetpost from '../../../Models/tweet';
import igmt from '../../../css/vvv.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../context/authcontext';
import axios from 'axios';
import { Base_URL } from '../../..//Utility/constant';



const Main = () => {

    const {showmodal, setshowmodal} = useState(false);

    const { auth } = useAuth();
    const [tweets, settweets] = useState([]);



    const closemodal = () => {
        setshowmodal(false);
    };

    const formatdate = (datestring) => {
        const date = new Date(datestring);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const tweetdisplay = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            };
            const response = await axios.get(`${Base_URL}tweet`, config);
            settweets(response.data.tweets);
        }
        catch (err) {
            console.log(err.response?.data?.error);
        }
    };

    useEffect(() => {
        tweetdisplay();
        // eslint-disable-next-line
    }, [])

    return (
        <>


            <div className='row mx-2 my-2 justify-content-between align-items-center'>
                <p className='col-3 fs-3 fw-bold m-0'>Home</p>
                <button className='col-3 btn btn-primary fs-5 fw-bold text-white' data-bs-toggle="modal" data-bs-target="#tweetmodal">Tweet</button>
            </div>
            <Tweetpost showmodal={showmodal} closemodal={closemodal} />

            {tweets.map((tweet, index) => (
                <div key={index} className='row border p-2 m-0 mx-2'>

                    <div className='col-auto pt-4'>
                        <img src={igmt} alt="profilepic" className='rounded-circle img-fluid' width="50px" height="50px" />
                    </div>
                    <div className='col-10'>
                        {tweet.retweetedby && (
                            <div>
                                <FontAwesomeIcon icon={faRetweet} />
                                <span className='ms-2'>Retweeted by {tweet.retweetedby}</span>
                            </div>
                        )}
                        <div>
                            <span className='fw-bold'>{tweet.tweetedby.username}</span>
                            <span> - {formatdate(tweet.updatedAt)}</span>
                            <p>{tweet.content}</p>
                            {/* <img src={igmt} className='img-fluid' />                         */}
                        </div>
                        <div className='row mx-3 mt-3 justify-content-between'>
                            <div className='col-3'>
                                <FontAwesomeIcon className='text-danger' icon={faHeart} />
                                <span className='ms-1'>30.3K</span>
                            </div>
                            <div className='col-3'>
                                <FontAwesomeIcon className='text-primary' icon={faComment} />
                                <span className='ms-1'>30.3K</span>
                            </div>
                            <div className='col-3'>
                                <FontAwesomeIcon className='text-success fs-5 fw-bold' icon={faRetweet} />
                                <span className='ms-1'>30.3K</span>
                            </div>
                        </div>

                    </div>
                </div>
            ))}


        </>

    )
}

export default Main;