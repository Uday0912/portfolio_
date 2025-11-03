import React from 'react'

import style from './SubmitButton.module.css';

function SubmitButton({ width , height , icon , children , color , backgroundColor, type, disabled }) {
    return (
        <button 
            className={style["submit-button"]}
            type={type}
            disabled={disabled}
            style={{
                width: width,
                height: height,
                backgroundColor: backgroundColor,
                color: color
            }}
        >
            <span className={style.icon}>
                {icon}
            </span>
            {children}
        </button>
    );
}

export default SubmitButton;