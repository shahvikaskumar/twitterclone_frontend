import React from "react";
import './home.css';
import Main from "./component/main";
import Sidebar from "./component/sidebar";


const Home = () => {
    

    return (
        <>
        
        <div className="container-xl container-fluid">
             <div className="row m-0 custom-min-vh-100 justify-content-center ">
                
                
                <header className="col-sm-2 col-md-4 col-lg-3 col-xl-3 flex-sm-column p-0 header-content">
                    <Sidebar />   
                
                </header>
                
                <main className="main-content border-start border-end border-2   col-12 col-sm-10 col-md-8 col-lg-6 p-0 ">                   
                    <Main />
                </main> 

             </div>
         </div>
         
        </>
    )
};

export default Home;