import React from 'react';
import './loading.css';

const Loading = () => {
    return (
        <div className='overlay'>
            <div className="spinner-container">
                <div className="spinner-border text-primary" style={{ width: '10rem', height: '10rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Please Wait</p>
            </div>
        </div>
        
    );
};

export default Loading;