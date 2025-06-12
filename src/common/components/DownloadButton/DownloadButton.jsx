import React from 'react'

import style from './DownloadButton.module.css';

function DownloadButton({ width , height , onClick , children, href, download, icon }) {
    return (
        <a
            href={href}
            download={download}
            className={style.button}
            onClick={onClick}
            style={{
                width: width,
                height: height,
            }}
        >
            <span className={style["button-content"]}>
                {icon && <span className={style["button-icon"]}>{icon}</span>}
                {children}
            </span>
        </a>
    );
}

export default DownloadButton;