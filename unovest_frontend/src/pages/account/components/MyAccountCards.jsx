import React from 'react';
 
function MyAccountCards({ children, className }) {
    return (
        <div className={`myAccountcards-container ${className} `} >
            {children}
        </div>
    );
}
 
export default MyAccountCards;