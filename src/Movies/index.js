import { useState } from "react/cjs/react.development";

import "./style.css";

function FetchMovieCatalogFromServer(){
    return(
        <div className="catalog"></div>
    );
}

export default function Movies(){
    return(
        <>
            <h3 className="top-status">Selecione o filme</h3>

            <FetchMovieCatalogFromServer />
        </>
    );
}