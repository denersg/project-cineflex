import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";

function Movie({ id, title, posterURL }){
    return(
        <section className="movie">
            <Link to={`/sessions/${id}`}>
                <img src={posterURL} alt={title} />
            </Link>
        </section>
    );
}

function FetchMovieCatalogFromServer(){
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        promise.then((response) => {
            setMovies(response.data);
        });
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, [] );
    
    return(
        <div className="catalog">
            {movies.map(movie => {
                return <Movie key={movie.id} {...movie} />
            })}
        </div>
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