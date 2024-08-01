import React from 'react';
import Sidebar from '../components/Layout/sidebar';
import Mobilemenu from '../components/Layout/mobilemenu';
import { Outlet } from 'react-router-dom';
import Tweetdialog from '../components/Tweets/tweetdialog';
import { useSelector } from 'react-redux';


const Home = () => {

    const {replytweet} = useSelector((state) => state.tweet);

    return (
        <div className='m-auto' style={{ maxWidth: "767px" }}>
            <div className='row m-0'>

                {/* Mobile menu component */}
                <Mobilemenu />
                
                {/* Sidebar component visible on larger screens */}
                <div className='d-none d-sm-block col-sm-2 col-md-4 p-0' style={{ flex: "1" }}>
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className='col-12 col-sm-10 col-md-8 p-0 bg-white' >
                    
                    {/* Outlet to render child routes */}
                    <Outlet />

                    {/* Tweet dialog component */}
                    <Tweetdialog tweet={replytweet} />
                </div>
            </div>
        </div>
    );
};

export default Home;