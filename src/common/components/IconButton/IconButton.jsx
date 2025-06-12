import React from 'react'

import style from './IconButton.module.css'

function IconButton({ width , height , icon , children , color , backgroundColor }){
    return (
        <button 
            className={style.button}
                style={{
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    color: color
                }}
            >
                {icon && <span className={style.icon}>{icon}</span>}
                <span className={style.text}>{children}</span>
            </button>
    )
}

export default IconButton;