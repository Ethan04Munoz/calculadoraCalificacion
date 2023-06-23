import React from "react";
import './ghostBtn.css';

function GhostBtn(props){
    return(
        <button type="button" className={props.clase} onClick={props.onClick} disabled={props.enabled}>
            {props.contenido}
        </button>
    )
}

export default GhostBtn;