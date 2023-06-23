import React from "react";
import './ghostBtn.css';

function GhostBtn(props){
    return(
        <button type="button" className="ghostBtn" onClick={props.onClick}>
            {props.contenido}
        </button>
    )
}

export default GhostBtn;