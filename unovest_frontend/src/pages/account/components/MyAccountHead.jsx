import React from 'react'

export default function MyAccountHead({ children, className }) {
    return (
        <h3 className={`MyAccountHead ${className}`}>
            {children}
        </h3>
    )
}


