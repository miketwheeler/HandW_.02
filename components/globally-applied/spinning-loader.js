import React from 'react';
import BallTriangle from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function SpinningLoader() {
    return (
        <div>
            <h2>Loading...</h2>
            <BallTriangle
                color='black'
                height='100'
                width='100'
                ariaLabel='loading'
                // type="Puff"
                // timeout=3000}
            />
        </div>
    )
} 

export default SpinningLoader;